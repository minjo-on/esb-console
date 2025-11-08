Ext.define('IndigoESBWebConsole.store.DbSelectConditionStore', {
    extend: 'Ext.data.Store',

    alias: 'widget.DbSelectConditionStore',

    model: 'IndigoESBWebConsole.model.DbSelectConditionModel',

    proxy: {
        type: 'ajax',
        url: 'DbSelectConditionController?cmd=list',
        reader: {
            type: 'json',
            rootProperty: '',
        },
        extraParams: {
            interfaceId: ''
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
            console.log('DbSelectConditionStore loaded:', records);
        }
    }
});