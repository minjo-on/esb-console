Ext.define('IndigoESBWebConsole.store.EsbStore', {
    extend: 'Ext.data.Store',
    fields: ['name', 'value'],
    proxy: {
        type: 'ajax',
        url: 'jmxController?cmd=esb-server-name-list',
        reader: {
            type: 'json',
        rootProperty: '' // 최상위 배열
    },
    extractResponseData: function(response) {
        var data = Ext.decode(response.responseText);
        return data.serverNames || [];
    }
    },
    autoLoad: true,
    //     listeners: {
    //     load: function(store, records, successful, operation, eOpts) {
    //         console.log('esbstore loaded:', records, store, operation, successful);
    //     }
    // }
});