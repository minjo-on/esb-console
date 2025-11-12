Ext.define('IndigoESBWebConsole.view.atb.TestPanel', {
    extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleTitlePanel',
    alias: 'widget.TestPanel',
    requires: [],
    isSendTrace: false,
    layout: 'fit',
    border: false,
    initComponent: function () {
        console.log("CUSTOM CONSOLE 진입 시작");

        this.items = [{
            xtype: 'component',
            autoEl: {
                tag: 'iframe',
	        src:  '/imc-adapter-console/',
                style: 'width: 100%; height: 100%; border: none;'
            }
        }];

        this.callParent(arguments);
        console.log("CUSTOM CONSOLE 진입 - callParent 완료");
    }
});
