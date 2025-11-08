-   Ext.define("IndigoESBWebConsole.controller.site.SiteCustomController", {
    extend: "Ext.app.Controller",

    views: [
        "site.sample.SiteCustomMessageLogView",
        "site.sample.SiteCustomMessageLogToolbarTop",
        "site.sample.SiteCustomMessageLogToolbarBottom",
        "site.sample.SiteCustomMessageLogGrid"
    ],
    stores: [
        "SiteCustomMessageLogStore",
        'AgentStore',
        'AdapterStore',
        'EsbStore'
    ],
    models: [
        "SiteCustomMessageLogModel"
    ],
    refs: [{
        ref: 'agentCombo',
        selector: 'SiteCustomMessageLogToolbarTop #agentCombo'
    }, {
        ref: 'adapterCombo',
        selector: 'SiteCustomMessageLogToolbarTop #adapterCombo'
    }, {
        ref: 'esbCombo',
        selector: 'SiteCustomMessageLogToolbarTop #esbCombo'
    }],

    disableAllButtons: function() {
        var btn1 = Ext.ComponentQuery.query('button[itemId=analyze1Btn]')[0];
        var btn5 = Ext.ComponentQuery.query('button[itemId=analyze5Btn]')[0];
        var btn10 = Ext.ComponentQuery.query('button[itemId=analyze10Btn]')[0];
        var refreshBtn = Ext.ComponentQuery.query('button[itemId=refreshAllBtn]')[0];
        var debugBtn = Ext.ComponentQuery.query('button[itemId=logLevelDebugBtn]')[0];
        var infoBtn = Ext.ComponentQuery.query('button[itemId=logLevelInfoBtn]')[0];
        var warnBtn = Ext.ComponentQuery.query('button[itemId=logLevelWarnBtn]')[0];
        if (btn1) { btn1.setDisabled(true); }
        if (btn5) { btn5.setDisabled(true); }
        if (btn10) { btn10.setDisabled(true); }
        if (refreshBtn) { refreshBtn.setDisabled(true); }
        if (debugBtn) { debugBtn.setDisabled(true); }
        if (infoBtn) { infoBtn.setDisabled(true); }
        if (warnBtn) { warnBtn.setDisabled(true); }
    },

    enableAllButtons: function() {
        var btn1 = Ext.ComponentQuery.query('button[itemId=analyze1Btn]')[0];
        var btn5 = Ext.ComponentQuery.query('button[itemId=analyze5Btn]')[0];
        var btn10 = Ext.ComponentQuery.query('button[itemId=analyze10Btn]')[0];
        var refreshBtn = Ext.ComponentQuery.query('button[itemId=refreshAllBtn]')[0];
        var debugBtn = Ext.ComponentQuery.query('button[itemId=logLevelDebugBtn]')[0];
        var infoBtn = Ext.ComponentQuery.query('button[itemId=logLevelInfoBtn]')[0];
        var warnBtn = Ext.ComponentQuery.query('button[itemId=logLevelWarnBtn]')[0];
        if (btn1) { btn1.setDisabled(false); }
        if (btn5) { btn5.setDisabled(false); }
        if (btn10) { btn10.setDisabled(false); }
        if (refreshBtn) { refreshBtn.setDisabled(false); }
        if (debugBtn) { debugBtn.setDisabled(false); }
        if (infoBtn) { infoBtn.setDisabled(false); }
        if (warnBtn) { warnBtn.setDisabled(false); }
    },
    

    fetchAllLogsAndAnalyze: function(minutes, url) {
        var me = this;
        if (!url) {
            Ext.Msg.alert('오류', '로그 조회 URL이 지정되지 않았습니다.');
            return;
        }

        // var btn1 = Ext.ComponentQuery.query('button[itemId=analyze1Btn]')[0];
        // var btn5 = Ext.ComponentQuery.query('button[itemId=analyze5Btn]')[0];
        // var btn10 = Ext.ComponentQuery.query('button[itemId=analyze10Btn]')[0];
        // var refreshBtn = Ext.ComponentQuery.query('button[itemId=refreshAllBtn]')[0];
        // if (refreshBtn) refreshBtn.setDisabled(true);
        // if (btn1) btn1.setDisabled(true);
        // if (btn5) btn5.setDisabled(true);
        // if (btn10) btn10.setDisabled(true);
        me.disableAllButtons();
        var panel = Ext.ComponentQuery.query('#analysisResultPanel')[0];
        if (panel) {
            panel.update('<span style="display:block;color:#888;font-size:15px;padding:48px 0 32px 0;text-align:center;width:100%;font-weight:bold;">로그 조회 중...<br><span class="x-fa fa-spinner fa-spin" style="font-size:22px;margin-top:8px;"></span></span>');
        }

        var pageParamName = url.includes('esbLogController') ? 'page' : 'page_no';
        var allLogs = [];
        var now = new Date();
        var intervalStart = new Date(now.getTime() - minutes * 60 * 1000);

        function fetchPage(pageNumber) {
            var params = { pageRow: 100 };
            params[pageParamName] = pageNumber;
            
            var logLevel = me.getSelectedLogLevel();
            if (logLevel) {
                params['level'] = logLevel;
            }

            Ext.Ajax.request({
                url: url,
                params: params,
                success: function (response) {
                    var json;
                    try {
                        json = Ext.decode(response.responseText);
                    } catch (e) {
                        Ext.Msg.alert('오류', '서버 응답을 처리할 수 없습니다.');
                        me.enableAllButtons();
                        return;
                    }

                    var contentList = (json.logVo && json.logVo.contentList) ? json.logVo.contentList : [];
                    console.log('Fetched page ' + pageNumber + ', records: ' + contentList.length);
                    if (contentList.length === 0) {
                        me.analyzeLogsByIntervalWithArray(minutes, allLogs);
                        return;
                    }

                    allLogs = allLogs.concat(contentList);
                    
                    var shouldContinue = true;
                    for (var i = 0; i < contentList.length; i++) {
                        var record = contentList[i];
                        if (record && record.time) {
                            var parts = record.time.match(/(\d{2}).(\d{2}).(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
                            if (parts) {
                                var logTime = new Date('20' + parts[1], parts[2] - 1, parts[3], parts[4], parts[5], parts[6]);
                                if (logTime < intervalStart) {
                                    shouldContinue = false;
                                    break;
                                }
                            }
                        }
                    }

                    var totalCount = parseInt(json.total_count, 10);
                    var pageSize = parseInt(json.no_item, 10);
                    var totalPages = (!isNaN(totalCount) && !isNaN(pageSize) && pageSize > 0) ? Math.ceil(totalCount / pageSize) : 0;

                    if (totalPages > 0 && pageNumber >= totalPages) {
                        shouldContinue = false;
                    }

                    if (shouldContinue) {
                        fetchPage(pageNumber + 1);
                    } else {
                        console.log('first log time: ' + (allLogs.length > 0 ? allLogs[0].time : 'N/A') + ', last log time: ' + (allLogs.length > 0 ? allLogs[allLogs.length - 1].time : 'N/A'));
                        me.analyzeLogsByIntervalWithArray(minutes, allLogs);
                    }
                },
                failure: function() {
                    Ext.Msg.alert('오류', '로그 데이터를 가져오는 데 실패했습니다.');
                    me.enableAllButtons();
                }
            });
        }

        fetchPage(1);
    },

    analyzeLogsByIntervalWithArray: function(minutes, logsArr) {
        var me = this;
        var panel = Ext.ComponentQuery.query('#analysisResultPanel')[0];
        if (panel) {
            panel.update('<span style="display:block;color:#888;font-size:15px;padding:48px 0 32px 0;text-align:center;width:100%;font-weight:bold;">AI 분석 요청 중...<br><span class="x-fa fa-spinner fa-spin" style="font-size:22px;margin-top:8px;"></span></span>');
        }
        var now = new Date();
        var intervalStart = new Date(now.getTime() - minutes * 60 * 1000);

        var filteredLogs = [];
        logsArr.forEach(function (record) {
            if (!record.time) return;
            var parts = record.time.match(/(\d{2}).(\d{2}).(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
            if (parts) {
                var timeDate = new Date('20' + parts[1], parts[2] - 1, parts[3], parts[4], parts[5], parts[6]);
                if (timeDate >= intervalStart && timeDate <= now) {
                    var cleanedContent = (record.content || '').replace(/&nbsp;/g, ' ');
                    filteredLogs.push({
                        time: record.time,
                        level: record.level,
                        content: cleanedContent
                    });
                }
            }
        });

        var compressedLogsJson = [];
        var naturalizedLogs = [];
        if (filteredLogs.length > 0) {
            const logGroups = new Map();
            const getComparableContent = function(content) {
                if (!content) return '';
                var parts = content.split('] - ');
                if (parts.length > 1) {
                    return parts.slice(1).join('] - ').trim();
                }
                return content.trim();
            };

            filteredLogs.forEach(function(log) {
                const comparableContent = getComparableContent(log.content);
                if (!logGroups.has(comparableContent)) {
                    logGroups.set(comparableContent, {
                        firstLog: log,
                        count: 0,
                        timestamps: []
                    });
                }
                const group = logGroups.get(comparableContent);
                group.count++;
                if (!group.timestamps.includes(log.time)) {
                    group.timestamps.push(log.time);
                }
            });

            logGroups.forEach(function(group) {
                group.timestamps.sort(); 
                compressedLogsJson.push({
                    level: group.firstLog.level || '-',
                    firstTimestamp: group.firstLog.time || '-',
                    message: group.firstLog.content || '',
                    count: group.count,
                    timestamps: group.timestamps
                });
            });
                naturalizedLogs = compressedLogsJson.map(log => {
        const start = log.timestamps[0];
        const end = log.timestamps[log.timestamps.length - 1];
        return `- [${start}${start !== end ? ` ~ ${end}` : ''}] ${log.count === 1 ? '' : `총 ${log.count}회: `}${log.message} (${log.level.trim()})`;
    });
        }

        /**
         * JSON 배열 형식으로
         */
        // var text = JSON.stringify(compressedLogsJson, null, 2);

        /**
         * 자연어 처리된 로그 배열 형식으로
         */
        var text = naturalizedLogs.join('\n');

        console.log(text);

        var firstlog = logsArr.length > 0 ? logsArr[0].time : 'N/A';
        var lastlog = logsArr.length > 0 ? logsArr[logsArr.length - 1].time : 'N/A';
        
        const payload = {
            /**
             * default
             */
            // model: 'llama3:8b',
            
            /**
             * 가성비 좋은 모델
             */
            // model: 'llama3.1best',

            /**
             * 정확함, 비쌈
             */
            // model: 'mistral:7b-instruct-q5_K_M',

            /**
             * 빠름, 저렴함, 매우 부정확함
             */
            model: 'tinyllama:1.1b',
            
            prompt: this.promptTemplates(minutes, text, now, firstlog, lastlog),
            max_tokens: 1024,
            temperature: 0,
            top_p: 0.7,
            n: 1,
            stream: false,
            keep_alive: -1,
            system: '당신은 시스템 로그에서 사실 정보만을 추출하는 정밀한 분석 도구입니다. 추론, 추측, 창의적인 재구성은 절대 금지됩니다.' +
                    '오직 로그에 명시된 내용만으로 응답해야 합니다.' +
                    '결정적으로 반드시 한국어(Korean)로 응답하세요. 무조건 한국어로 응답하여야 합니다.'
        };

        fetch('http://localhost:3000/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(function(response) {
            if (!response.ok) {
                return response.text().then(function(text) {
                    throw new Error('서버 오류 ' + response.status + ': ' + (text || response.statusText));
                });
            }
            return response.text();
        })
        .then(function(responseText) {
            var summary;
            try {
                var data = JSON.parse(responseText);
                if (data && typeof data.response === 'string') {
                    summary = data.response;
                } else if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                    summary = data.choices[0].message.content;
                } else {
                    summary = data.summary || responseText;
                }
            } catch (e) {
                summary = responseText;
            }

            var panel = Ext.ComponentQuery.query('#analysisResultPanel')[0];
            if (panel) {
                var html = summary && summary.trim() ?
                    '<span style="font-size:14px;line-height:1.7;color:#222;font-family:inherit;padding:0 2px;margin:12px 8px;display:inline-block;">'
                    + Ext.String.htmlEncode(summary).replace(/\n/g, '<br>') + '</span>'
                    : '<span style="color:#888;padding:12px;display:block;margin:12px 8px;">AI 분석 결과가 없습니다.</span>';
                panel.update(html);
            } else {
                Ext.Msg.alert('알림', '분석 결과 패널이 존재하지 않습니다.');
            }
        })
        .catch(function(err) {
            console.error('에러:', err);
            Ext.Msg.alert('AI 분석 오류', err.message || err);
            var panel = Ext.ComponentQuery.query('#analysisResultPanel')[0];
            if (panel) { panel.update('<div style="color:#888;padding:12px;">AI 분석 중 오류가 발생했습니다.</div>'); }
        })
        .finally(function() {
            me.enableAllButtons();
        });
    },

    // enableAllButtons: function() {
    //     var btn1 = Ext.ComponentQuery.query('button[itemId=analyze1Btn]')[0];
    //     var btn5 = Ext.ComponentQuery.query('button[itemId=analyze5Btn]')[0];
    //     var btn10 = Ext.ComponentQuery.query('button[itemId=analyze10Btn]')[0];
    //     var refreshBtn = Ext.ComponentQuery.query('button[itemId=refreshAllBtn]')[0];
    //     if (btn1) { btn1.setDisabled(false); }
    //     if (btn5) { btn5.setDisabled(false); }
    //     if (btn10) { btn10.setDisabled(false); }
    //     if (refreshBtn) { refreshBtn.setDisabled(false); }
    // },

    promptTemplates: function(min, text, now, firstlog, lastlog) {
        var analysisTime = now ? now.toLocaleString() : new Date().toLocaleString();
        return (
            '[엄격한 규칙]\n' +
            '1. **시간 엄수**: 아래 제공되는 `[분석 기준 시간]`과 로그에 명시된 시간 외에 다른 날짜나 시간(예: 2022년, 어제 등)을 절대 생성하거나 언급하지 마시오.\n' +
            '2. **사실 기반**: 제공된 `[시스템 로그]` 내용에 없는 정보는 절대 언급하지 마시오. 모든 분석 내용은 로그에서 직접 인용하거나 명백히 확인할 수 있어야 합니다.\n' +
            '3. **추론 금지**: 로그 내용에 대한 원인 추측, 가정, 또는 암시는 절대 금지됩니다. 오직 발생한 사실만 명시하시오.\n' +
            '4. **형식 준수**: 각 항목에 대해 로그에서 해당 내용을 찾을 수 없는 경우, 반드시 "없음"이라고 명시적으로 표기하시오. 임의로 내용을 생성하지 마시오.\n\n' +
            '---\n\n' +
            '[분석 정보]\n' +
            ' - **분석 기준 시간**: ' + analysisTime + '\n' +
            ' - **분석 대상 기간**: ' + firstlog + '부터 ' + lastlog + '까지 (' + min + '분간)\n\n' +
            '[시스템 로그]\n' +
            text + '\n\n' +
            '---\n\n' +
            '[분석 결과 보고서]\n' +
            '아래 형식에 따라, 위의 `[엄격한 규칙]`을 반드시 준수하여 `[시스템 로그]`의 내용을 한국어로 정리하시오.\n\n' +
            '1. **주요 이벤트** (로그인, 시스템 시작/종료 등):\n' +
            '   - (로그에 내용이 없으면 "없음"으로 표기)\n\n' +
            '2. **경고 (Warnings)**:\n' +
            '   - (로그에 내용이 없으면 "없음"으로 표기)\n\n' +
            '3. **오류 (Errors)**:\n' +
            '   - (로그에 내용이 없으면 "없음"으로 표기)\n\n' +
            '만약 오류가 존재한다면, 각각의 오류에 대해 다음 형식을 준수하시오:\n' +
            '   - 오류 메시지: (오류 메시지 내용)\n' +
            '   - 발생 시간: (오류가 처음 발생한 시간)\n' +
            '   - 빈도: (오류가 발생한 횟수)\n\n' +
            '   - 해결방안: (판단이 된다면 간단히 기술, 불가능하면 "없음"으로 표기)\n\n' +
            '4. **기타 정보** (상태 변경, 일반 정보 등):\n' +
            '   - (로그에 내용이 없으면 "없음"으로 표기)\n' +
            firstlog + '부터 ' + lastlog + '까지의 시스템 로그를 분석한 결과입니다.'
        );
    },

    init: function(app) {
        var me = this;
        this.control({
            'SiteCustomMessageLogToolbarTop button[itemId=analyze1Btn]': {
                click: function () {
                    var url = me.getSelectedLogUrl();
                    me.fetchAllLogsAndAnalyze(1, url);
                }
            },
            'SiteCustomMessageLogToolbarTop button[itemId=analyze5Btn]': {
                click: function () {
                    var url = me.getSelectedLogUrl();
                    me.fetchAllLogsAndAnalyze(5, url);
                }
            },
            'SiteCustomMessageLogToolbarTop button[itemId=analyze10Btn]': {
                click: function () {
                    var url = me.getSelectedLogUrl();
                    me.fetchAllLogsAndAnalyze(10, url);
                }
            },
            'SiteCustomMessageLogToolbarTop dataview': {
                itemclick: function (view, record) {
                    var topContainer = view.up('SiteCustomMessageLogToolbarTop');
                    if (topContainer) {
                        topContainer.query('dataview').forEach(function (item) {
                            if (item !== view) {
                                item.getSelectionModel().deselectAll();
                            }
                        });
                    }
                    me.reloadCurrentLogView();
                }
            },
            'SiteCustomMessageLogToolbarBottom button[toggleGroup=logLevelGroup]': {
                toggle: function(btn, pressed) {
                    if (pressed) {
                        me.reloadCurrentLogView();
                    }
                }
            },
            // 'SiteCustomMessageLogToolbarBottom button[itemId=refreshAllBtn]': {
            //     click: function() {
            //         me.reloadCurrentLogView(true);
            //     }
            // }
        });
    },

    reloadCurrentLogView: function() {
        var me = this;
        var agentView = Ext.ComponentQuery.query('dataview[name=agent]')[0];
        var adapterView = Ext.ComponentQuery.query('dataview[name=adapter]')[0];
        var esbView = Ext.ComponentQuery.query('dataview[name=esb]')[0];

        var url = me.getSelectedLogUrl();

        // if (isRefresh) {
        //     if(agentView) agentView.getStore().reload();
        //     if(adapterView) adapterView.getStore().reload();
        //     if(esbView) esbView.getStore().reload();
        // }
        
        if (!url) {
            return;
        }

        var pageParamName = url.includes('esbLogController') ? 'page' : 'page_no';
        var params = {};
        params[pageParamName] = 1;
        
        var logLevel = me.getSelectedLogLevel();
        if (logLevel) {
            params['level'] = logLevel;
        }

        Ext.Ajax.request({
            url: url,
            method: 'GET',
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
    },

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

    getSelectedLogUrl: function() {
        var top = Ext.ComponentQuery.query('SiteCustomMessageLogToolbarTop')[0];
        if (!top) return null;
        var agentView = top.down('dataview[name=agent]');
        var adapterView = top.down('dataview[name=adapter]');
        var esbView = top.down('dataview[name=esb]');
        
        var baseUrl = '';
        if (agentView && agentView.getSelectionModel().hasSelection()) {
            var rec = agentView.getSelectionModel().getSelection()[0];
            baseUrl = 'agentLogController?cmd=im-log&pd_id=' + rec.get('pd_id');
        } else if (adapterView && adapterView.getSelectionModel().hasSelection()) {
            var rec = adapterView.getSelectionModel().getSelection()[0];
            baseUrl = 'adaptorLogController?cmd=agentinstance-log&in_id=' + rec.get('pd_id');
        } else if (esbView && esbView.getSelectionModel().hasSelection()) {
            baseUrl = 'esbLogController?cmd=esb-log-list';
        } else {
            return null;
        }
        return baseUrl;
    }
});
