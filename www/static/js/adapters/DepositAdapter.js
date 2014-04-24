"use strict";

app.adapters.Deposit = (function () {
    var MYDEPOSITS_URL = app.config.API_URL + '/mydeposits/getDepositList';
    var getActiveList = function() {
        var deferred = $.Deferred();
        var csid = window.localStorage.getItem('id');
        var depsid = window.localStorage.getItem('depsid');
        var params = params || {};
        $.extend(params, {
           'csid': csid,
           'envsid': depsid
        });
        var CACHE_KEY = 'deposits';
        var depositsCached = window.localStorage.getItem(CACHE_KEY);
        if (depositsCached != null) {
           depositsCached = JSON.parse(depositsCached);
           deferred.resolve(depositsCached.deposit_list);
        } else {
            app.utils.onApiLoad(MYDEPOSITS_URL, params, function(data) {
                deferred.resolve(data.deposit_list);
                window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                app.session.update();
            }, function(){
                new app.routers.AppRouter().navigate('login', true);
                return;
            });
        }
        return deferred.promise();
    };
    // The public API
    return {
//        findById: findById,
        getActiveList: getActiveList
    };
}());