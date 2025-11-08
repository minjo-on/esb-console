RouteGroupInputLocator = draw2d.layout.locator.PortLocator.extend({
    NAME : "RouteGroupInputLocator",
     
    /**
     * @constructor
     * 
     * 
     * @param {Number} xPercentage the x coordinate in percent of the port relative to the left of the parent
     * @param {Number} yPercentage the y coordinate in percent of the port relative to the top of the parent
     */
    init: function(xPercentage ,yPercentage, routeFigureWidth, routeFigureHeight )
    {
      this._super();
      
      this.x = xPercentage;
      this.y = yPercentage;
      
      this.routeFigureWidth = routeFigureWidth;
      this.routeFigureHeight = routeFigureHeight;
    },    
   
   /**
    * @method
    * Controls the location of an I{@link draw2d.Figure} 
    *
    * @param {Number} index child index of the figure
    * @param {draw2d.Figure} figure the figure to control
    * 
    * @template
    **/
    relocate: function(index, figure)
    {
        var node = figure.getParent();
        var x = node.getWidth()/100 * this.x;
        var y = node.getHeight()/100  * this.y;

        this.applyConsiderRotation( figure, x + 20, y - (this.routeFigureHeight/2));
    }
    
});