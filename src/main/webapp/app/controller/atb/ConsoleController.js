Ext.define('IndigoESBWebConsole.controller.atb.ConsoleController', {
    extend: 'Ext.app.Controller',
    views: ['atb.ConsolePanel'],
    stores: [],
    menuTitle: 'ATB Console',
    init: function (app) {
        console.log("ATB Console Controller Initialized");
        //this.control({});
    }

});