Ext.define('IndigoESBWebConsole.controller.db.select.DbSelectConditionController', {
    extend: 'Ext.app.Controller',

    views: [
        "site.sample.db.select.DbSelectView",
        "site.sample.db.select.condition.DbSelectConditionGrid",
        "site.sample.db.select.condition.DbSelectConditionToolbarTop",
        "site.sample.db.select.condition.DbSelectConditionWindow",
        "site.sample.db.select.condition.DbSelectConditionFormPanel",
        "site.sample.db.select.interface.DbSelectInterfaceGrid",
    ],
    stores: [
        "DbSelectConditionStore",
    ],
    models: [
        "DbSelectInterfaceModel",
        "DbSelectConditionModel",
    ],
    refs: [],

    init: function(app) {
        this.control({
            'DbSelectConditionGrid' : {
                itemdblclick: this.onGridItemDoubleClick
            },
            'DbSelectConditionToolbarTop button[itemId=refreshButton]': {
                click: this.onRefreshClick
            },
            'DbSelectConditionToolbarTop button[itemId=addButton]': {
                click: this.onAddClick
            },
            'DbSelectConditionToolbarTop button[itemId=editButton]': {
                click: this.onEditClick
            },
            'DbSelectConditionToolbarTop button[itemId=deleteButton]': {
                click: this.onDeleteClick
            },
            'DbSelectConditionWindow button[itemId=ok]': {
                click: this.onSaveClick
            },
            'DbSelectConditionWindow button[itemId=cancel]': {
                click: function (btn) {
                    btn.up('window').close();
                }
            }
        });
    },

    onGridItemDoubleClick: function (view, record) {
        this.openEditWindow(record);
    },

    onAddClick: function () {
        var win = Ext.create('IndigoESBWebConsole.view.site.sample.db.select.condition.DbSelectConditionWindow');
        win.setTitle('DB 조회 컬럼 정보 추가');

        var leftGrid = Ext.ComponentQuery.query('DbSelectInterfaceGrid')[0];
        var selected = leftGrid.getSelectionModel().getSelection()[0];

        if (!selected) {
            Ext.Msg.alert('알림', '먼저 인터페이스를 선택하세요.');
            return;
        }

        win.show();

        var form = win.down('form');
        form.down('#interfaceIdField').setValue(selected.get('interfaceId'));
        form.down('#interfaceNameField').setValue(selected.get('interfaceName'));
        form.down('#tableNameField').setValue(selected.get('tableName'));
    },

    onRefreshClick: function () {
        var store = Ext.ComponentQuery.query('DbSelectConditionGrid')[0].getStore();
        store.load();
    },

    openEditWindow: function (record) {
        var win = Ext.create('IndigoESBWebConsole.view.site.sample.db.select.condition.DbSelectConditionWindow');
        win.setTitle('DB 조회 컬럼 정보 수정');

        var leftGrid = Ext.ComponentQuery.query('DbSelectInterfaceGrid')[0];
        var selected = leftGrid.getSelectionModel().getSelection()[0];

        var form = win.down('form');
        form.loadRecord(record);

        form.down('#interfaceIdField').setValue(selected.get('interfaceId'));
        form.down('#interfaceNameField').setValue(selected.get('interfaceName'));
        form.down('#tableNameField').setValue(selected.get('tableName'));
        form.down('#columnNameField').setValue(record.get('columnName'));
        form.down('#operatorField').setValue(record.get('operator'));
        form.down('#valueField').setValue(record.get('value'));
        form.down('#usedField').setValue(record.get('used') === 1);

        var updateValue = record.get('updateValue');
        var checkbox = form.down('checkboxfield[name=useUpdateValue]');
        var updateField = form.down('#updateValueField');

        if (updateValue) {
            checkbox.setValue(true);
            updateField.setVisible(true);
            updateField.setValue(updateValue);
        } else {
            checkbox.setValue(false);
            updateField.setVisible(false);
            updateField.setValue('');
        }

        win.show();
    }
    ,

    onSaveClick: function (button) {
        var win = button.up('window'),
            formPanel = win.down('form'),
            form = formPanel.getForm(),
            values = form.getValues(),
            record = form.getRecord(),
            isEdit = !!record;

        if (!form.isValid()) {
            Ext.Msg.show({
                title: '경고',
                msg: '모든 필수항목을 입력하세요.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR,
            });
            return;
        }

        var useUpdateValue = formPanel.down('checkboxfield[name=useUpdateValue]').getValue();
        if (!useUpdateValue) {
            delete values.updateValue;
        } else {
            values.updateValue = formPanel.down('#updateValueField').getValue();
        }

        var url = isEdit ? 'DbSelectConditionController?cmd=update' : 'DbSelectConditionController?cmd=add';
        var confirmMsg = isEdit ? '수정하시겠습니까?' : '새로운 설정을 추가하시겠습니까?';

        Ext.Msg.confirm("확인", confirmMsg, function (chk) {
            if (chk === 'yes') {
                console.log('url : ',  url);
                console.log('params : ', values);
                Ext.Ajax.request({
                    url: url,
                    params: values,
                    success: function (response) {
                        var msg = Ext.JSON.decode(response.responseText);
                        if (msg.status === 'success') {
                            Ext.Msg.show({
                                title: '성공',
                                msg: '작업이 완료되었습니다.',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO
                            });
                            Ext.ComponentQuery.query('DbSelectConditionGrid')[0].getStore().load();
                            win.close();
                        } else {
                            Ext.Msg.show({
                                title: '실패',
                                msg: '작업에 실패했습니다.\n' + (msg.message ? msg.message : ''),
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                        }
                    }
                });
            }
        });
    },

    onEditClick: function () {
        var grid = Ext.ComponentQuery.query('DbSelectConditionGrid')[0];
        var selection = grid.getSelectionModel().getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('알림', '수정할 행을 선택하세요.');
            return;
        }
        this.openEditWindow(selection[0]);
    },

    onDeleteClick: function (button) {
        var grid = Ext.ComponentQuery.query('DbSelectConditionGrid')[0];
        var selection = grid.getSelectionModel().getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('알림', '삭제할 행을 선택하세요.');
            return;
        }

        var record = selection[0];
        var interfaceId = record.get('interfaceId');
        var columnName = record.get('columnName');

        Ext.Msg.confirm('확인', '정말로 삭제하시겠습니까?', function (btn) {
            if (btn === 'yes') {
                Ext.Ajax.request({
                    url: 'DbSelectConditionController?cmd=delete',
                    params: {
                        interfaceId: interfaceId,
                        columnName: columnName
                    },
                    success: function (response) {
                        var msg = Ext.JSON.decode(response.responseText);
                        if (msg.status === 'success') {
                            Ext.Msg.alert('성공', '데이터가 삭제되었습니다.');
                            Ext.ComponentQuery.query('DbSelectConditionGrid')[0].getStore().load();
                        } else {
                            Ext.Msg.alert('실패', '삭제에 실패했습니다.');
                        }
                    }
                });
            }
        });
    }
});
