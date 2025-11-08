Ext.define('IndigoESBWebConsole.view.site.sample.file.FileTransferManagerToolbarBottom', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.FileTransferManagerToolbarBottom',

	border: 0,
	items: [
		'->',
		{
			xtype: 'button',
			text: '새로고침',
			itemId: 'refreshButton',
			iconCls: 'fa fa-refresh',
			scale: 'medium',
			style: {
				backgroundColor: '#FE6900',
				borderColor: '#FE6900'
			}
		}
	]
});
