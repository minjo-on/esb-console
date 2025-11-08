/**
* Report 폼 접수 panel 
*/
Ext.define('IndigoESBWebConsole.view.site.sample.popup.report.ReportFormPanel', {
	extend: 'Ext.form.FormPanel',
	requires: [
		'IndigoESBWebConsole.common.TextField',
		'IndigoESBWebConsole.common.TextArea',
		'IndigoESBWebConsole.common.FieldContainer',
		'IndigoESBWebConsole.common.NumberField',
		'IndigoESBWebConsole.common.ComboBox',
	],

	alias: 'widget.ReportFormPanel',

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
									xtype: 'indigoFieldContainer', border: 0, layout: 'hbox', fieldLabel: '구분', labelClsExtra: 'indigo_required', margin: '15 0 0 0',
									items: [{
										xtype: 'indigoSwitchButtonSegment', name: 'e_type', margin: 0, width: 155,
										items: [{ text: '침해보고', name: 'security_incident_Y', inputValue: 'S', width: 60, pressed: true },
										{ text: '에러', name: 'error_Y', inputValue: 'E', width: 50 }
										]
									}]
								}]
							},
							]
						},
						{ xtype: 'indigoTextField', name: 'title', fieldLabel: '제목', labelClsExtra: 'indigo_required', margin: '15 0 15 0', padding: 0, allowBlank: false, maxLength: 500, plugins: [Ext.create('Ext.ux.FieldHelp', '접수내역의 제목을 입력하세요.')] },
						{ xtype: 'indigoTextArea', name: 'current_Situation', fieldLabel: '현황 및 증상', labelClsExtra: 'indigo_required', margin: '15 0 15 0', padding: 0, allowBlank: false, maxLength: 4000, pplugins: [Ext.create('Ext.ux.FieldHelp', '발생시점, 현황, 증상 등 최대한 구체적으로 작성해주세요.')] },
						{
							xtype: 'indigoFieldContainer', name: 'user_popup_field_group_row2', layout: 'hbox',
							items: [
								{ xtype: 'indigoTextField', name: 'department', fieldLabel: '부서', labelClsExtra: 'indigo_required', flex: 0.5, allowBlank: false, maxLength: 200, plugins: [Ext.create('Ext.ux.FieldHelp', '부서를 입력하세요.')] },
								{
									xtype: 'indigoTextField', name: 'contact_Number', fieldLabel: '연락처', flex: 0.5, allowBlank: false, maxLength: 100, plugins: [Ext.create('Ext.ux.FieldHelp', '연락 받을 전화번호를 입력하세요.')], msgTarget: 'under', labelClsExtra: 'indigo_required',
									validator: function(value) {
										if (value.indexOf('-') != -1) {
											value = value.replace(/-/g, '');
										}
										var telValidation = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})$/;
										var result = telValidation.test(value);
										if (result) {
											return true;
										} else {
											return '전화번호 형식에 맞지 않습니다.';
										}
									},
									listeners: {
										change: function(view) {
											var rawValue = view.getValue();
											if (rawValue.indexOf('-') != -1) {
												rawValue = rawValue.replace(/-/g, '');
											}
											if (rawValue.length == 9) {
												rawValue = rawValue.substring(0, 3) + '-' + rawValue.substring(3, 6) + '-' + rawValue.substring(6, 9);
											} else if (rawValue.length == 10) {
												rawValue = rawValue.substring(0, 3) + '-' + rawValue.substring(3, 6) + '-' + rawValue.substring(6, 10);
											} else if (rawValue.length == 11) {
												rawValue = rawValue.substring(0, 3) + '-' + rawValue.substring(3, 7) + '-' + rawValue.substring(7, 11);
											}
											view.setValue(rawValue);
										}
									}
								}
							]
						},
						{ xtype: 'indigoTextField', name: 'receive_Email', vtype: 'email', fieldLabel: '이메일', labelClsExtra: 'indigo_required', margin: '15 0 15 0', padding: 0, flex: 0.32, allowBlank: false, maxLength: 200, plugins: [Ext.create('Ext.ux.FieldHelp', '연락 받을 이메일을 입력하세요.')] },
						
						//드롭다운
						{	
							xtype: 'indigoCombo', name: 'grp', editable: false, width: 300,
			 				store: 'common.IndigoESBWebConsoleGroupListStore', value:'indigo', margin: '15 0 15 0',
			 				
			 				fieldLabel: '샘플',  
			 			}

					]
				},
			]
		});
		this.callParent(arguments);
	}
});