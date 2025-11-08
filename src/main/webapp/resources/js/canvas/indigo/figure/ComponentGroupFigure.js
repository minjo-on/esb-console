var ComponentGroupFigure = ModelerFigure.extend({
	
	NAME: "ComponentGroupFigure",
	
	titleHeight : 32,
	
	init:function(componentConfigure)
    {
		this._super(componentConfigure);
		
		this.setWidth(270);
		this.setHeight(184);
		this.setResizeable(true);
		
		this.testSuccessCount = 0;
	    this.testErrorCount = 0;
	    this.testMeanProcessorTime = 0;
	},	

	setPersistentAttributes : function(memento, componentConfigure) {
		this._super(memento, componentConfigure);
	},
	
	initTitle: function(){
		var userData = this.getUserData();
				
		var title = "["+userData.alias+"] "+ userData.id;
		
		this.titleFigure = new ComponentGroupFigureTitle(title, "resources/img/eip/"+this.componentConfigure.img);
		this.titleFigure.setHeight(this.titleHeight);
		
		this.add(this.titleFigure, new FigureTitleLocator());
	},
	
	//컴포넌트 테스트 결과 셋팅
	setTestResult: function(figure, successCount, failCount, meanProcessorTime){	
    	if(this.labelRect == null){
    		this.labelRect =  new draw2d.shape.basic.Rectangle({x:0,y:00,width:50,height:33,bgColor:'#ffffff', alpha:0.4});
    		this.labelRect.setColor("#FFFFFF");
    		
    		this.testSuccessResultLabel = new draw2d.shape.basic.Label({fontColor: "#0000C9", bold: false, fontSize: 11, cssClass: "modeler-label"});
    		this.testErrorResultLabel = new draw2d.shape.basic.Label({fontColor: "#FF0000", bold: false, fontSize: 11, cssClass: "modeler-label"});
    		this.testMeanProcessorTimeLabel = new draw2d.shape.basic.Label({fontColor: "#616161", bold: false, fontSize: 11, cssClass: "modeler-label"});
    		
    		this.labelRect.setBackgroundColor(null);
    		this.labelRect.setColor(null);
			this.labelRect.add(this.testSuccessResultLabel, new draw2d.layout.locator.XYAbsPortLocator(-3,-3));
			this.labelRect.add(this.testErrorResultLabel, new draw2d.layout.locator.XYAbsPortLocator(-3,13));
//			this.labelRect.add(this.testMeanProcessorTimeLabel, new draw2d.layout.locator.XYAbsPortLocator(-24,27));
    	        
			this.add(this.labelRect,  new draw2d.layout.locator.XYAbsPortLocator(this.getWidth()-50,0));
    	}else{
    		this.labelRect.setVisible(true);
			this.testSuccessResultLabel.setVisible(true);
		    this.testErrorResultLabel.setVisible(true);
//		    this.testMeanProcessorTimeLabel.setVisible(true);
    	}
		
		this.testSuccessCount = successCount;
    	this.testErrorCount = failCount;
    	this.testMeanProcessorTime = meanProcessorTime;
		
		var labelText = '성공:'+this.testSuccessCount;
    	this.testSuccessResultLabel.setText(labelText);
    	
    	labelText = '에러:'+this.testErrorCount;
    	this.testErrorResultLabel.setText(labelText);
    	
    	labelText = '평균처리시간:'+this.testMeanProcessorTime+" ms";
    	this.testMeanProcessorTimeLabel.setText(labelText);
	},
});

var ComponentGroupFigureTitle = draw2d.shape.layout.Layout.extend({
	
	init:function(title, iconPath)
    {
		//, stroke:1
		this._super({bgColor: "#E0E0E0", radius: 5, color: "#616161", stroke:0.5});
		
		this.icon = new draw2d.shape.basic.Image({path:iconPath, width:39, height:26});
		this.label =  new draw2d.shape.basic.Label({text:title, cssClass: "modeler-label", color: "#ffffff", fontColor: "#616161", bold: false, fontSize: 11});
	
		this.icon.add(this.label, new draw2d.layout.locator.RightLocator());
		this.add(this.icon, new ComponentGroupFigureIconLocator());
	},
	
	getLabel: function() {
		return this.label;
	},
});

var ComponentGroupFigureIconLocator= draw2d.layout.locator.Locator.extend({
    NAME : "ComponentGroupFigureIconLocator",
    
    init: function()
    {
      this._super();
    },
    
    
    relocate: function(index, target)
    {
       target.setPosition(3, 3);
    }
});