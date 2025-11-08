var ModelerFigureTitle = draw2d.shape.layout.Layout.extend({
	
	init:function(title, iconPath, locator)
    {
		//, stroke:1
		this._super({bgColor: "#616161", radius: 5, color: "#6B9FDA"});
		
		this.icon = new draw2d.shape.basic.Image({path:iconPath, width:59, height:37});
		this.label =  new draw2d.shape.basic.Label({text:title, cssClass: "modeler-label", color: "#ffffff", fontColor: "#ffffff", bold: false, fontSize: 11});
	
		if(locator == null){
			locator = new draw2d.layout.locator.RightLocator();
		}
		
		this.icon.add(this.label, locator);
		this.add(this.icon, new FigureIconLocator());
	},
	
	getLabel: function() {
		return this.label;
	},
});

var FigureIconLocator= draw2d.layout.locator.Locator.extend({
    NAME : "FigureIconLocator",
    
    init: function()
    {
      this._super();
    },
    
    
    relocate: function(index, target)
    {
       target.setPosition(5, 3);
    }
});