Ext.define('IndigoESBWebConsole.view.site.sample.file.FileTransferManagerAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.FileTransferManagerAddWindow',

    title: '파일 전송 설정 추가',
    layout: 'fit',
    autoShow: true,
    modal: true,
    width: 500,

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            padding: '5 5 0 5',
            border: false,
            style: 'background-color: #fff;',
            
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'left',
                allowBlank: false,
                labelWidth: 120
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
                    forceSelection: true
                },
                { xtype: 'textfield', name: 'tableName', fieldLabel: '테이블명' },
                { xtype: 'textfield', name: 'delimiter', fieldLabel: '구분자' },
                { xtype: 'textfield', name: 'columns', fieldLabel: '컬럼스' },
                { xtype: 'textfield', name: 'encoding', fieldLabel: '인코딩' },
                { xtype: 'checkboxfield', name: 'hasHeader', fieldLabel: '헤더 여부', inputValue: true, uncheckedValue: false }
            ]
        }];

        this.buttons = [{
            text: '저장',
            action: 'save'
        }, {
            text: '취소',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});
