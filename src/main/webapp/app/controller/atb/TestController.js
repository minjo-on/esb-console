Ext.define('IndigoESBWebConsole.controller.atb.TestController', {
    extend: 'Ext.app.Controller',
    views: ['atb.TestPanel'],
    stores: [],
    menuTitle: 'Person',
    init: function (app) {
        console.log("Test Controller Initialized");
        //this.control({});
    }

});