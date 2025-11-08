/**
* Report 폼 접수 window 
*/
Ext.define('IndigoESBWebConsole.view.site.sample.popup.report.ReportWindow', {
	extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleWindow',	

	alias: 'widget.ReportWindow', layout: 'fit',
	width: 1000,
    title: '침해사고 및 에러발생 문의',	
    okButtonText:'접수',
    cancelButtonText:'취소',
   initComponent: function () {	
        Ext.apply(this, {
        	items:[{	
            	xtype : 'ReportFormPanel',	
        	}]	
        });	
        this.callParent(arguments);	
    }	
});