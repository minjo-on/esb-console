Ext.define('IndigoESBWebConsole.view.site.sample.popup.report.ReportListGrid', {
	extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleGrid',

	alias: 'widget.ReportListGrid',

	store: 'IndigoESBWebConsole.view.site.sample.popup.report.ReportListStore',
	useAutoNumber: false,


    initComponent: function() {
		var me = this;
		this.columns = [
			{ text: '번호', xtype: 'rownumberer', dataIndex: 'ROWNUM', width: 45, align: 'center' },
			{ text: '사고 분류', xtype: 'indigoNoMenuColumn', flex: 0.2, dataIndex: 'REPORT_TYPE' },
			{ text: '제목', xtype: 'indigoLeftColumn', flex: 0.6, dataIndex: 'TITLE', tdCls: 'cell-blue' },
			{ text: '부서', xtype: 'indigoCenterColumn', flex: 0.3, dataIndex: 'DEPARTMENT' },
			{ text: '작성자 ID', xtype: 'indigoCenterColumn', flex: 0.2, dataIndex: 'USER_ID' },
			{ text: '연락처', xtype: 'indigoCenterColumn', flex: 0.3, dataIndex: 'CONTACT_NUMBER' },
			{ text: '이메일', xtype: 'indigoCenterColumn', flex: 0.3, dataIndex: 'RECEIVE_EMAIL'},
			{
				text: '전송일시', xtype: 'indigoCenterColumn', flex: 0.3, dataIndex: 'REG_DATE',
				renderer: function(val) {
//					console.log(typeof(val));
//					return Ext.Date.format(Ext.Date.parse(val, 'Y-m-d H:i:s'), 'Y-m-d H:i:s');
					return Ext.Date.format(Ext.Date.parse(val, 'YmdHisu'), 'Y-m-d H:i:s');
				}
			}];

		// 그리드에 itemclick 이벤트 리스너 추가
        this.on('itemclick', me.onItemClick, me);
		this.callParent(arguments);
	},

	onItemClick: function(grid, record, item, index, e, eOpts) {
        var reportSeq = record.get('REPORT_SEQ'); // report_seq 값 읽어오기
		
        // reportSeq 값을 리스너에 전달하거나 처리하기
        // 여기에서 원하는 동작을 수행하면 됩니다.
        // 예를 들어 다른 컴포넌트에 값을 전달하거나 특정 이벤트를 발생시킬 수 있습니다.
        var win = Ext.create('IndigoESBWebConsole.view.site.sample.popup.report.ReportDetailWindow', {
			reportSeq : reportSeq
		}).show();
		var errorYButton = win.down('ReportDetailFormPanel').down('[name=error_Y]');
		errorYButton.setDisabled(true);
		var securityIncidentY = win.down('ReportDetailFormPanel').down('[name=security_incident_Y]');
		securityIncidentY.setDisabled(true);
    }
}); 
