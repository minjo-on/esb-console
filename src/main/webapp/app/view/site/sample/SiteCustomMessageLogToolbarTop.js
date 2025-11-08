Ext.define('IndigoESBWebConsole.view.site.sample.SiteCustomMessageLogToolbarTop', {
    extend: 'Ext.toolbar.Toolbar',
    requires : [
                'Ext.ux.DateTimeField',
                'IndigoESBWebConsole.common.SearchField',
                'IndigoESBWebConsole.common.SwitchButtonSegment'
    ],
    
    alias: 'widget.SiteCustomMessageLogToolbarTop',
    
  border : 10, padding: '20 10 0 30',
  layout: { type: 'hbox', align: 'stretch' },
  items: [
    // 에이전트 영역
    {
      xtype: 'container',
      layout: { type: 'vbox', align: 'stretch' },
      minWidth: 180,
      style: 'margin-right:16px;',
      items: [
        { xtype: 'label', text: '에이전트', style: 'font-size:13px;font-weight:bold;margin-bottom:6px;' },
        {
          xtype: 'dataview',
          name: 'agent',
          cls: 'site-toolbar-dataview',
          style: 'margin-bottom:8px;background:#fff;',
          store: 'AgentStore',
          itemTpl: '<span style="display:inline-flex;align-items:center;gap:6px;">' +
                     '<tpl if="pd_status == 1">' +
                       '<span style="color:#2ecc40;font-size:15px;">●</span>' +
                     '<tpl else>' +
                       '<span style="color:#c91616;font-size:15px;">●</span>' +
                     '</tpl>' +
                     '<span style="font-size:12px;">{pd_name}</span>' +
                   '</span>',
          singleSelect: true,
          autoScroll: true,
          height: 180,
          selectionModel: { mode: 'SINGLE' },
        }
      ]
    },
    // 어댑터 영역
    {
      xtype: 'container',
      layout: { type: 'vbox', align: 'stretch' },
      minWidth: 180,
      style: 'margin-right:16px;',
      items: [
        { xtype: 'label', text: '어댑터', style: 'font-size:13px;font-weight:bold;margin-bottom:6px;' },
        {
          xtype: 'dataview',
          name: 'adapter',
          cls: 'site-toolbar-dataview',
          style: 'margin-bottom:8px;background:#fff;',
          store: 'AdapterStore',
          itemTpl: '<span style="display:inline-flex;align-items:center;gap:6px;">' +
                     '<tpl if="pd_status == 1">' +
                       '<span style="color:#2ecc40;font-size:15px;">●</span>' +
                     '<tpl else>' +
                       '<span style="color:#c91616;font-size:15px;">●</span>' +
                     '</tpl>' +
                     '<span style="font-size:12px;">{pd_name}</span>' +
                   '</span>',
          singleSelect: true,
          autoScroll: true,
          height: 180,
          selectionModel: { mode: 'SINGLE' },
        }
      ]
    },
    // ESB 영역
    {
      xtype: 'container',
      layout: { type: 'vbox', align: 'stretch' },
      minWidth: 180,
      // style: 'margin-right:10px;',
      items: [
        { xtype: 'label', text: 'ESB', style: 'font-size:13px;font-weight:bold;margin-bottom:6px;' },
        {
          xtype: 'dataview',
          name: 'esb',
          cls: 'site-toolbar-dataview',
          style: 'background:#fff;',
          store: 'EsbStore',
          itemTpl: '<span style="display:inline-flex;align-items:center;gap:6px;">' +
             '<span style="color:#2ecc40;font-size:15px;">●</span>' +
             '<span style="font-size:12px;">{name}</span>' +
           '</span>',
          singleSelect: true,
          autoScroll: true,
          height: 180,
          selectionModel: { mode: 'SINGLE' },
        }
      ]
    },
    // 분석 버튼 영역 (vertical, 중앙정렬)
    {
      xtype: 'container',
      layout: { type: 'vbox', align: 'center', pack: 'center' },
      minWidth: 120,
      style: 'margin-right:30px;display:flex;justify-content:center;align-items:center;',
      flex: 0,
      items: [
        { xtype: 'button', text: '1분 단위 분석', itemId: 'analyze1Btn', width: 120, height: 38, margin: '0 0 10 0', ui: 'default', style: 'font-size:15px;font-weight:bold;' },
        { xtype: 'button', text: '5분 단위 분석', itemId: 'analyze5Btn', width: 120, height: 38, margin: '0 0 10 0', ui: 'default', style: 'font-size:15px;font-weight:bold;' },
        { xtype: 'button', text: '10분 단위 분석', itemId: 'analyze10Btn', width: 120, height: 38, ui: 'default', style: 'font-size:15px;font-weight:bold;' }
      ]
    },
    // 분석 결과 영역
    {
      xtype: 'container',
      layout: { type: 'vbox', align: 'stretch' },
      flex: 1,
      style: 'margin-right:20px;',
      minWidth: 320,
      minHeight: 220,
      items: [
        { xtype: 'label', text: '분석 결과', style: 'font-size:13px;font-weight:bold;margin-bottom:6px;' },
        {
          xtype: 'panel',
          itemId: 'analysisResultPanel',
          html: '',
          minHeight: 180,
          maxHeight: 180,
          flex: 1,
          width: '100%',
          minWidth: 280,
          // maxWidth: 1750,
          autoScroll: true, // Remove autoScroll to prevent double scrollbars
          style: 'background:#f8f8fa;border-radius:6px;border:1px solid #ffffffff;padding:16px 20px 16px 20px;overflow-y:auto;box-sizing:border-box;'
        }
      ]
    }
  ]
       
  
});
