Ext.define('IndigoESBWebConsole.view.site.sample.db.select.interface.DbSelectInterfaceFormPanel', {
    extend: 'Ext.form.Panel',
    requires: [
        'IndigoESBWebConsole.common.ComboBox',
        'IndigoESBWebConsole.common.TextField',
        'IndigoESBWebConsole.common.TextArea',
        'IndigoESBWebConsole.common.FieldContainer'
    ],

    alias: 'widget.DbSelectInterfaceFormPanel',

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
                anchor: '100%'
            },
            defaults: {
                margin: '0 0 15 0'
            },
            items: [
                {
                    xtype: 'indigoCombo',
                    fieldLabel: '인터페이스 선택',
                    name: 'interfaceId',
                    displayField: 'interfaceName', // 화면에 보이는 값
                    valueField: 'interfaceId',     // 내부 값
                    queryMode: 'local',            // store에 이미 로드된 데이터 사용
                    editable: false,
                    store: Ext.create('IndigoESBWebConsole.store.DbSelectInterfaceDTPStore'),
                    listeners: {
                        select: function (combo, record) {
                            var form = combo.up('form');
                            form.down('#tableNameField').focus(); // 선택 후 다음 필드로 이동
                        }
                    }
                },
                {
                    xtype: 'indigoTextField',
                    name: 'tableName',
                    fieldLabel: '테이블명',
                    emptyText: '예: TB_SAMPLE_DATA',
                    itemId: 'tableNameField'
                }
            ]
        });
        me.callParent(arguments);
    }
});
