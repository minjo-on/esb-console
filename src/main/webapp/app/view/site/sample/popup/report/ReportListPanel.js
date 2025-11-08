Ext.define('IndigoESBWebConsole.view.site.sample.popup.report.ReportListPanel', {
	extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleTitlePanel',
          
    alias: 'widget.ReportListPanel',
    initComponent: function () {
        Ext.apply(this, {
			items: [{
				xtype: 'panel',
				layout:'fit',
        		border: false,
//				dockedItems: [{ 
//	        		xtype: 'ReportListToolbar',
//	        		dock: 'top'
//	        	}],
				items: [{ 
					xtype: 'ReportListGrid',
					adaptorName: this.adaptorName
				}]
			}]
        });
        this.callParent(arguments);
    }
});