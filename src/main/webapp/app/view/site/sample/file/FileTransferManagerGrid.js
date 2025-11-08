Ext.define('IndigoESBWebConsole.view.site.sample.file.FileTransferManagerGrid', {
	extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleGrid',

	alias: 'widget.FileTransferManagerGrid',
	cls: 'custom-header-grid',

	store: 'IndigoESBWebConsole.store.FileTransferManagerStore',
	useLoadStore: true,
	autoScroll: false,

	viewConfig: {
		enableTextSelection: false,
		loadMask: false
	},

	initComponent: function () {
		var me = this;

		this.columns = [
			{ text: '인터페이스 ID', xtype: 'indigoLeftColumn', dataIndex: 'interfaceId', width: 160 },
			{ text: '테이블명', xtype: 'indigoLeftColumn', dataIndex: 'tableName', width: 160 },
			{ text: '구분자', xtype: 'indigoCenterColumn', dataIndex: 'delimiter', width: 60 },
			{ text: '필드명', xtype: 'indigoLeftColumn', dataIndex: 'columns', flex: 1 },
			{ text: '인코딩', xtype: 'indigoCenterColumn', dataIndex: 'encoding', width: 80 },
			{
				text: '헤더여부', xtype: 'indigoCenterColumn', dataIndex: 'hasHeader', width: 80, align: 'center', renderer: function (value) {
					if (value === 'Y') {
						return 'Yes';
					} else {
						return 'No';
					}
				}
			},
			{ text: '파일확장자', xtype: 'indigoCenterColumn', dataIndex: 'fileExtension', width: 80 },
			{
				text: '생성일시', xtype: 'indigoCenterColumn', dataIndex: 'createdAt', width: 150,
				renderer: function (value) {
					return value ? value : '';
				}
			},
			{
				text: '수정일시', xtype: 'indigoCenterColumn', dataIndex: 'updatedAt', width: 150,
				renderer: function (value) {
					return value ? value : '';
				}
			}
		];

		this.callParent(arguments);

		// 모든 컬럼(rownumberer 포함)에 공통 스타일 및 수직 정렬 적용
		Ext.each(this.columns, function (column) {
			var originalRenderer = column.renderer;
			column.renderer = function (value, metaData, record, rowIndex, colIndex, store, view) {
				var renderedValue = value;
				if (originalRenderer) {
					// 기존 렌더러가 있으면 호출
					renderedValue = originalRenderer.apply(this, arguments);
				}

				metaData.tdAttr = 'style="vertical-align: middle;"';

				return '<div style="padding: 2px 5px 2px 5px; font: normal 11px / 20px tahoma, arial, verdana, sans-serif;">' + renderedValue + '</div>';
			};
		});
	}

});
