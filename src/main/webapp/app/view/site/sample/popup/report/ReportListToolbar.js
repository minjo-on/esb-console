Ext.define('IndigoESBWebConsole.view.site.sample.popup.report.ReportListToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    requires:[
              'IndigoESBWebConsole.common.SearchField',
          ],
    alias: 'widget.ReportListToolbar',

    border : 0,

    initComponent: function () {
        var me = this;
        Ext.apply(this, {
        	items: [{
                text: '새로고침', itemId:'refresh',
                glyph: GlyphManager.getGlyph("REFRESH"),
                handler: me.onRefreshClick, // 새로고침 버튼 클릭 이벤트 핸들러
            },'-',{
		    	xtype: 'combo', name : 'search_type', fieldLabel: '검색',
				margin : '0 0 0 10', inputWidth: 95, labelWidth: 30, editable: false,
				store : new Ext.data.Store({
					model : 'IndigoESBWebConsole.model.common.IndigoESBWebConsoleDefaultModel',
					proxy: { type: 'memory' },
				    data : [
				    		 {"name":"전체", "value":""},
                             {"name":"제목", "value":"title"},
				    		 {"name":"부서", "value":"department"},
                             {"name":"작성자 ID", "value":"user_id"},
					         {"name":"연락처", "value":"contact_number"},
					         {"name":"이메일", "value":"receive_email"}
				    ]
				}),
				displayField: 'name', valueField: 'value', value : ""
			},{
    			xtype: 'indigoSearchField', name : 'search_input',
    			onTrigger2Click : me.onSearchClick,
    			margin : '0 5 0 0',  labelWidth: 40, width: 305, 
    		},
    		{
				xtype: 'button',
                text: '추가', itemId:'addReport',
                glyph: GlyphManager.getGlyph("REFRESH"),
//                handler: me.onAddReportClick
            }
    		]
        });
        this.callParent(arguments);
    },
    
    // 새로고침 버튼 클릭 이벤트 핸들러
    onRefreshClick: function () {
        // 새로고침 동작을 수행하는 로직을 여기에 작성하세요
        var me = this;
    	var store = me.up('ReportListWindow').down('ReportListGrid').getStore(); // ReportListGrid의 store 가져오기

        if (store) {
            store.reload(); // store 새로고침
        }
    },
    
    onSearchClick: function () {
        // 새로고침 동작을 수행하는 로직을 여기에 작성하세요
        var me = this;
    	var store = me.up('ReportListWindow').down('ReportListGrid').getStore(); // ReportListGrid의 store 가져오기
		
		var searchVal = me.value;
		var searchType = me.up('ReportListToolbar').down('combo[name=search_type]').getValue();

        var param = {
            'search_type' : searchType,
            'search_val' : searchVal
        };

        store.currentPage = 1; // 첫 번째 페이지로 초기화 
        store.proxy.extraParams = param;
        store.load({
			params: param
		});
	},
//	onAddReportClick: function() {
//        console.log('Add Report button clicked!');
//        console.log(this);
//        var win = Ext.create('IndigoESBWebConsole.view.site.sample.popup.report.ReportWindow');
//        win.show();
//    }
});