Ext.define('IndigoESBWebConsole.view.site.sample.db.select.interface.DbSelectInterfaceWindow', {
	extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleWindow',	

	alias: 'widget.DbSelectInterfaceWindow',
    layout: 'fit',
	width: 500,
    height: 200,
    bodyPadding: 10,
    okButtonText:'저장',
    cancelButtonText:'취소',
   initComponent: function () {	
        Ext.apply(this, {
        	items:[{	
            	xtype : 'DbSelectInterfaceFormPanel',
        	}]	
        });	
        this.callParent(arguments);	
    }	
});
