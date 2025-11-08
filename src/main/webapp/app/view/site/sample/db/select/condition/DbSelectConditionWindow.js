Ext.define('IndigoESBWebConsole.view.site.sample.db.select.condition.DbSelectConditionWindow', {
	extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleWindow',	

	alias: 'widget.DbSelectConditionWindow',
    layout: 'fit',
	width: 500,
    height: 500,
    bodyPadding: 10,
    okButtonText:'저장',
    cancelButtonText:'취소',
   initComponent: function () {	
        Ext.apply(this, {
        	items:[{	
            	xtype : 'DbSelectConditionFormPanel',
        	}]	
        });	
        this.callParent(arguments);	
    }	
});
