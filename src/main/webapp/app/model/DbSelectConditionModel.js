Ext.define('IndigoESBWebConsole.model.DbSelectConditionModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'interfaceId', type: 'string' },
        { name: 'columnName', type: 'string' },
        { name: 'operator', type: 'string' },
        { name: 'value', type: 'string' },
        { name: 'updateValue', type: 'String'},
        { name: 'used', type: 'int' }
    ]
});