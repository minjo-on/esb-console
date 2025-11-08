Ext.define('IndigoESBWebConsole.view.site.sample.SiteCustomMessageLogGrid', {
    extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleGrid', 
          
    alias : 'widget.SiteCustomMessageLogGrid',

    store : 'IndigoESBWebConsole.store.SiteCustomMessageLogStore',
    useLoadStore : false,

    initComponent : function(){
    	var me = this;
		this.columns = [
			{ text: '레벨', dataIndex: 'level', width: 80 },
			{ text: '시간', dataIndex: 'time', width: 120 },
			{ text: '내용', dataIndex: 'content', flex: 1 }
		];
        this.callParent(arguments);
    }
    
});
