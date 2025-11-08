Ext.define('IndigoESBWebConsole.model.SiteCustomMessageLogModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'level', type: 'string' },
        { name: 'time', type: 'string' },
        { name: 'content', type: 'string' }
    ]
});