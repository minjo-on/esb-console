Ext.define('IndigoESBWebConsole.view.atb.InterfacePanel', {
    extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleTitlePanel',
    alias: 'widget.InterfacePanel',
    requires: [],
    isSendTrace: false,
    layout: 'fit',
    border: false,
    initComponent: function () {
        console.log("ATB Interface 진입 시작");

        this.items = [{
            xtype: 'component',
            autoEl: {
                tag: 'iframe',
                src: '/atb-web/interfaceList', // Replace with the desired URL
                style: 'width: 100%; height: 100%; border: none;'
            }
        }];

        this.callParent(arguments);
        console.log("ATB Interface 진입 - callParent 완료");
    }
});