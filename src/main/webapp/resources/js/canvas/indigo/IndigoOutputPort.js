IndigoOutputPort = draw2d.OutputPort.extend({

    NAME : "IndigoOutputPort",
    
    init: function(attr, setter, getter)
    {
        this._super(attr);
        
        this.portsConnectionValidationPolicy = new IndigoPortsConnectionValidationPolicy();
        
        this.installEditPolicy(this.portsConnectionValidationPolicy);
    },
    
    setGlow:function(flag, color){
    	this._super(flag);
    	if(flag == true && this.corona != null && color != null)
        {
    		this.corona.setBackgroundColor(color);
        }
        
        return this;
    },
    
    onDrop:function(dropTarget, x, y, shiftKey, ctrlKey)
    {
    	if(this.portsConnectionValidationPolicy.isDuplicateLine(this, dropTarget)
    			&& this.portsConnectionValidationPolicy.isValidateSourceNode(this, dropTarget))
    	{
    		this._super(dropTarget, x, y, shiftKey, ctrlKey);
    	}
    },
});