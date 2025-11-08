var RouteFigure = ComponentGroupFigure.extend({
	
	NAME: "RouteFigure",
	
	init:function()
    {
		// 디폴트 라우트 그룹을 생성
    	this.componentConfigure = new Object();
    	this.componentConfigure["componentType"] = "route";
    	this.componentConfigure["alias"] = "Route";
    	this.componentConfigure["tagName"] = "route";
    	this.componentConfigure["useChild"] = "true";
    	this.componentConfigure["img"] = "Language.png";
		
		this._super(this.componentConfigure);
		
//		this.setWidth(270);
//		this.setHeight(184);
	},	
	
	initPort: function(){
   
	},

	setPersistentAttributes : function(memento) {
		this._super(memento, this.componentConfigure);
	}
});