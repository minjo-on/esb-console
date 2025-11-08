Ext.define('IndigoESBWebConsole.view.site.sample.SiteCustomMessageLogView', {
	extend : 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleTitlePanel',
	alias : 'widget.SiteCustomMessageLogView',

// 	initComponent : function() {
// 		Ext.apply(this, {
// 			items : [{
// 				xtype : 'panel',
// 				cls : 'titlePanelTab',
// 				layout : 'fit',
// 				border : false,
// 				dockedItems : [ {
// 					xtype : 'LogAiAnalyzeToolbarTop'
// 				}, {
// 					xtype : 'LogAiAnalyzeToolbarBottom'
// 				}], 
// 				items : [{
// 					xtype : 'LogAiAnalyzeGrid'
// 				}]
// 			}]
// 		});
// 		this.callParent(arguments);
// 	}
// });

	initComponent : function() {
		Ext.apply(this, {
			items : [{
				xtype : 'panel',
				cls : 'titlePanelTab',
				layout : 'card', // Change layout to card
				border : false,
				itemId: 'mainPanel',
				dockedItems : [ {
					xtype : 'SiteCustomMessageLogToolbarTop'
				}, {
					xtype : 'SiteCustomMessageLogToolbarBottom'
				}], 
				items : [{
					xtype : 'SiteCustomMessageLogGrid',
					itemId: 'logGrid'
				}]
			}]
		});
		this.callParent(arguments);
	}
});
