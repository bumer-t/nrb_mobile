"use strict";

var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
    adapters: {},
    config: {},
    session: {},
    storage: {},
    _views:{}
};

// on ready function
$(function() {
    var viewList = [
        'LayoutBase',
        // common app views
        'HeaderView', 'LandingView', 'SettingsView', 'LoginView', 'CardSelectorView',
        // deopsits app views
        'DepositListView', 'DepositView', 'DepositOpenFormView', 'DepositResultView',
        // mydeopsits app views
        'MyDepositsIndexView', 'MyDepositsDepositListView', 'MyDepositsMoreAboutView'
    ];
//    var viewList = [
//        // deopsits app views
//        'HeaderView',
//// 'LandingView',
////        'deposits/ListView', 'deposits/OpenView', 'deposits/OpenForm',
//        'mydeposits/IndexView', 'mydeposits/DepositListView'
//    ];

    app.utils.templates.load(viewList,
        function() {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
        }
    );

    document.addEventListener("deviceready", function() {
        console.debug('ON DEVICEREADY');

        document.addEventListener('resume', function () {
            console.debug('ON RESUMED application');
        }, true);

        document.addEventListener("offline", function() {
            console.debug('OFFLINE EVENT');
        }, false);

        document.addEventListener("online", function() {
            console.debug('OFFLINE EVENT');
        }, false);
//        document.addEventListener("backbutton", function() {
//            console.debug('ON BACK backbutton pressed');
//        }, false);

        document.addEventListener("menubutton", function() {
            alert('Menu!');
            console.debug('ON MENU button pressed');
        }, true);

        document.addEventListener("pause", function() {
            console.debug('on PAUSE');
        }, false);
    }, false);

    //document.addEventListener('touchmove', function(e){ e.preventDefault();}, false);
});