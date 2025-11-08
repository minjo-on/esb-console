IndigoModelerCanvas = draw2d.Canvas.extend({
	
	init:function(id){
		this._super(id);

		var me = this;
		
		this.setScrollArea("#"+id);
		this.currentDropConnection = null;
		
		//draw 2d
		//port 사라짐
		this.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
		//조정 선 
		this.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy());
		
		//커넥션 생성 객체 변경
		this.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
	        createConnection: function(){
	            return new RouteConnection();
	        }
	    }));
		
		//컨텍스트 메뉴
		this.installEditPolicy(new CanvasSelectionPolicy(this));

		//this.installEditPolicy(new draw2d.policy.canvas.SnapToGridEditPolicy());
        
		//포트 생성 객체 변경
//        draw2d.Configuration.factory.createOutputPort = function(relatedFigure){
//        	return new IndigoOutputPort();
//        };
//        
//        draw2d.Configuration.factory.createInputPort = function(relatedFigure){
//        	return new IndigoInputPort();
//        };
//        
		
		//벨리데이션 관련 
//		this.componentValidationUtil = new ModelerComponentValidation();
        
		this.validationGroupFigure = null;
        this.validatePaletteFigure = true;
        
        //palette drag and drop. using jquery
       /* this.html.droppable({
            accept: '.draw2d_droppable',
            over: function(event, ui) {
                me.onDragEnter(ui.draggable);
            },
            out: function(event, ui) {
                me.onDragLeave(ui.draggable);
            },
            drop: function(event, ui){
            	event = me._getEvent(event);
                //var pos = me.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
            	//drop rect x, y
            	var pos = me.fromDocumentToCanvasCoordinate(ui.position.left, ui.position.top);
                me.onDrop(ui.draggable, pos.getX(), pos.getY(), event.shiftKey, event.ctrlKey);
            }
        });
        
        $(".draw2d_droppable").draggable({
            appendTo:"body",
            stack:"body",
            zIndex: 27000,
            helper:"clone",
            //cursor: "default",
            cursorAt: { top: 0, left: 0 },
            drag: function(event, ui){
                event = me._getEvent(event);
                //drag rect x, y
                var pos = me.fromDocumentToCanvasCoordinate(ui.position.left, ui.position.top);
                me.onDrag(ui, pos.getX(), pos.getY(), event.shiftKey, event.ctrlKey);
            },
            stop: function(e, ui){
            },
            start: function(e, ui){
                $(ui.helper).addClass("shadow");
            }
       });*/
    },

    /**
     * 파레트에서 선택한 컴포넌트를 움직일때 그룹(choice등의 라우트)을 만나면 자식으로 들어갈 수 있는지 판단하며 화면에 표현 한다
     * @param ui
     * @param x
     * @param y
     */
 /*   onDrag:function(ui, x, y )
    {
    	var me = this;
    	//div ui
    	var sourceType = $(ui.helper).data("componenttype");
    	me.validatePaletteFigure = false;
    	
    	var onDropChange = false;
    	
    	//자식으로 들어 갈 수있는 노드있지 색으로 나타낸다
    	this.getFigures().each(function(index, figure){
    		//마우스가 특정 컴포넌트 위에 올라갔을 때
    		if(figure.hitTest(x,y)){
    			var targetConfigure = figure.getComponentConfigure();
    			var targetCompType = targetConfigure.componentType;
    			var useChild = targetConfigure.useChild;
    			
    			//useChild 속성이 true인것만 자식을 갖는다
    			if(useChild){
    				onDropChange = true;
    				
    				//연속된 변경
    				if(me.validationGroupFigure != null && me.validationGroupFigure.id != figure.id){
    					me.validationGroupFigure.setBackgroundColor("#EFEFEF");
    		    	}
    				
    				//compare
    				me.validationGroupFigure = figure;
    				if(me.componentValidationUtil.validateChild(targetCompType, sourceType)){
    					me.validationGroupFigure.setBackgroundColor("#98FF80");
    					me.validatePaletteFigure = true;
    				}else{
    					me.validationGroupFigure.setBackgroundColor("#FF8080");
    					me.validatePaletteFigure = false;
    				}
    			}
    		}
    	});

    	//아우것도 선택되지 않았으면 변경된 색을 원래대로 바꾼다
    	if(!onDropChange){
    		me.initValidationFigure();
    	}
    },
    
    *//**
     * 파레트에서 선택한 컴포넌트가 캔버스로 들어올때
     * @param draggedDomNode
     *//*
    onDragEnter: function( draggedDomNode ){
    },
    
    *//**
     * 파레트에서 선택한 컴포넌트를 캔버스에서 놀을 때
     * @param droppedDomNode
     * @param x
     * @param y
     *//*
    onDrop : function(droppedDomNode, x, y)
    {	
    	var me = this;
    	var componentType = $(droppedDomNode).data("componenttype");
    	//drag 중 사용 가능 여부 판단
    	if(!me.validatePaletteFigure){
    		me.initValidationFigure();
    		return;
    	}
    	
    	//create figure
    	var figure = this.createModelerFigure(componentType);
    	this.drawFigure(figure, x, y);    	
    	
    	//드래그 이벤트중 사용한 컴포넌트 초기화
    	me.initValidationFigure();
    },*/
    
    /**
     * 두개의 컴포넌트에 선을 연결한다
     * @param sourceFigurePort
     * @param targetFigurePort
     */
    drawConnection: function(sourceFigurePort, targetFigurePort){
    	var command = new draw2d.command.CommandConnect( sourceFigurePort, targetFigurePort) ;
    	command.connection = new RouteConnection();
    	this.getCommandStack().execute(command);
    },
    
    
    /**
     * 컴포넌트를 x,y 에 그린다
     * @param figure
     * @param x
     * @param y
     */
    drawFigure: function(figure, x, y){
    	var command = new draw2d.command.CommandAdd(this, figure, x, y);
        this.getCommandStack().execute(command);
        
        if(this.validationGroupFigure != null){
        	this.validationGroupFigure.assignFigure(figure);
        }
    },
    
    /**
     * 벨이데이션 체크한 컴포넌트의 색상을 바꾼다
     */
    initValidationFigure: function(){
    	if(this.validationGroupFigure != null){
    		this.validationGroupFigure.setBackgroundColor("#EFEFEF");
		}
    	this.validationGroupFigure = null;
    },
    
    /**
     * 컴포넌트 객체를 만든다
     * @param componentType
     * @returns {ModelerFigure}
     */
    createModelerFigure:function(componentType){
    	//find component info
    	var componentConfigure = this.getComponentConfigure(componentType);
        var figure = null;
    	if(componentConfigure.useChild){
    		//create figure
        	figure = new ComponentGroupFigure(componentConfigure);
        	
    	}else{
    		figure = new ComponentFigure(componentConfigure);
    	}
    	return figure;
    },
    
    /**
     * xml에 정의된 컴포넌트 정보를 가져온다
     * @param componentType
     * @returns {___anonymous6472_6473}
     */
    getComponentConfigure: function(componentType){
    	var modelerConfigureStore = Ext.getStore('IndigoModelerConfigureStore');
    	//bug????
    	//var record = modelerConfigureStore.findRecord('componentType', componentType, 0, false, true);
    	var selectData = {};
    	modelerConfigureStore.each(function(record){
    		if(record.data.componentType == componentType){
    			selectData = record.data;
    			return false;
    		}
    		return true;
    	});
        return selectData;
    },
    
    renderJsonToCanvas: function (canvasData){
    	this.clear();
    	var reader = new draw2d.io.json.Reader();
    	reader.unmarshal(this, canvasData);
    },
    
    renderCanvasToJson: function(){
    	var writer = new draw2d.io.json.Writer();
    	writer.marshal = function(canvas){
           var result = [];
            canvas.getFigures().each(function(i, figure){
                result.push(figure.getPersistentAttributes());
            });
            
            canvas.getLines().each(function(i, element){
                result.push(element.getPersistentAttributes());
            });
            
        	draw2d.util.Base64.encode(JSON.stringify(result, null, 2));
        	return result;
        };
    	var json = writer.marshal(this);
    	return JSON.stringify(json,null,2);
    },
    
    doDeleteSelectFigure:function(){
    	var me = this;
    	var selectedNodeList = this.getSelection().getAll();
		
		selectedNodeList.each(function(index, selectedNode){
			me.doDeleteFigure(selectedNode);
		});
    },
    
    doDeleteFigure:function(figure){
    	var command = null;
    	
    	if(figure instanceof ModelerGroupFigure && figure.getAssignedFigures().getSize() >0){
    		command = new draw2d.command.CommandUngroup(this.canvas, figure);
    	}if(figure.getRoot() != null && figure.getRoot().cssClass.indexOf("Figure") != -1) {
    		// FigureTitleLocator이나 Label에서 우클릭해서 삭제하는 경우,
    		// figure의 최상위 노드가 ModeleFigure, RouteFigure, ErrorHandlerFigure일 때 최상위 노드 삭제
    		command = new draw2d.command.CommandDelete(figure.getRoot());
    	}else{
    		// 최상위 노드가 없는 ModeleFigure, RouteFigure, ErrorHandlerFigure 위치에서 삭제하는 경우,
    		// figure 삭제
    		command = new draw2d.command.CommandDelete(figure);
    	} 
 		this.getCommandStack().execute(command);
    }
});

