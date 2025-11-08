Ext.define('IndigoESBWebConsole.view.site.sample.popup.report.ReportListModel', {
	extend: "Ext.data.Model",
	
    alias: 'widget.ReportListModel',
    
    fields: [
			"ROWNUM", 
			"RECEIVE_EMAIL", 
			"CURRENT_SITUATION",
			"TITLE",
			{
	            name: 'REPORT_TYPE',
	            type: 'string',
	            convert: function(value, record) {
	                if (value === 'T') {
	                    return 'test';
	                } else if (value === 'E') {
	                    return '에러';
	                } else if (value === 'S') {
	                    return '침해사고';
	                } else {
	                    return 'Unknown';
	                }
	            }
	        },
			"REG_DATE", 
			"USER_ID", 
			"TITLE", 
			"DEPARTMENT", 
			"CONTACT_NUMBER", 
			"REPORT_SEQ"
		]
}); 