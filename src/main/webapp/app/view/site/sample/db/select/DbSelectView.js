Ext.define('IndigoESBWebConsole.view.site.sample.db.select.condition.DbSelectConditionView', {
    extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleTitlePanel',
    alias: 'widget.DbSelectConditionView',

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'panel',
                cls: 'titlePanelTab',
                layout: 'border',
                border: false,
                itemId: 'mainPanel',
                items: [{
                    region: 'west',
                    xtype: 'DbSelectInterfaceGrid',
                    itemId: 'dbSelectInterfaceGrid',
                    split: true,
                    collapsible: true,
                    columnLines: true,
                    rowLines: true,
                    border: true,
                    listeners: {
                        select: me.onInterfaceSelect,
                        scope: me
                    },
                    dockedItems: [{
                        xtype: 'DbSelectInterfaceToolbarTop'
                    }]
                },{
                    region: 'center',
                    xtype: 'DbSelectConditionGrid',
                    itemId: 'dbSelectConditionGrid',
                    columnLines: true,
                    rowLines: true,
                    border: true,
                    dockedItems: [{
                        xtype: 'DbSelectConditionToolbarTop'
                    }]
                }]
            }]
        });
        this.callParent(arguments);
    },

    onInterfaceSelect: function(selModel, record) {
        if (!record || !record.get) return;

        var interfaceId = record.get('interfaceId');
        console.log('interfaceId')
        var conditionGrid = this.down('#dbSelectConditionGrid');
        var store = conditionGrid.getStore();

        store.getProxy().extraParams = { interfaceId: interfaceId };
        store.load();
    }
});

