Ext.define('IndigoESBWebConsole.store.DbSelectInterfaceDTPStore', {
    extend: 'Ext.data.Store',

    alias: 'widget.DbSelectInterfaceDTPStore',

    model: 'IndigoESBWebConsole.model.DbSelectInterfaceModel',

    proxy: {
        type: 'ajax',
        url: 'DbSelectInterfaceController?cmd=DTPlist',
        reader: {
            type: 'json',
            rootProperty: '',
        },
        extractResponseData: function (response) {
            var data = Ext.decode(response.responseText);
            return data.data || [];
        }
    },

    autoLoad: true,
    // print log
    listeners: {
        load: function (store, records, successful, operation, eOpts) {
            console.log('DbSelectInterfaceDTPStore loaded:', records);
        }
    }
});