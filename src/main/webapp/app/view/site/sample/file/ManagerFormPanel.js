Ext.define('IndigoESBWebConsole.view.site.sample.file.ManagerFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ManagerFormPanel',

    border: false,
    style: 'background-color: #fff;',
    bodyPadding: 10,

    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            fieldDefaults: {
                labelAlign: 'left',
                allowBlank: false,
                labelWidth: 120,
                msgTarget: 'side',
                anchor: '100%' // Apply anchor to all fields by default
            },
            defaults: {
                margin: '0 0 15 0'
            },
            items: [
                {
                    xtype: 'combobox',
                    name: 'interfaceId',
                    fieldLabel: '인터페이스 ID',
                    store: 'AtbInterfaceStore',
                    displayField: 'INTERFACE_NAME',
                    valueField: 'INTERFACE_ID',
                    queryMode: 'local',
                    forceSelection: true,
                    emptyText: '대상 인터페이스를 선택하세요'
                },
                {
                    xtype: 'textfield',
                    name: 'tableName',
                    fieldLabel: '테이블명',
                    emptyText: '예: TB_SAMPLE_DATA'
                },
                {
                    xtype: 'textfield',
                    name: 'columns',
                    fieldLabel: '컬럼 목록',
                    emptyText: '예: COL1,COL2,COL3'
                },
                {
                    xtype: 'textfield',
                    name: 'delimiter',
                    fieldLabel: '구분자',
                    emptyText: '예: ,',
                },
                {
                    xtype: 'combobox',
                    name: 'encoding',
                    fieldLabel: '인코딩',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'display'],
                        data: [
                            { value: 'UTF-8', display: 'UTF-8' },
                            { value: 'EUC-KR', display: 'EUC-KR' }
                        ]
                    }),
                    displayField: 'display',
                    valueField: 'value',
                    queryMode: 'local',
                    editable: false,
                    forceSelection: true,
                    emptyText: '인코딩 선택',
                    value: 'UTF-8'
                },
                {
                    xtype: 'combobox',
                    name: 'fileExtension',
                    fieldLabel: '파일 확장자',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'display'],
                        data: [
                            { value: 'csv', display: 'csv' },
                            { value: 'txt', display: 'txt' },
                            { value: 'xml', display: 'xml' },
                            { value: 'json', display: 'json' }
                        ]
                    }),
                    displayField: 'display',
                    valueField: 'value',
                    queryMode: 'local',
                    editable: false,
                    forceSelection: true,
                    emptyText: '파일 확장자를 선택하세요',
                    value: 'csv'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'hasHeader',
                    fieldLabel: '헤더 여부',
                    boxLabel: '파일의 첫 번째 줄을 헤더로 사용합니다.',
                    inputValue: 'Y',
                    uncheckedValue: 'N',
                    checked: true,
                    margin: 0
                }
            ]
        });
        me.callParent(arguments);
    }
});
