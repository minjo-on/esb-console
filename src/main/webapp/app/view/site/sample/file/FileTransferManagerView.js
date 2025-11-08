Ext.define('IndigoESBWebConsole.view.site.sample.file.FileTransferManagerView', {
	extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleTitlePanel',
	alias: 'widget.FileTransferManagerView',

	initComponent: function () {
		Ext.apply(this, {
			items: [{
				xtype: 'panel',
				cls: 'titlePanelTab',
				layout: 'fit',
				border: false,
				itemId: 'mainPanel',
				dockedItems: [{
					xtype: 'FileTransferManagerToolbarTop'
				}],
				items: [{
					xtype: 'FileTransferManagerGrid',
					itemId: 'logGrid'
				}]
			}]
		});
		this.callParent(arguments);
	}
});
