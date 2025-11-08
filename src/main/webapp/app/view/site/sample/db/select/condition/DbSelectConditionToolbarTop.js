Ext.define('IndigoESBWebConsole.view.site.sample.db.select.condition.DbSelectConditionToolbarTop', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.DbSelectConditionToolbarTop',

    border: 0, padding: '3 0 0 2',

    items: [
        {
            xtype: 'button',
            text: '컬럼 새로고침',
            itemId: 'refreshButton',
            glyph: 'xf021@FontAwesome'
        },
        '-',
        {
            xtype: 'button',
            text: '컬럼 추가',
            itemId: 'addButton',
            glyph: 'xf067@FontAwesome'
        },
        {
            xtype: 'button',
            text: '컬럼 수정',
            itemId: 'editButton',
            glyph: 'xf040@FontAwesome'
        },
        {
            xtype: 'button',
            text: '컬럼 삭제',
            itemId: 'deleteButton',
            glyph: 'xf1f8@FontAwesome'
        },
        '-',
        {
            xtype: 'indigoSearchField',
            fieldLabel: '검 색',
            labelWidth: 30,
            itemId: 'searchField',
            name: 'search_val',
            width: 400,
            margin: '0 0 0 4'
        }
    ]
});
