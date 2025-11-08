Ext.define('IndigoESBWebConsole.view.site.sample.db.select.condition.DbSelectConditionFormPanel', {
    extend: 'Ext.form.Panel',
    requires: [
        'IndigoESBWebConsole.common.TextField',
        'IndigoESBWebConsole.common.TextArea',
        'IndigoESBWebConsole.common.FieldContainer',
        'IndigoESBWebConsole.common.NumberField',
        'IndigoESBWebConsole.common.ComboBox',
    ],

    alias: 'widget.DbSelectConditionFormPanel',

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
                    xtype: 'indigoTextField',
                    fieldLabel: '인터페이스 이름',
                    itemId: 'interfaceNameField',
                    submitValue: false,
                    readOnly: true
                },
                {
                    xtype: 'hiddenfield',
                    name: 'interfaceId',
                    itemId: 'interfaceIdField',
                },
                {
                    xtype: 'indigoTextField',
                    name: 'tableName',
                    fieldLabel: '테이블명',
                    emptyText: '예: TB_SAMPLE_DATA',
                    itemId: 'tableNameField'
                },
                {
                    xtype: 'indigoTextField',
                    name: 'columnName',
                    fieldLabel: '컬럼명',
                    emptyText: '예: status',
                    itemId: 'columnNameField'
                },
                {
                    xtype: 'indigoCombo',
                    name: 'operator',
                    fieldLabel: '연산자',
                    editable: false,        // 직접 입력 못 하게
                    forceSelection: true,   // 반드시 목록 중에서만 선택
                    queryMode: 'local',
                    store: [
                        ['=', '= (같음)'],
                        ['!=', '!= (같지 않음)'],
                        ['>', '> (초과)'],
                        ['<', '< (미만)'],
                        ['>=', '>= (이상)'],
                        ['<=', '<= (이하)'],
                        ['LIKE', 'LIKE (포함)'],
                        ['IN', 'IN (집합 내)'],
                        ['NOT IN', 'NOT IN (집합 제외)'],
                        ['IS NULL', 'IS NULL (널값)'],
                        ['IS NOT NULL', 'IS NOT NULL (널 아님)']
                    ],
                    valueField: 'field1',      // 위 배열의 첫 번째 값 (= 연산자)
                    displayField: 'field2',    // 두 번째 값 (= 사용자에게 보이는 설명)
                    emptyText: '연산자를 선택하세요',
                    allowBlank: false,
                    itemId: 'operatorField'
                },
                {
                    xtype: 'indigoTextField',
                    name: 'value',
                    fieldLabel: '컬럼값',
                    emptyText: '예: N',
                    itemId: 'valueField'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'useUpdateValue',
                    fieldLabel: '조회 후 수정 여부',
                    boxLabel: '체크 시 수정 값을 입력합니다.',
                    inputValue: 1,
                    uncheckedValue: 0,
                    checked: false,
                    submitValue: false,
                    margin: 0,
                    listeners: {
                        change: function (checkbox, newValue) {
                            var form = checkbox.up('form'),
                                updateField = form.down('#updateValueField');

                            updateField.setVisible(newValue);
                            updateField.allowBlank = !newValue;
                            updateField.validate();
                        }
                    }
                },
                {
                    xtype: 'indigoTextField',
                    name: 'updateValue',
                    fieldLabel: '조회 후 수정 값',
                    emptyText: '예: Y',
                    itemId: 'updateValueField',
                    hidden: true,
                    allowBlank: true,
                },
                {
                    xtype: 'checkboxfield',
                    name: 'used',
                    fieldLabel: '사용 여부',
                    boxLabel: '해당 컬럼을 쿼리 조건으로 사용합니다.',
                    inputValue: 1,
                    uncheckedValue: 0,
                    checked: true,
                    margin: 0,
                    itemId: 'usedField'
                }
            ]
        });
        me.callParent(arguments);
    }
});
