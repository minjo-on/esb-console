Ext.define("IndigoESBWebConsole.controller.file.FileTransferManagerController", {
    extend: "Ext.app.Controller",

    views: [
        "site.sample.file.FileTransferManagerView",
        "site.sample.file.FileTransferManagerToolbarTop",
        "site.sample.file.FileTransferManagerToolbarBottom",
        "site.sample.file.FileTransferManagerGrid",
        "site.sample.file.ManagerWindow",
        "site.sample.file.ManagerFormPanel"
    ],
    stores: [
        "FileTransferManagerStore",
        "AtbInterfaceStore"
    ],
    models: [
        "FileTransferManagerModel"
    ],
    refs: [],

    init: function (app) {
        this.control({
            'FileTransferManagerGrid': {
                itemdblclick: this.onGridItemDoubleClick
            },
            'FileTransferManagerToolbarTop indigoSearchField[itemId=searchField]': {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER) {
                        this.onSearch(field);
                    }
                },
                onSearchTriggerClick: this.onSearch
            },
            'FileTransferManagerToolbarTop button[itemId=addButton]': {
                click: this.onAddClick
            },
            'FileTransferManagerToolbarTop button[itemId=editButton]': {
                click: this.onEditClick
            },
            'FileTransferManagerToolbarTop button[itemId=deleteButton]': {
                click: this.deleteFileMeta
            },
            'ManagerWindow button[itemId=ok]': {
                click: this.onSaveClick
            },
            'ManagerWindow button[itemId=cancel]': {
                click: function (btn) {
                    btn.up('window').close();
                }
            },
            'FileTransferManagerToolbarTop button[itemId=refreshButton]': {
                click: this.onRefreshClick
            }
        });
    },

    onRefreshClick: function () {
        var searchField = Ext.ComponentQuery.query('FileTransferManagerToolbarTop indigoSearchField[itemId=searchField]')[0];
        var store = Ext.ComponentQuery.query('FileTransferManagerGrid')[0].getStore();

        // 검색 필드와 프록시 파라미터를 초기화합니다.
        searchField.setValue('');
        store.getProxy().setExtraParam('searchKeyword', '');
        store.load();
    },

    onSearch: function (field) {
        var store = Ext.ComponentQuery.query('FileTransferManagerGrid')[0].getStore();
        var searchValue = field.getValue();

        // 스토어 프록시에 검색 파라미터를 설정합니다.
        store.getProxy().setExtraParam('searchKeyword', searchValue);
        store.loadPage(1); // 검색 결과의 첫 페이지를 로드합니다.
    },

    onAddClick: function () {
        var win = Ext.create('IndigoESBWebConsole.view.site.sample.file.ManagerWindow');
        win.setTitle('파일 전송 설정 추가');
        win.down('combobox[name=interfaceId]').getStore().load();
        win.show();
    },

    onGridItemDoubleClick: function (view, record) {
        this.openEditWindow(record);
    },

    openEditWindow: function (record) {
        var win = Ext.create('IndigoESBWebConsole.view.site.sample.file.ManagerWindow');
        win.setTitle('파일 전송 설정 수정');
        win.down('form').loadRecord(record);
        win.down('combobox[name=interfaceId]').getStore().load({
            callback: function () {
                var combo = win.down('combobox[name=interfaceId]');
                combo.setValue(record.get('interfaceId'));
                combo.setReadOnly(true);
            }
        });
        win.show();
    },

    onEditClick: function () {
        var grid = Ext.ComponentQuery.query('FileTransferManagerGrid')[0];
        var selection = grid.getSelectionModel().getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('알림', '수정할 행을 선택하세요.');
            return;
        }
        this.openEditWindow(selection[0]);
    },

    onSaveClick: function (button) {
        var win = button.up('window'),
            form = win.down('form').getForm(),
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

        var url = isEdit ? 'FileTransferController?cmd=updateFileMeta' : 'FileTransferController?cmd=addFileMeta';
        var confirmMsg = isEdit ? '수정하시겠습니까?' : '새로운 설정을 추가하시겠습니까?';

        Ext.Msg.confirm("확인", confirmMsg, function (chk) {
            if (chk == 'yes') {
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
                            Ext.ComponentQuery.query('FileTransferManagerGrid')[0].getStore().load();
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

    deleteFileMeta: function (button) {
        var grid = Ext.ComponentQuery.query('FileTransferManagerGrid')[0];
        var selection = grid.getSelectionModel().getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('알림', '삭제할 행을 선택하세요.');
            return;
        }

        var record = selection[0];
        var interfaceId = record.get('interfaceId');
        var tableName = record.get('tableName');

        Ext.Msg.confirm('확인', '정말로 삭제하시겠습니까?', function (btn) {
            if (btn === 'yes') {
                Ext.Ajax.request({
                    url: 'FileTransferController?cmd=deleteFileMeta',
                    params: {
                        interfaceId: interfaceId,
                        tableName: tableName
                    },
                    success: function (response) {
                        var msg = Ext.JSON.decode(response.responseText);
                        if (msg.status === 'success') {
                            Ext.Msg.alert('성공', '데이터가 삭제되었습니다.');
                            Ext.ComponentQuery.query('FileTransferManagerGrid')[0].getStore().load();
                        } else {
                            Ext.Msg.alert('실패', '삭제에 실패했습니다.');
                        }
                    }
                });
            }
        });
    }
});
