/**
* Report 폼 접수 window 
*/
Ext.define('IndigoESBWebConsole.view.site.sample.file.ManagerWindow', {
	extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleWindow',	

	alias: 'widget.ManagerWindow',
    layout: 'fit',
	width: 500,
    height: 350,
    bodyPadding: 10,
    okButtonText:'저장',
    cancelButtonText:'취소',
   initComponent: function () {	
        Ext.apply(this, {
        	items:[{	
            	xtype : 'ManagerFormPanel',	
        	}]	
        });	
        this.callParent(arguments);	
    }	
});
