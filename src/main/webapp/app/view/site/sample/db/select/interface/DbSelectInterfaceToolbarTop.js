Ext.define('IndigoESBWebConsole.view.site.sample.db.select.interface.DbSelectInterfaceToolbarTop', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.DbSelectInterfaceToolbarTop',

    border: 0, padding: '3 0 0 2',

    items: [
        {
            xtype: 'button',
            text: '새로고침',
            itemId: 'refreshButton',
            glyph: 'xf021@FontAwesome'
        },
        '-',
        {
            xtype: 'button',
            text: '추가',
            itemId: 'addButton',
            glyph: 'xf067@FontAwesome'
        },
        {
            xtype: 'button',
            text: '수정',
            itemId: 'editButton',
            glyph: 'xf040@FontAwesome'
        },
        {
            xtype: 'button',
            text: '삭제',
            itemId: 'deleteButton',
            glyph: 'xf1f8@FontAwesome'
        }
    ]
});
