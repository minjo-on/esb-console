var ComponentFigure = ModelerFigure.extend({
	
	NAME: "ComponentFigure",
	
	titleHeight : 37,
	
	maxRouteIdSize : 15,
	
	init:function(componentConfigure)
    {
		this._super(componentConfigure);
		
		this.setWidth(59);
		this.setHeight(this.titleHeight);
		this.setResizeable(false);
		
	    this.testSuccessCount = 0;
	    this.testErrorCount = 0;
	    this.testMeanProcessorTime = 0;
	},	

	setPersistentAttributes : function(memento, componentConfigure) {
		this._super(memento, componentConfigure);
	},
	
	initTitle: function(){
		var userData = this.getUserData();
				
		//var title = "["+userData.alias+"] "+ userData.id;
		var routeId = userData.id;
		
		if(routeId != null && routeId.length > this.maxRouteIdSize){
			routeId = routeId.slice(0,this.maxRouteIdSize)+"...";
		}
		
		this.titleFigure = new ComponentFigureTitle(this, userData.alias, routeId, "resources/img/eip/"+this.componentConfigure.img);
		this.titleFigure.setHeight(this.titleHeight);
		
		this.add(this.titleFigure, new FigureTitleLocator());
	},
    
	//컴포넌트 테스트 결과 셋팅
	setTestResult: function(figure, successCount, failCount, meanProcessorTime){	
    	if(this.labelRect == null){
    		this.labelRect =  new draw2d.shape.basic.Rectangle({x:0,y:00,width:90,height:60,bgColor:'#ffffff', alpha:0.5});
    		this.labelRect.setColor("#FFFFFF");
    		
    		this.testSuccessResultLabel = new draw2d.shape.basic.Label({fontColor: "#0000C9", bold: false, fontSize: 11, cssClass: "modeler-label"});
    		this.testErrorResultLabel = new draw2d.shape.basic.Label({fontColor: "#FF0000", bold: false, fontSize: 11, cssClass: "modeler-label"});
			this.testMeanProcessorTimeLabel = new draw2d.shape.basic.Label({fontColor: "#616161", bold: false, fontSize: 11, cssClass: "modeler-label"});
    		
			this.labelRect.add(this.testSuccessResultLabel, new draw2d.layout.locator.XYRelPortLocator(1,1));
    	    this.labelRect.add(this.testErrorResultLabel, new draw2d.layout.locator.XYRelPortLocator(1,30));
    	    this.labelRect.add(this.testMeanProcessorTimeLabel, new draw2d.layout.locator.XYRelPortLocator(1,59));
    	        
    	    this.add(this.labelRect,  new draw2d.layout.locator.XYRelPortLocator(5,162));
    	}else{
    		this.labelRect.setVisible(true);
			this.testSuccessResultLabel.setVisible(true);
		    this.testErrorResultLabel.setVisible(true);
		    this.testMeanProcessorTimeLabel.setVisible(true);
    	}
		
		this.testSuccessCount = successCount;
    	this.testErrorCount = failCount;
    	this.testMeanProcessorTime = meanProcessorTime;
		
		var labelText = '성공: '+ this.testSuccessCount;
    	this.testSuccessResultLabel.setText(labelText);
    	labelText = '에러: '+ this.testErrorCount;
    	this.testErrorResultLabel.setText(labelText);
    	labelText = '처리시간:'+ this.testMeanProcessorTime+" ms";
    	this.testMeanProcessorTimeLabel.setText(labelText);
	},
});

var ComponentFigureTitle = draw2d.shape.layout.Layout.extend({
	
	init:function(componentFigure, alias, routeId, iconPath)
    {
		//, stroke:1
		this._super({bgColor: "#616161", radius: 5, color: "#6B9FDA"});
		
		this.icon = new draw2d.shape.basic.Image({path:iconPath, width:59, height:37, 
			onClick:function(){
				componentFigure.onClick();
			},
			onDoubleClick:function(){
				componentFigure.onDoubleClick();
			}});
		this.alias =  new draw2d.shape.basic.Label({text:"["+alias+"]", cssClass: "modeler-label", color: "#616161", fontColor: "#616161", bold: false, fontSize: 11});
		this.routeId =  new draw2d.shape.basic.Label({text:routeId, cssClass: "modeler-label", color: "#616161", fontColor: "#616161", bold: false, fontSize: 11});
	
		this.icon.add(this.alias, new draw2d.layout.locator.TopLocator());
		this.icon.add(this.routeId, new draw2d.layout.locator.BottomLocator());
		this.add(this.icon, new ComponentFigureIconLocator());
	},
	
	getLabel: function() {
		return this.label;
	},
});

var ComponentFigureIconLocator= draw2d.layout.locator.Locator.extend({
    NAME : "ComponentFigureIconLocator",
    
    init: function()
    {
      this._super();
    },
    
    
    relocate: function(index, target)
    {
       target.setPosition(0, 0);
    }
});