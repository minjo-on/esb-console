Ext.define('IndigoESBWebConsole.view.atb.ConsolePanel', {
    extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleTitlePanel',
    alias: 'widget.ConsolePanel',
    requires: [],
    isSendTrace: false,
    layout: 'fit',
    border: false,
    initComponent: function () {
        console.log("ATB CONSOLE 진입 시작");

        this.items = [{
            xtype: 'component',
            autoEl: {
                tag: 'iframe',
	        src:  '/atb-web/atbConsoleView',
                style: 'width: 100%; height: 100%; border: none;'
            }
        }];

        this.callParent(arguments);
        console.log("ATB CONSOLE 진입 - callParent 완료");
    }
});
