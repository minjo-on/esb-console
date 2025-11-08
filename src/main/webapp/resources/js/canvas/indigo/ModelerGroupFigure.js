
ModelerGroupFigure = draw2d.shape.composite.Jailhouse.extend({
    NAME : "ModelerGroupFigure",
    
    init : function(alias)
    {
    	this._super({width:250, height:180, radius: 10});
    	
    	this.setBackgroundColor(null);
    	this.setDashArray("- ");
    	this.setColor("#B8B8B7");

//    	this.createPort("input");
//		this.createPort("output");
		//var errPort = this.createPort("output");
		//errPort.setGlow(true, "#FF0000");
		
		this.setUserData({
			//inputFigureId: inputFigureId,
			alias: alias
		});
		
		if(alias != null){
			this.setMessageRouteLabel(alias);
		}
	},
	
	//서블릿에서 넘어온 json data 파싱
	setPersistentAttributes: function(memento){
	   this._super(memento);
	   var jsonUserData = memento.userData;
	   
	   if(jsonUserData != null && jsonUserData.alias != null){
		   this.setMessageRouteLabel(jsonUserData.alias);
	   }
	},
	
	assignFigure: function(figure)
    {
		//other group remove
		//this.unassignAllGroupFigure(figure);
		if(figure instanceof ModelerFigure){
			figure.setGroupBoxId(this.getId());
		}
		return this._super(figure);
    },
    
//    unassignAllGroupFigure: function(figure, groupFigureList){
//    	var me = this;
//    	if(groupFigureList == null){
//    		groupFigureList = this.getCanvas().getFigures();
//    	}
//    	
//    	groupFigureList.each(function(index, groupFigure){
//    		if(groupFigure instanceof ModelerGroupFigure){
//    			groupFigure.unassignFigure(figure);
//        		
//        		if(groupFigure.getAssignedFigures().getSize() > 0){
//        			me.unassignAllGroupFigure(figure, groupFigure.getAssignedFigures());
//        		}
//    		}
//    	});
//    },
    
    
    initTestResult: function(){
		//
	},
	
	/**
	 * 상단 라벨을 만든다
	 * @param messageRouteName
	 */
	setMessageRouteLabel: function(messageRouteName){
		var me = this;
		var messageRouteLabel = new draw2d.shape.basic.Label({text:messageRouteName, cssClass: "modeler-label"});
        messageRouteLabel.setColor("#B8B8B7");
        messageRouteLabel.setFontColor("#B8B8B7");
        
        this.add(messageRouteLabel, new draw2d.layout.locator.TopLocator(this));
        
        messageRouteLabel.installEditor(new draw2d.ui.LabelInplaceEditor({
		    onCommit: $.proxy(function(value){
		    	me.getUserData().alias = value;
		    	//alert("new value set to:"+value);
		    },this),
		    onCancel: function(){
		      
		    }
        }));
	},
});
