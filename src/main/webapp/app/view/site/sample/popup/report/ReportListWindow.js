/**	
 * ErrorList 팝업위젯	
 */
Ext.define('IndigoESBWebConsole.view.site.sample.popup.report.ReportListWindow', {
	extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleTitlePanel',

	alias: 'widget.ReportListWindow',
//	layout: 'fit',
//	width: 1000,
//	height: 700,
//	title: '문의 내역',
//	cancelButtonText: '닫기',
//	useOkButton: false,

	initComponent: function() {
		Ext.apply(this, {
//			dockedItems: [{
//				xtype: 'ReportListToolbar', // ReportListToolbar 추가
//				dock: 'top',
//			}],
			items: [{				
				xtype : 'panel',
				cls : 'titlePanelTab',
				layout : 'fit',
				border : false,
				dockedItems : [ {
					xtype : 'ReportListToolbar'
				}], 
				items : [{
					xtype : 'ReportListGrid'
				}]
			}]
		});
		this.callParent(arguments);
	}
});