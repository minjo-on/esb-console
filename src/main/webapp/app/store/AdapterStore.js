Ext.define('IndigoESBWebConsole.store.AdapterStore', {
    extend: 'Ext.data.Store',
    fields: ['pd_name', 'pd_id', 'pd_status'],
    proxy: {
        type: 'ajax',
        url: 'projectAdaptorOperationController?cmd=adaptor-list',
        reader: {
            type: 'json',
        rootProperty: '' // 최상위 배열
    },
    extractResponseData: function(response) {
        var data = Ext.decode(response.responseText);
        return data.adaptor_list || [];
    }
    },
    autoLoad: true,
    //     listeners: {
    //     load: function(store, records, successful, operation, eOpts) {
    //         console.log('adaptorlist loaded:', records, store, operation, successful);
    //     }
    // }
});