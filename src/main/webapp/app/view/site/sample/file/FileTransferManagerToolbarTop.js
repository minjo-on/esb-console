Ext.define('IndigoESBWebConsole.view.site.sample.file.FileTransferManagerToolbarTop', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.FileTransferManagerToolbarTop',

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
        // {
        //     xtype: 'combobox',
        //     name: 'interfaceId',
        //     fieldLabel: '인터페이스 ID',
        //     store: 'code.MCI_CODE_Store',
        //     displayField: 'name',
        //     valueField: 'value',
        //     queryMode: 'local',
        //     forceSelection: true,
        //     emptyText: '전체',
        //     width: 350,
        //     labelWidth: 80
        // },
        // {
        //     xtype: 'button',
        //     text: '검색',
        //     itemId: 'searchButton',
        //     glyph: 'xf002@FontAwesome'
        // }
    ]
});
