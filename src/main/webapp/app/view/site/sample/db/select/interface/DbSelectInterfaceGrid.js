Ext.define('IndigoESBWebConsole.view.site.sample.db.select.interface.DbSelectInterfaceGrid', {
    extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleGrid',

    alias: 'widget.DbSelectInterfaceGrid',
    cls: 'custom-header-grid',
    store: 'IndigoESBWebConsole.store.DbSelectInterfaceStore',
    flex: 2,
    autoScroll: false,


    viewConfig: {
        enableTextSelection: false,
        loadMask: false
    },

    initComponent: function () {
        var me = this;

        this.columns = [
            { text: '인터페이스 이름', xtype: 'indigoLeftColumn', dataIndex: 'interfaceName', flex: 1 },
            { text: '테이블 이름', xtype: 'indigoLeftColumn', dataIndex: 'tableName', flex: 1}
        ];

        this.callParent(arguments);

        me.on('afterrender', function() {
            var store = me.getStore();
            if (!store.isLoading() && store.getCount() === 0) {
                store.load({
                    callback: function(records) {
                        if (records.length > 0) {
                            me.getSelectionModel().select(0);
                            me.fireEvent('select', me.getSelectionModel(), [records[0]]);
                        }
                    }
                });
            }
        });

        Ext.each(this.columns, function (column) {
            var originalRenderer = column.renderer;
            column.renderer = function (value, metaData, record, rowIndex, colIndex, store, view) {
                var renderedValue = value;
                if (originalRenderer) {
                    renderedValue = originalRenderer.apply(this, arguments);
                }

                metaData.tdAttr = 'style="vertical-align: middle;"';

                return '<div style="padding: 2px 5px 2px 5px; font: normal 11px / 20px tahoma, arial, verdana, sans-serif;">' + renderedValue + '</div>';
            };
        });
    }
});
