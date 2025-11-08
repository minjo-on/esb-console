Ext.define('IndigoESBWebConsole.view.site.sample.SiteCustomMessageLogToolbarBottom', {
    extend: 'Ext.toolbar.Toolbar',
    requires : [
                'Ext.ux.DateTimeField',
                'IndigoESBWebConsole.common.SearchField'
    ],
    
    alias: 'widget.SiteCustomMessageLogToolbarBottom',

    getSelectedLogLevel: function() {
        var debugBtn = Ext.ComponentQuery.query('button[itemId=logLevelDebugBtn]')[0];
        var infoBtn = Ext.ComponentQuery.query('button[itemId=logLevelInfoBtn]')[0];
        var warnBtn = Ext.ComponentQuery.query('button[itemId=logLevelWarnBtn]')[0];

        if (debugBtn && debugBtn.pressed) {
            return 'DEBUG';
        }
        if (infoBtn && infoBtn.pressed) {
            return 'INFO';
        }
        if (warnBtn && warnBtn.pressed) {
            return 'WARN';
        }
        return 'INFO'; // 기본값
    },


    border : 0, 
	items: [
		{
			xtype: 'button',
			text: '새로고침',
			itemId: 'refreshAllBtn',
			iconCls: 'x-fa fa-refresh',
			style: 'font-weight:bold;',
			handler: function() {
				// 1. 목록 전체 새로고침
				var agentStore = Ext.getStore('AgentStore');
				var adapterStore = Ext.getStore('AdapterStore');
				var esbStore = Ext.getStore('EsbStore');
				var agentView = Ext.ComponentQuery.query('dataview[name=agent]')[0];
				var adapterView = Ext.ComponentQuery.query('dataview[name=adapter]')[0];
				var esbView = Ext.ComponentQuery.query('dataview[name=esb]')[0];
				var logLevel = Ext.ComponentQuery.query('SiteCustomMessageLogToolbarBottom')[0].getSelectedLogLevel();
				var params = {};
				if (logLevel) {
					params = { level: logLevel };
				}

				// 선택된 레코드의 id 기억
				var selectedAgentId = (agentView && agentView.getSelectionModel().hasSelection()) ? agentView.getSelectionModel().getSelection()[0].get('pd_id') : null;
				var selectedAdapterId = (adapterView && adapterView.getSelectionModel().hasSelection()) ? adapterView.getSelectionModel().getSelection()[0].get('pd_id') : null;
				var selectedEsbName = (esbView && esbView.getSelectionModel().hasSelection()) ? esbView.getSelectionModel().getSelection()[0].get('name') : null;

				// reload + reload 후 기존 선택 복원 + 로그 갱신
				function restoreAndReloadLog(view, store, idField, selectedId, urlBuilder) {
					if (!store) return;
					store.reload({
						callback: function() {
							if (selectedId) {
								var rec = store.findRecord(idField, selectedId);
								if (rec && view) {
									view.getSelectionModel().select(rec);
									// 로그 갱신
									var url = urlBuilder(rec);
									if (url) {
										Ext.Ajax.request({
											url: url,
											params: params,
											success: function (response) {
												var json = Ext.decode(response.responseText);
												var contentList = (json.logVo && json.logVo.contentList) ? json.logVo.contentList : [];
												var grid = Ext.ComponentQuery.query('SiteCustomMessageLogGrid')[0];
												if (grid) {
													grid.getStore().loadData(contentList);
												}
											}
										});
									}
								}
							}
						}
					});
				}

				restoreAndReloadLog(agentView, agentStore, 'pd_id', selectedAgentId, function(rec) {
					return 'agentLogController?cmd=im-log&pd_id=' + rec.get('pd_id');
				});
				restoreAndReloadLog(adapterView, adapterStore, 'pd_id', selectedAdapterId, function(rec) {
					return 'adaptorLogController?cmd=agentinstance-log&in_id=' + rec.get('pd_id');
				});
				restoreAndReloadLog(esbView, esbStore, 'name', selectedEsbName, function(rec) {
					return 'esbLogController?cmd=esb-log-list';
				});
			}
		},
        { xtype: 'tbspacer', width: 20 },
        { xtype: 'label', text: '로그 레벨:', style: 'font-weight:bold;margin-right:5px;' },
        {
            xtype: 'button',
            text: 'DEBUG',
            itemId: 'logLevelDebugBtn',
            enableToggle: true,
            allowDepress: false,
            pressed: false,
            toggleGroup: 'logLevelGroup'
        },
        {
            xtype: 'button',
            text: 'INFO',
            itemId: 'logLevelInfoBtn',
            enableToggle: true,
            allowDepress: false,
            pressed: true,
            toggleGroup: 'logLevelGroup'
        },
        {
            xtype: 'button',
            text: 'WARN',
            itemId: 'logLevelWarnBtn',
            enableToggle: true,
            allowDepress: false,
            pressed: false,
            toggleGroup: 'logLevelGroup'
        }
	]
});
