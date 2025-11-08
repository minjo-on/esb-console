Ext.define('IndigoESBWebConsole.model.FileTransferManagerModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'interfaceId', type: 'string' },
        { name: 'tableName', type: 'string' },
        { name: 'delimiter', type: 'string' },
        { name: 'columns', type: 'string' },
        { name: 'encoding', type: 'string' },
        { name: 'hasHeader', type: 'string' },
        { name: 'fileExtension', type: 'string' },
        { name: 'createdAt', type: 'string' },
        { name: 'updatedAt', type: 'string' }
    ]
});
