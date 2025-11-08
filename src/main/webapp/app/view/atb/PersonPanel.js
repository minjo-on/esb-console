Ext.define('IndigoESBWebConsole.view.atb.PersonPanel', {
    extend: 'IndigoESBWebConsole.view.common.IndigoESBWebConsoleTitlePanel',
    alias: 'widget.PersonPanel',
    requires: [],
    isSendTrace: false,
    layout: 'fit',
    border: false,
    initComponent: function () {
        console.log("인터페이스 담당자 진입 시작");

        this.items = [{
            xtype: 'component',
            autoEl: {
                tag: 'iframe',
                src: '/atb-web/interfacePersonList', // Replace with the desired URL
                style: 'width: 100%; height: 100%; border: none;'
            }
        }];

        this.callParent(arguments);
        console.log("인터페이스 담당자 진입 - callParent 완료");
    }
});