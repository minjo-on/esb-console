Ext.define('Ext.ux.FieldHelp', {
    xtype: 'FieldHelp',
    
    constructor: function(t, align) {
    	this.helpText = t;
        this.align = align;
    },

    init: function(f) {
    	this.field = f;
    	f.helpAlign = this.align;
        f.helpText = this.helpText;
        f.afterRender = Ext.Function.createSequence(f.afterRender, this.afterFieldRender);
    },
    
    afterFieldRender: function () {
    	if (!this.input) {
    	    this.input = this.el.down('.x-form-item-body');
    	    
    	    //this.input.setStyle('width', '100%');
    	    /*console.log(this.input.dom);
    	    console.log(this.input.dom.style = 'width:100%');*/
    	    
    	    //this.input.dom.width = '100%';
    	    
//    	    this.onResize = Ext.Function.createSequence(this.onResize, function(w, h){
//    	    	console.log(this.input.dom.style.width);
//    	    	console.log(this.input.dom);
//    	    	this.input.dom.style.width = '100%'
////    	    	this.input.setSize('100%');
//    	    	console.log(this.input.dom.style.width);
//    	    	console.log(this.input.dom);
//    	    });
    	}
        
    	this.input.createChild({
            cls: 'x-form-helptext',
            html: this.helpText
        });
    }
});