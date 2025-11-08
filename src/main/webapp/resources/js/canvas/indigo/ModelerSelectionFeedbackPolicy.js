/**
 * @class draw2d.policy.figure.AntSelectionFeedbackPolicy 
 * 
 * Provide support for selecting and positioning a non-resizable figure. 
 * Selection is indicated via rectangular handle that outlines the figure with a 1-pixel black 
 * dotted line. 
 * 
 * See the example:
 *
 *     @example preview small frame
 *       circle =new draw2d.shape.basic.Circle();
 *       circle.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
 *       canvas.addFigure(circle,90,50);
 *
 *       canvas.addFigure(new draw2d.shape.basic.Label("Click on the circle to see the selection feedback"),20,10);
 *       
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.ModelerSelectionFeedbackPolicy = draw2d.policy.figure.RectangleSelectionFeedbackPolicy.extend({

    NAME : "draw2d.policy.figure.ModelerSelectionFeedbackPolicy",
    
    /**
     * @constructor 
     * Creates a new Router object
     */
    init: function( attr, setter, getter)
    {
        this._super( attr, setter, getter);
    },

    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     * 
     * @param {draw2d.Figure} figure the figure to decorate with a selection feedback
     * @param {boolean} isPrimarySelection
     */
    onSelect: function(canvas, figure, isPrimarySelection){
    	if(canvas == null){
    		return;
    	}
    	
    	//선택된 컴포넌트가 클릭한 적이 없다면
    	if (figure.selectionHandles.isEmpty()) {
    		IndigoModeler.app.getController("MainFrameController").onSelectComponent(figure.componentType, figure);
    		
    		var box = new draw2d.shape.basic.Rectangle();
            box.setBackgroundColor(null);
            box.setDashArray("- ");
            box.setAlpha(1);
            if(isPrimarySelection){
            	box.setColor("#ED7B20");
            }else{
            	box.setColor("#FF0000");
            }            
//            box.setRadius(figure.getRadius());
            box.hide= function(){
                // IMPORTANT
                // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
                // dragDrop operation
                //canvas.resizeHandles.remove(box);
                box.setCanvas(null);
            };
            box.show= function(canvas){
                box.setCanvas(canvas);
                // IMPORTANT
                // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
                // dragDrop operation
                //canvas.resizeHandles.remove(box);
                //canvas.resizeHandles.add(box);
                box.shape.toFront();
            };
            box.show(canvas);
            
            // create standard Resize handles for the figure
            //
            var r1= draw2d.Configuration.factory.createResizeHandle(figure,1); // 1 = LEFT TOP
            var r3= draw2d.Configuration.factory.createResizeHandle(figure,3); // 3 = RIGHT_TOP
            var r5= draw2d.Configuration.factory.createResizeHandle(figure,5); // 5 = RIGHT_BOTTOM
            var r7= draw2d.Configuration.factory.createResizeHandle(figure,7); // 7 = LEFT_BOTTOM
            figure.selectionHandles.add(r1);
            figure.selectionHandles.add(r3);
            figure.selectionHandles.add(r5);
            figure.selectionHandles.add(r7);
            r1.show(canvas);
            r3.show(canvas);
            r5.show(canvas);
            r7.show(canvas);


            // change the look&feel of the corner resizehandles if the
            // figure isn't resizeable
            //
            if(figure.isResizeable()===false) {
              r1.setBackgroundColor(null);
              r3.setBackgroundColor(null);
              r5.setBackgroundColor(null);
              r7.setBackgroundColor(null);
              r1.setDraggable(false);
              r3.setDraggable(false);
              r5.setDraggable(false);
              r7.setDraggable(false);
            }

            // show only the additional resizehandles if the figure is resizeable and didn't care about
            // the aspect ration
            //
            if((!figure.getKeepAspectRatio()) && figure.isResizeable())
            {
                var r2= draw2d.Configuration.factory.createResizeHandle(figure,2); // 2 = CENTER_TOP
                var r4= draw2d.Configuration.factory.createResizeHandle(figure,4); // 4 = RIGHT_MIDDLE
                var r6= draw2d.Configuration.factory.createResizeHandle(figure,6); // 6 = CENTER_BOTTOM
                var r8= draw2d.Configuration.factory.createResizeHandle(figure,8); // 8 = LEFT_MIDDLE
                figure.selectionHandles.add(r2);
                figure.selectionHandles.add(r4);
                figure.selectionHandles.add(r6);
                figure.selectionHandles.add(r8);
                r2.show(canvas);
                r4.show(canvas);
                r6.show(canvas);
                r8.show(canvas);
            }

            // add the reference of the "ant box" to the figure as well. But wee add them
            // to the end of the array because inherit classes expect the resizehandles
            // on index 0-7.
            //
            figure.selectionHandles.add(box);

            // call the box.show() at last to ensure that the resize handles are above the 
            // rectangle. The rectangle did a toFront(parentShape);
            box.show(canvas);
        }
        this.moved(canvas, figure);
   },
   
   onUnselect: function(canvas, figure ){
	   this._super(canvas, figure );
   }
}); 