var ErrorHandlerFigure = draw2d.shape.composite.Jailhouse.extend({
	
	NAME: "ErrorHandlerFigure",
	
	titleHeight : 30,
	
	init:function(componentConfigure)
    {
		this._super({opacity : 0.6});
		
		this.componentConfigure = componentConfigure;

		this.isTestState = false;
    	
		this.testCount = 0;
		this.testResultList = [];
    	
		// view config
		this.setBackgroundColor("#EFEFEF");
		this.setDashArray("- ");
		this.setColor("#B8B8B7");
		this.setRadius(10);
		
		this.accessComposite = true;
		
		this.setWidth(270);
		this.setHeight(184);
		this.setResizeable(true);
		var routeInfo = this.createModelerfigureUserData(componentConfigure, true);

		this.componentType = componentConfigure.componentType;
		this.setRouteData(routeInfo);

		//port
		this.initPort();

		//title
		this.initTitle();
		
		this.componentType = componentConfigure.componentType;
		this.setRouteData(routeInfo);

		this.selectPolicy = new draw2d.policy.figure.ModelerSelectionFeedbackPolicy();
		this.installEditPolicy(this.selectPolicy);
	},
	
	initPort: function(){
		this.createPort("input", new draw2d.layout.locator.TopLocator());
    	this.createPort("output", new draw2d.layout.locator.BottomLocator());   
	},
	
	initTitle: function(){
		var userData = this.getUserData();
				
		var title = "["+userData.alias+"] "+ userData.id;
		
		this.titleFigure = new ModelerFigureTitle(title, "resources/img/eip/Language.png");
		this.titleFigure.setHeight(this.titleHeight);
		
		this.add(this.titleFigure, new FigureTitleLocator());
	},
	
	toFront: function(figure){
    	this._super(figure);
    	
    	this.titleFigure.toFront(this);
    },
	
	/**
	* 라우트 정보를 저장한다
	* @param routeInfo
	*/
	setRouteData: function(routeInfo){
	   this.setUserData(routeInfo);
	},
	
	/**
	 * ModelerfigureUserData를 만든다
	 * @param routeInfoType
	 * @returns
	 */
	createModelerfigureUserData: function(componentType, useAutoId){
		return new ModelerFigureUserData(componentType, useAutoId);
	},
	
	getComponentConfigure: function(){
		return this.componentConfigure;
	},
	
	getComponentLabelName: function(){
		return this.componentConfigure.alias;
	},
	
	getComponentType: function(){
		return this.componentConfigure.componentType;
	},
	
	//component 관점
	onDragStart: function( x, y, shiftKey, ctrlKey ){
		this.accessComposite = true;
		this.startX = this.getX();
		this.startY = this.getY();
		return this._super( x, y, shiftKey, ctrlKey  );
	},
	
	onDragEnd: function(x, y, shiftKey, ctrlKey  ){
		if(!this.accessComposite){
			this.setPosition(this.startX, this.startY);
		}
		this._super( x, y, shiftKey, ctrlKey );
	},
	
	
	//group 관점
	onDragEnter: function ( draggedFigure ){
		var util = this.getCanvas().componentValidationUtil;
		
		var composite = draggedFigure.getComposite();
		if(composite == null || composite.id != this.id){
			var valid = util.validateChild(this.componentType, draggedFigure.componentType);
			draggedFigure.accessComposite = valid;
			if(valid){
				this.setBackgroundColor("#98FF80");
			}else{
				this.setBackgroundColor("#FF8080");
			}
		}
		this._super(draggedFigure);
	},
	
	onDragLeave: function ( draggedFigure ){
		this.setBackgroundColor("#EFEFEF");
		this._super(draggedFigure);
	},
	
    assignFigure: function(figure)
    {
    	if(figure.accessComposite){
	    	this._super(figure);
    	}
    	return this;
    },
});