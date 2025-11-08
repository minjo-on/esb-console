Ext.define('IndigoESBWebConsole.store.AgentStore', {
    extend: 'Ext.data.Store',
    fields: ['pd_name', 'pd_id', 'pd_status'],
    proxy: {
        type: 'ajax',
        url: 'productController?cmd=im-list',
        reader: {
            type: 'json',
        rootProperty: '' // 최상위 배열
    },
    extractResponseData: function(response) {
        var data = Ext.decode(response.responseText);
        return data.im_list || [];
    }
    },
    autoLoad: true,
    //     listeners: {
    //     load: function(store, records, successful, operation, eOpts) {
    //         console.log('AgentStore loaded:', records, store, operation, successful);
    //     }
    // }
});
