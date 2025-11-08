Ext.define('IndigoESBWebConsole.store.FileTransferManagerStore', {
    extend: 'Ext.data.Store', // 표준 스토어를 상속

    alias: 'widget.FileTransferManagerStore',

    model: 'IndigoESBWebConsole.model.FileTransferManagerModel',

    proxy: {
        type: 'ajax',
        url: 'FileTransferController?cmd=list',
        reader: {
            type: 'json',
            rootProperty: '',      // transform이 반환할 객체의 'data' 속성
        },
        extractResponseData: function (response) {
            var data = Ext.decode(response.responseText);
            return data.data || [];
        }
    },

    autoLoad: false,
    // print log
    listeners: {
        load: function (store, records, successful, operation, eOpts) {
            console.log('FileTransferManagerStore loaded:', records);
        }
    }
});
