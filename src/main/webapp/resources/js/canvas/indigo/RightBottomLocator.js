draw2d.layout.locator.RightBottomLocator = draw2d.layout.locator.Locator.extend({
    NAME : "draw2d.layout.locator.RightBottomLocator",
    
    /**
     * @constructor
     * Constructs a locator with associated parent.
     * 
     * @param {draw2d.Figure} parent the parent associated with the locator
     */
    init: function(parent)
    {
      this._super(parent);
    },
    
    
    /**
     * @method
     * Relocates the given Figure.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate:function(index, target)
    {
       var parent = this.getParent();
       var boundingBox = parent.getBoundingBox();
      
       var targetBoundingBox = target.getBoundingBox();
       target.setPosition(boundingBox.w+5,(boundingBox.h-targetBoundingBox.h));
    }
});