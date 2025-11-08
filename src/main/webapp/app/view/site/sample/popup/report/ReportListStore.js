Ext.define('IndigoESBWebConsole.view.site.sample.popup.report.ReportListStore', {
    extend: 'Ext.data.Store',    
    model : 'IndigoESBWebConsole.view.site.sample.popup.report.ReportListModel',
    
    alias: 'widget.ReportListStore',
    
    pageSize : 40,
    proxy: {
        type: 'ajax',
        url : 'ReportController?cmd=get-report-list',
        reader: {
            type: 'json',
            root: 'rs_list',
            totalProperty: 'total_count'
        },
    }, 
    
    listeners: {	//데이터를 받아오는데 성공했는지 확인
	    load: function(store, records, success) {
	        if (success) {			
	        }
	    }
	},
    autoLoad: false
});