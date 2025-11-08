
ModelerFigure = draw2d.shape.basic.Image.extend({
    NAME : "ModelerFigure",
    init : function(componentConfigure)
    {
    	var routeInfo = null;
    	this.idLabel = null;
    	this.messageRouteLabel = null;
    	this.isTestState = false;
    	this.testCount = 0;
    	this.componentConfigure = componentConfigure;
    	this.testResultList = [];
    	this.groupBoxId = null;
    	
    	//파렛트에서 드래그 하여 생성 시
    	if(componentConfigure != null && componentConfigure.componentType != null){
    		routeInfo = this.createModelerfigureUserData(componentConfigure, true);
    		this._super({path: "resources/img/eip/"+componentConfigure.img, width:47, height:37});
            
    		this.componentType = componentConfigure.componentType;
    		this.setRouteData(routeInfo);

    		//init label
    		this.initLabel();
        	
//        	if(componentConfigure.isGroupInput == "true"){
//        		//this.setDraggable( false ); 
//        	}else{
//        		this.createPort("input");
//            }
        	this.createPort("input");
        	this.createPort("output");    
        } else{
        	//불러오기 생성 시
    		this._super({path:"", width:47, height:37});
    	} 
    	this.resizeFigure();
    	
    	
    	this.selectPolicy = new draw2d.policy.figure.ModelerSelectionFeedbackPolicy();
        this.installEditPolicy(this.selectPolicy);
        
        /*???
         * this.on("panning", function(emitter, eventData){
            alert("panning of the figure called");
        });
        
        this.on("panningEnd", function(emitter){
            alert("panning of the figure called");
        });
        */
        
        //connect 이벤트
        /*this.getPort("input0").on("connect", function(emitterPort, connection){
            alert("port connected");
        });*/
   },
   
   resizeFigure: function(){
	   this.setWidth(47);
	   this.setHeight(37);
   },
   
   //서블릿에서 넘어온 json data 파싱
   setPersistentAttributes: function(memento){
	   var me = this;
	   this._super(memento);
	   this.resizeFigure();
	   
	   var jsonUserData = memento.userData;
	   
	   debugger;
   	   console.log(jsonUserData);
	   
	   if(jsonUserData != null){
		   this.componentType = jsonUserData.componentType;

		   //find componentConfigure
		   var modelerConfigureStore = Ext.getStore('IndigoModelerConfigureStore');
		   var index = modelerConfigureStore.findBy(function(rec,id){
			     return rec.data.componentType == me.componentType;
		   }, this);
		   var record = modelerConfigureStore.getAt(index);
		   this.componentConfigure = record.data;
		   //create user data
		   var userData = this.createModelerfigureUserData(this.componentConfigure, false);
		   userData.setPersistentAttributes(jsonUserData);
		   
		   //set user data
		   this.setRouteData(userData);
		   
		   //init label
		   this.initLabel();
	   }
	   
	   //create port
	   if(!memento.ports){
		   this.createPort("input");
		   this.createPort("output");     
	   }
	   
	   //image
	   if(!me.path){
		   me.path = "resources/img/eip/"+this.componentConfigure.img;
	   }
   },
   
   /**
    * 라벨을 userdata 정보로 초기화 한다
    */
   initLabel: function(){
	   //remove label
	   this.resetChildren(); 
	   this.idLabel = null;
	   this.messageRouteLabel = null;
   		
	   //create label
	   var userData =this.getUserData();
	   this.setRouteId(userData.id);
	   this.setMessageRouteLabel(userData.alias);
   },
   
   /**
    * 하단 라벨을 만든다
    * @param routeid
    */
   setRouteId: function(routeid){
	   if(routeid != null && routeid.length > 30){
		   routeid = routeid.substr(0,30)+"...";
	   }
	   
	   if(this.idLabel == null){
		   this.idLabel = new draw2d.shape.basic.Label({text:routeid, cssClass: "modeler-label"});
	       this.idLabel.setColor("#B8B8B7");
	       this.idLabel.setFontColor("#B8B8B7");
	       this.add(this.idLabel, new draw2d.layout.locator.BottomLocator(this));
	   }else{
		   this.idLabel.setText(routeid);
	   }
   },
   
   /**
    * 라우트 정보를 저장한다
    * @param routeInfo
    */
   setRouteData: function(routeInfo){
	   this.setUserData(routeInfo);
   },
	
	/**
	 * 상단 라벨을 만든다
	 * @param messageRouteName
	 */
	setMessageRouteLabel: function(messageRouteName){
		this.messageRouteLabel = new draw2d.shape.basic.Label({text:messageRouteName, cssClass: "modeler-label"});
        this.messageRouteLabel.setColor("#B8B8B7");
        this.messageRouteLabel.setFontColor("#B8B8B7");
        this.add(this.messageRouteLabel, new draw2d.layout.locator.TopLocator(this));
	},
	
	setLabelColor: function(color){
		if(this.idLabel != null){
			this.idLabel.setColor(color);
			this.idLabel.setFontColor(color);
		}
	},
	
	setMessageRouteLabelColor: function(color){
		if(this.messageRouteLabel != null){
			this.messageRouteLabel.setColor(color);
			this.messageRouteLabel.setFontColor(color);
		}
	},
	
	
	/**
	 * ModelerfigureUserData를 만든다
	 * @param routeInfoType
	 * @returns
	 */
	createModelerfigureUserData: function(componentType, useAutoId){
		return new ModelerFigureUserData(componentType, useAutoId);
	},
	
	setTestResult: function(isSuccess, previousNodeId, xml){
		if(this.getPort('input0') == null){
			this.isTestState = true;
			return;
		}
		
        var connectionList = this.getPort('input0').getConnections();
        this.testResultList.push(xml);
        if(connectionList.getSize() > 1){
        	for(var i = 0 ; i < connectionList.getSize(); i ++){
    			//connectionList.get(i).setTestResult(isSuccess);
    			if(previousNodeId != null && previousNodeId != ""){
    				if(connectionList.get(i).getSource()!= null){
    					var sourceFigure = connectionList.get(i).getSource().getParent();
    		    		if(sourceFigure.getUserData().id == previousNodeId){
    		    			connectionList.get(i).setTestLabel(this, isSuccess);
    		    		}
    				}else{
    					connectionList.get(i).setTestLabel(this, isSuccess);
    				}
    			}else{
    				connectionList.get(i).setTestLabel(this, isSuccess);
    			}
    		}
        }else if(connectionList.getSize() == 1){
        	connectionList.get(0).setTestLabel(this, isSuccess);
        }
		
		this.isTestState = true;
	},
	
	initTestResult: function(msgFigures){
		if(this.getPort('input0') != null){
			var connectionList = this.getPort('input0').getConnections();
			for(var i=0;i<connectionList.getSize();i++){
				connectionList.get(i).initTestResult();
				connectionList.get(i).setTestLabel(this, msgFigures.ExchangesCompleted, msgFigures.ExchangesFailed, msgFigures.MeanProcessingTime);
			}
		}
		this.isTestState = false;
		
		//초기화
		if(	this.testResultList.length > 0){
			this.testResultList = [];
		}
	},
	
	onDoubleClick: function(){
		if(this.isTestState){
			//테스트 상태인 figure를 더블클릭했을 때 
			var xmlList = this.testResultList;
			Ext.define('xmlDataModel',{
				extend:'Ext.data.Model',
				fields:[
				        'txId', 'timestamp', 'status', 'body', 'outbody' , 'causedByException', 'headers'
				]
			});
			
			var xmlDataStore = Ext.create('Ext.data.Store',{
				model: 'xmlDataModel',
				proxy:{
					type:'memory'
				}
			});
			
			xmlDataStore.load({
				callback:function(){
					for(var i=0;i<xmlList.length;i++){
						var rData = {};
						var xml = xmlList[i];
						var elementList = xml.context.children;
						for(var j=0;j<elementList.length;j++){
							if(elementList[j].nodeName == 'timestamp'){
								rData["timestamp"] = elementList[j].textContent;
							}
							if(elementList[j].nodeName == 'txId'){
								rData["txId"] = elementList[j].textContent;
							}
							if(elementList[j].nodeName == 'status'){
								rData["status"] = elementList[j].textContent;
							}
							if(elementList[j].nodeName == 'body'){
								rData["body"] = elementList[j].textContent;
							}
							if(elementList[j].nodeName == 'outBody'){
								rData["outbody"] = elementList[j].textContent;
							}
							
							if(elementList[j].nodeName == 'causedByException'){
								rData["causedByException"] = elementList[j].textContent;
							}
							
							if(elementList[j].nodeName == 'headers'){
								rData["headers"] = elementList[j].textContent;
							}
						}
						xmlDataStore.insert(i, rData);
					}
				}
			});
			
			Ext.define('xmlDataGrid',{
				extend: 'Ext.grid.Panel',
				alias:'widget.xmlDataGrid',
				store: xmlDataStore,
				initComponent:function(){
					this.columns = [
					{
						xtype: 'rownumberer'
					},{
						text:'트랜잭션 아이디', dataIndex:'txId', flex:1
					},{
						text:'처리시간', dataIndex:'timestamp', flex:0.3
					},{
						text:'상태', dataIndex:'status', flex:0.2, 
						style:'text-align:center',
						align:'center',
						renderer:function(val, meta, record){
							if(val == 'E'){
								return "<span style='color:red' >"+"에러"+"</span>";
								
							}else{
								return "성공";
							}
						}
					},{
						dataIndex:'body', hidden:true
					},{
						dataIndex:'outbody', hidden:true
					},{
						dataIndex:'headers', hidden:true
					}]
					
					this.callParent(arguments);
				},
				
				listeners:{
					cellclick:function(view, td, cellIndex, record, tr, rowIndex, e, eOpts){
						var body = record.data.body;
						var outBody = record.data.outbody;
						var headers = record.data.headers;
						var formatXml = this.formatXml = function (xml) {
					        var reg = /(>)\s*(<)(\/*)/g; // updated Mar 30, 2015
					        var wsexp = / *(.*) +\n/g;
					        var contexp = /(<.+>)(.+\n)/g;
					        xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
					        var pad = 0;
					        var formatted = '';
					        var lines = xml.split('\n');
					        var indent = 0;
					        var lastType = 'other';
					        // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
					        var transitions = {
					            'single->single': 0,
					            'single->closing': -1,
					            'single->opening': 0,
					            'single->other': 0,
					            'closing->single': 0,
					            'closing->closing': -1,
					            'closing->opening': 0,
					            'closing->other': 0,
					            'opening->single': 1,
					            'opening->closing': 0,
					            'opening->opening': 1,
					            'opening->other': 1,
					            'other->single': 0,
					            'other->closing': -1,
					            'other->opening': 0,
					            'other->other': 0
					        };

					        for (var i = 0; i < lines.length; i++) {
					            var ln = lines[i];
					            var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
					            var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
					            var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
					            var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
					            var fromTo = lastType + '->' + type;
					            lastType = type;
					            var padding = '';

					            indent += transitions[fromTo];
					            for (var j = 0; j < indent; j++) {
					                padding += '\t';
					            }
					            if (fromTo == 'opening->closing')
					                formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
					            else
					                formatted += padding + ln + '\n';
					        }

					        return formatted;
					    };
						headers = headers.replace(/, /gi, "\n, ");
						
						if(record.data.status == 'E'){
							outBody = record.data.causedByException;
						}
						
						view.up('window[id=xmlDialog]').down('panel[name=msgPanel]').down('[name=headers]').setCodemirrorValue(headers);
						view.up('window[id=xmlDialog]').down('panel[name=msgPanel]').down('[name=inMsg]').setCodemirrorValue(formatXml(this.changeEditorFormet(body)));
						if(outBody == ''){
							view.up('window[id=xmlDialog]').down('panel[name=msgPanel]').down('[name=outMsg]').setCodemirrorValue(formatXml(this.changeEditorFormet(body)));
						}else{
							view.up('window[id=xmlDialog]').down('panel[name=msgPanel]').down('[name=outMsg]').setCodemirrorValue(formatXml(this.changeEditorFormet(outBody)));
						}
						
						
					}
				},
				
				changeEditorFormet: function(value){
					var rValue = value;
					if(rValue == null){
						return "";
					}
					//map
					if(rValue.startsWith("{")){
						rValue = rValue.replace(/, /gi, ",\n");
					}
					//list
					if(rValue.startsWith("[")){
						rValue = rValue.replace(/, /gi, ",\n");
					}
					//xml
					if(rValue.startsWith("<")){
						rValue = rValue.replace(/></gi, ">\n<");
					}
					return rValue;
				}
			});
			
			var xmlDialog = new Ext.Window({
				id:'xmlDialog',
				iconCls: 'indigoModelerBullet',
				title:'메시지 현황',
				width:1000,
				height:690,
				layout:'anchor',
				bodyStyle:"background-color: white",
		        bodyPadding:"0 0 0 0",
		        bodyStyle:{"border":"0px"},
		        resizable: false,
		        modal: true,
		        items:[{
		        	xtype:'xmlDataGrid', anchor:'100% 50%',
		        },{
		        	xtype:'panel', name:'msgPanel', layout:'hbox', anchor:'100% 50%',
		        	items:[{
		        		xtype:'form', layout:'fit', name:'headers_form', title:'헤더', iconCls: 'indigoModelerBullet',
		        		width:'33%', height:'100%',
		        		items:[{
		        			xtype:'CodeMirrorEditor',
		        			name:'headers'
		        		}]
		        	},{
		        		xtype:'form', layout:'fit', name:'inMsg_form', title:'들어온 메시지', iconCls: 'indigoModelerBullet',
		        		width:'33%', height:'100%',
		        		items:[{
		        			xtype:'CodeMirrorEditor',
		        			name:'inMsg'
		        		}]
		        	},{
		        		xtype:'form', layout:'fit', name:'outMsg_form', title:'나간 메시지', iconCls: 'indigoModelerBullet',
		        		width:'33%', height:'100%',
		        		items:[{
		        			xtype:'CodeMirrorEditor',
		        			name:'outMsg'
		        		}]
		        	}]
		        }],
		        buttons:[{
		        	text: '닫기',
//		        	iconCls: 'no',
		        	glyph: GlyphManager.getGlyph('CANCEL'),
					cls: 'glyph-btn-red',
		        	handler: function () { this.up('.window').close(); }
		        }]
			});
			
			xmlDialog.show();
			xmlDialog.down('xmlDataGrid').bindStore(xmlDataStore);
		}
	},
	
	
//	onClick:function(){
//		this.selectPolicy.onSelect(this.getCanvas(), this, true);
//	},
	getComponentConfigure: function(){
		return this.componentConfigure;
	},
	
	getComponentLabelName: function(){
		return this.componentConfigure.alias;
	},
	
	getComponentType: function(){
		return this.componentConfigure.componentType;
	},
	
	setGroupBoxId: function(groupBoxId){
		this.groupBoxId = groupBoxId;
	},
	
	getGroupBoxId: function(){
		return this.groupBoxId;
	}
});
