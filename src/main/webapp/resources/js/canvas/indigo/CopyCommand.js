CopyCommand = draw2d.command.Command.extend({

    NAME: "draw2d.command.CopyCommand",

    /**
     * @constructor
     * Create a add command for the given figure.
     * 
     * @param {draw2d.Canvas} canvas the canvas to use
     * @param {draw2d.Figure} figure the figure to add
     * @param {Number|draw2d.geo.Point} x the x-coordinate or a complete point where to place the figure
     * @param {Number} [y] the y-coordinate if x is a number and not a complete point
     */
    init: function(canvas, figureList, oldMappingFigureMap)
    {
       this._super(draw2d.Configuration.i18n.command.addShape);
       this.figureList = figureList;
       this.canvas = canvas;
       // 붙여넣기했던 ArrayList를 임시로 저장한 공간
       this.tempFigureList = null;
    },


    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
     * return false. The execution of this Command doesn't modify the model.
     *
     * @return {Boolean} return try if the command modify the model or make any relevant changes
     **/
    canExecute: function()
    {
        // 복사한 후에 붙여넣기가 되도록 조건이 되있기 때문에 붙여넣기는 무조건 실행
    	return true;
    },

    /**
     * @method
     * Execute the command the first time
     * 
     **/
    execute: function()
    {
    	var selectFigures = this.figureList;
    	var oldMappingFigureMap = {};
    	// 모든 clone된 객체를 담음 ArrayList
    	var cloneFigureList = new draw2d.util.ArrayList();
    	
    	for(var i = 0 ; i < selectFigures.getSize(); i++){
    		var figure = selectFigures.get(i);
    		
    		if(figure instanceof ModelerFigure){
    			var cloneFigure = figure.clone();
    			
    			// label 변경
    			var userdata = cloneFigure.getUserData();
     	   		var routeId = userdata.alias+"_"+getComponentSeq(userdata.componentType);
     	   		userdata.id = routeId;
     	   		// initTitle로 변경
     	   		cloneFigure.initTitle();
    			
    			this.canvas.add(cloneFigure, (cloneFigure.getX() + this.moveX), (cloneFigure.getY() + this.moveY));
    			cloneFigureList.add(cloneFigure);
    		}
    		// 기존 figure의 id를 key로 cloneFigure를 저장
			oldMappingFigureMap[figure.getId()] = cloneFigure;
    	}
    	
    	for(var i = 0 ; i < selectFigures.getSize(); i++){
    		var connection = selectFigures.get(i);
    		
    		if(connection instanceof RouteConnection){
    			var cloneConnection = connection.clone();
    			
    			// clone 전에 connection 객체에서 source와 target figure의 id를 가져옴
    			var sourceFigureId = connection.getSource().getParent().getId();
    			var targetFigureId =  connection.getTarget().getParent().getId();
    			
    			// cloneFigure를 매핑함
    			var cloneSourceFigure = oldMappingFigureMap[sourceFigureId];
    			var cloneTargetFigure = oldMappingFigureMap[targetFigureId];
    			
    			// cloneConnection을 연결
    			cloneConnection.setSource(cloneSourceFigure.getOutputPort(0));
    			cloneConnection.setTarget(cloneTargetFigure.getInputPort(0));
    			
    			this.canvas.add(cloneConnection);
    			cloneFigureList.add(cloneConnection);
    		}	
    	}
    	
    	// redo, undo 처리를 위해 임시 공간에 저장
    	this.tempFigureList = cloneFigureList;
    },
    
    /** 
     * @method
     * Redo the command after the user has undo this command
     * 복구 기능, 제거한 ArrayList를 원상태로 복구
     **/
    redo: function()
    {
    	var selectFigures = this.tempFigureList;
    	
    	for(var i = 0 ; i < selectFigures.getSize(); i++){
    		var figure = selectFigures.get(i);
    		
    		if(figure instanceof ModelerFigure){
    			this.canvas.add(figure, figure.getX(), figure.getY());
    		}
    	}
    	
    	for(var i = 0 ; i < selectFigures.getSize(); i++){
    		var connection = selectFigures.get(i);
    		
    		if(connection instanceof RouteConnection){
    			this.canvas.add(connection);
    		}
    	}
    },
    
    /**
     * @method
     * Undo the command
     * 이전 기능, 붙여넣기한 ArrayList 제거
     **/
    undo: function()
    {
    	var selectFigures = this.tempFigureList;
    	for (var i = 0; i < selectFigures.getSize(); i++) {
    		this.canvas.remove(selectFigures.get(i));
		}
    },
    
    /**
     * @method
     * setMoveXY the command
     * 커서의 위치를 저장
     */
    setMoveXY: function(x, y) {
    	this.moveX = x - this.figureList.get(0).getX();
    	this.moveY = y - this.figureList.get(0).getY();
    }
    
});