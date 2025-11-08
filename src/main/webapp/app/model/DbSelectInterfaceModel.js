Ext.define('IndigoESBWebConsole.model.DbSelectInterfaceModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'interfaceId', type: 'string' },
        { name: 'interfaceName', type: 'string' },
        { name: 'tableName', type: 'string'}
    ]
});