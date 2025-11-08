Ext.define('IndigoESBWebConsole.view.site.sample.db.select.condition.DbSelectConditionGrid', {
    extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleGrid',
    alias: 'widget.DbSelectConditionGrid',
    cls: 'custom-header-grid',

    store: 'IndigoESBWebConsole.store.DbSelectConditionStore',
    autoScroll: true,
    flex: 3,
    usePaging: false,
    useAutoNumber: false,
    useLoadStore: false,
    viewConfig: {
        enableTextSelection: true,
        loadMask: true
    },

    initComponent: function () {
        var me = this;

        this.columns = [
            { text: '컬럼명', dataIndex: 'columnName', flex: 1 },
            { text: '연산자', dataIndex: 'operator', flex: 1 },
            { text: '값', dataIndex: 'value', flex: 1 },
            { text: '조회 후 수정 값', dataIndex: 'updateValue', flex: 1},
            { text: '사용여부', dataIndex: 'used', flex: 0.5, renderer: function(v){ return v ? '사용' : '미사용'; } }
        ];

        this.callParent(arguments);

        Ext.each(this.columns, function (column) {
            var originalRenderer = column.renderer;
            column.renderer = function (value, metaData, record, rowIndex, colIndex, store, view) {
                var renderedValue = value;
                if (originalRenderer) {
                    // 기존 렌더러가 있으면 호출
                    renderedValue = originalRenderer.apply(this, arguments);
                }

                metaData.tdAttr = 'style="vertical-align: middle;"';

                return '<div style="padding: 2px 5px 2px 5px; font: normal 11px / 20px tahoma, arial, verdana, sans-serif;">' + renderedValue + '</div>';
            };
        });
    }
});
