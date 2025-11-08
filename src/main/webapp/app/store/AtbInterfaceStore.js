Ext.define('IndigoESBWebConsole.store.AtbInterfaceStore', {
    extend: 'Ext.data.Store',
    alias: 'store.atbinterfacestore',
    
    fields: ['INTERFACE_ID', 'INTERFACE_NAME'],
    
    proxy: {
        type: 'ajax',
        url: 'FileTransferController?cmd=interfaceList',
        reader: {
            type: 'json',
            rootProperty: ''
        },
        extractResponseData: function(response) {
            var data = Ext.decode(response.responseText);
            return data.data || [];
        }
    },
    
    autoLoad: false,

    listeners: {
        load: function(store, records, successful, operation, eOpts) {
            console.log('AtbInterfaceStore loaded. Successful:', successful);
            console.log('AtbInterfaceStore records:', records);
        }
    }
});
