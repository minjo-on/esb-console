Ext.define('IndigoESBWebConsole.store.SiteCustomMessageLogStore', {
    extend : 'IndigoESBWebConsole.store.util.TimeoutStore',    

    alias : 'widget.SiteCustomMessageLogStore',
    
    extend: 'Ext.data.Store',
    model: 'IndigoESBWebConsole.model.SiteCustomMessageLogModel',
    // pageSize: 100,
    proxy: {
        type: 'ajax',
        url: '', // 동적으로 변경
        reader: {
            type: 'json',
            rootProperty: 'logVo.contentList'
            // totalProperty: 'total'
        }
    },
    autoLoad: false,
            listeners: {
        load: function(store, records, successful, operation, eOpts) {
            console.log('log loaded:', records, store, operation, successful);
        }
    }
});