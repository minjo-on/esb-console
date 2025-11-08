/**
* Report 폼 접수 panel 
*/
Ext.define('IndigoESBWebConsole.view.site.sample.popup.report.ReportDetailFormPanel', {
	extend: 'Ext.form.FormPanel',
	requires: [
		'IndigoESBWebConsole.common.TextField',
		'IndigoESBWebConsole.common.TextArea',
		'IndigoESBWebConsole.common.FieldContainer',
		'IndigoESBWebConsole.common.NumberField',
		'IndigoESBWebConsole.common.ComboBox',
	],
	
	// reportSeq 멤버 변수 추가
	reportSeq: null,
	alias: 'widget.ReportDetailFormPanel',	
	

	initComponent: function() {
		var me = this;
		var user_id;
		
		IndigoESBWebConsole.util.IndigoAjax.request({
			url: 'indexController?cmd=get-session-attribute',
			async: false,
			params: { 'attr': 'SESSION_LOGIN_USER_ID' },
			success: function(response) {
				var msg = Ext.JSON.decode(response.responseText);
				user_id = msg.SESSION_LOGIN_USER_ID;
			}
		});
		
		IndigoESBWebConsole.util.IndigoAjax.request({
			url: 'ReportController?cmd=get-report',
			async: true,
			params: { 'reportSeq': this.reportSeq },
			success: function(response) {
				var values = Ext.JSON.decode(response.responseText);
				var msg = values.rs;

//			    var formPanel = me.up('window').down('form'); // 현재 패널 내의 폼을 가져옴
				var formPanel = me;

				// 필드 및 텍스트 영역에 데이터 설정
				formPanel.down('indigoSwitchButtonSegment').setValue(msg.report_Type); // 구분 필드 설정
				formPanel.down('indigoTextField[name=title]').setValue(msg.title); // 제목 필드 설정
				formPanel.down('indigoTextArea[name=current_Situation]').setValue(msg.current_Situation); // 현황 및 증상 텍스트 영역 설정
				formPanel.down('indigoTextField[name=department]').setValue(msg.department); // 부서 필드 설정
				formPanel.down('indigoTextField[name=contact_Number]').setValue(msg.contact_Number); // 연락처 필드 설정
				formPanel.down('indigoTextField[name=receive_Email]').setValue(msg.receive_Email); // 이메일 필드 설정
				formPanel.down('indigoTextField[name=REG_DATE]').setValue(Ext.Date.format(Ext.Date.parse(msg.reg_Date, 'YmdHisu'), 'Y-m-d H:i:s')); // 시간 필드 설정
			}
		});
		
		 
		Ext.apply(this, {
			items: [
				{
					xtype: 'form',
					autoScroll: false,
					layout: 'anchor',
					name: 'user_id',
					value: user_id,
					border: 0, padding: '0 20 15 0',
					items: [
						{
							xtype: 'indigoFieldContainer', name: 'user_popup_field_group_row1', layout: 'hbox',
							items: [{
								xtype: 'indigoFieldContainer', border: 0, layout: 'hbox', margin: '0 0 15 0',
								items: [{
									xtype: 'indigoFieldContainer', border: 0, layout: 'hbox', fieldLabel: '구분', margin: '15 0 0 0',
									items: [{
										xtype: 'indigoSwitchButtonSegment', name: 'type', margin: 0, width: 155, disable: true,
										items: [{ text: '침해사고', name: 'security_incident_Y', inputValue: 'S', width: 60, pressed: true },
										{ text: '에러', name: 'error_Y', inputValue: 'E', width: 50 },
										],
									}, 
									]
								},
									{ xtype: 'indigoTextField', name: 'REG_DATE', fieldLabel: '전송 시각', maxLength: 200, readOnly: true  }	
								]
							},
							]
						},
						{ xtype: 'indigoTextField', name: 'title', fieldLabel: '제목', margin: '15 0 15 0', padding: 0, maxLength: 500, readOnly: true },
						{ xtype: 'indigoTextArea', name: 'current_Situation', fieldLabel: '현황 및 증상', readOnly: true  },
						{
							xtype: 'indigoFieldContainer', name: 'user_popup_field_group_row2', layout: 'hbox',
							items: [
								{ xtype: 'indigoTextField', name: 'department', fieldLabel: '부서', flex: 0.5, maxLength: 200, readOnly: true  },
								{
									xtype: 'indigoTextField', name: 'contact_Number', fieldLabel: '연락처', flex: 0.5, maxLength: 100, msgTarget: 'under',
									readOnly: true 
								}
							]
						},
						{ xtype: 'indigoTextField', name: 'receive_Email', fieldLabel: '이메일', margin: '15 0 15 0', padding: 0, flex: 0.32, maxLength: 200, readOnly: true }
					]
				},
			]
		});
		this.callParent(arguments);
	}
});