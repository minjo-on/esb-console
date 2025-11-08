Ext.define('IndigoESBWebConsole.controller.atb.PersonController', {
    extend: 'Ext.app.Controller',
    views: ['atb.PersonPanel'],
    stores: [],
    menuTitle: 'Person',
    init: function (app) {
        console.log("ATB Person Controller Initialized");
        //this.control({});
    }

});