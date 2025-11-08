Ext.define('IndigoESBWebConsole.controller.db.select.DbSelectInterfaceController', {
    extend: 'Ext.app.Controller',

    views: [
        "site.sample.db.select.DbSelectView",
        "site.sample.db.select.interface.DbSelectInterfaceGrid",
        "site.sample.db.select.interface.DbSelectInterfaceFormPanel",
        "site.sample.db.select.interface.DbSelectInterfaceToolbarTop",
        "site.sample.db.select.interface.DbSelectInterfaceWindow",
    ],
    stores: [
        "DbSelectInterfaceStore"
    ],
    models: [
        "DbSelectInterfaceModel"
    ],
    refs: [],

    init: function(app) {
        this.control({
            'DbSelectInterfaceGrid' : {
                itemdblclick: this.onGridItemDoubleClick
            },
            'DbSelectInterfaceToolbarTop button[itemId=refreshButton]': {
                click: this.onRefreshClick
            },
            'DbSelectInterfaceToolbarTop button[itemId=addButton]': {
                click: this.onAddClick
            },
            'DbSelectInterfaceToolbarTop button[itemId=editButton]': {
                click: this.onEditClick
            },
            'DbSelectInterfaceToolbarTop button[itemId=deleteButton]': {
                click: this.onDeleteClick
            },
            'DbSelectInterfaceWindow button[itemId=ok]': {
                click: this.onSaveClick
            },
            'DbSelectInterfaceWindow button[itemId=cancel]': {
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
        var win = Ext.create('IndigoESBWebConsole.view.site.sample.db.select.interface.DbSelectInterfaceWindow');
        win.setTitle('DB 조회 컬럼 정보 추가');

        win.show();
    },

    onRefreshClick: function () {
        var searchField = Ext.ComponentQuery.query('FileTransferManagerToolbarTop indigoSearchField[itemId=searchField]')[0];
        var store = Ext.ComponentQuery.query('DbSelectInterfaceGrid')[0].getStore();

        searchField.setValue('');
        store.getProxy().setExtraParam('searchKeyword', '');
        store.load();
    },

    openEditWindow: function (record) {
        var win = Ext.create('IndigoESBWebConsole.view.site.sample.db.select.interface.DbSelectInterfaceWindow');
        win.setTitle('DB 조회 테이블 정보 수정');

        var form = win.down('form');
        form.loadRecord(record);

        form.down('#interfaceIdField').setValue(record.get('interfaceId')).setReadOnly(true);
        form.down('#interfaceNameField').setValue(record.get('interfaceName')).setReadOnly(true);
        form.down('#tableNameField').setValue(record.get('tableName'));

        win.show();
    },

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

        var url = isEdit ? 'DbSelectInterfaceController?cmd=update' : 'DbSelectInterfaceController?cmd=add';
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
                            Ext.ComponentQuery.query('DbSelectInterfaceGrid')[0].getStore().load();
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
        var grid = Ext.ComponentQuery.query('DbSelectInterfaceGrid')[0];
        var selection = grid.getSelectionModel().getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('알림', '수정할 행을 선택하세요.');
            return;
        }
        this.openEditWindow(selection[0]);
    },

    onDeleteClick: function (button) {
        var grid = Ext.ComponentQuery.query('DbSelectInterfaceGrid')[0];
        var selection = grid.getSelectionModel().getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('알림', '삭제할 행을 선택하세요.');
            return;
        }

        var record = selection[0];
        var interfaceId = record.get('interfaceId');

        Ext.Msg.confirm('확인', '정말로 삭제하시겠습니까?', function (btn) {
            if (btn === 'yes') {
                Ext.Ajax.request({
                    url: 'DbSelectInterfaceController?cmd=delete',
                    params: {
                        interfaceId: interfaceId
                    },
                    success: function (response) {
                        var msg = Ext.JSON.decode(response.responseText);
                        if (msg.status === 'success') {
                            Ext.Msg.alert('성공', '데이터가 삭제되었습니다.');
                            Ext.ComponentQuery.query('DbSelectInterfaceGrid')[0].getStore().load();
                        } else {
                            Ext.Msg.alert('실패', '삭제에 실패했습니다.');
                        }
                    }
                });
            }
        });
    }
});
