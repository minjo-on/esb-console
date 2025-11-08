/**
* Report 폼 접수 window 
*/
Ext.define('IndigoESBWebConsole.view.site.sample.popup.report.ReportDetailWindow', {
	extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleWindow',	

	alias: 'widget.ReportDetailWindow', layout: 'fit',
	width: 800,
    title: '침해사고 및 에러 문의',	
//    okButtonText:'접수',
    reportSeq: null,
    cancelButtonText:'닫기',	
    useOkButton:false,
    
   initComponent: function () {
        Ext.apply(this, {
        	items:[{	
            	xtype : 'ReportDetailFormPanel',	
            	reportSeq: this.reportSeq
        	}]	
        });	
        this.callParent(arguments);	
    }	
});