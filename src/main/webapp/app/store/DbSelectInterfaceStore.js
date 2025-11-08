Ext.define('IndigoESBWebConsole.store.DbSelectInterfaceStore', {
    extend: 'Ext.data.Store',

    alias: 'widget.DbSelectInterfaceStore',

    model: 'IndigoESBWebConsole.model.DbSelectInterfaceModel',

    proxy: {
        type: 'ajax',
        url: 'DbSelectInterfaceController?cmd=list',
        reader: {
            type: 'json',
            rootProperty: '',
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
            console.log('DbSelectInterfaceStore loaded:', records);
        }
    }
});