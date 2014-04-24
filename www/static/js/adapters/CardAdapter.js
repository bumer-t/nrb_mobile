"use strict";

app.adapters.Card = (function () {
    var GET_CARD_LIST_URL = app.config.API_URL + '/api/deposits/cardlist';
    var CACHE_KEY = 'cards';
    var getCardList = function() {
        var deferred = $.Deferred();

        var cachedData = window.localStorage.getItem(CACHE_KEY);
        cachedData = null;
        if (cachedData != null) {
            cachedData = JSON.parse(cachedData);
            deferred.resolve(cachedData);
        } else {
            var csid = window.localStorage.getItem('id');
            var depsid = window.localStorage.getItem('depsid');
            var params = params || {};
            $.extend(params, {
               'csid': csid,
               'envsid': depsid
            });
            app.utils.onApiLoad(GET_CARD_LIST_URL, params, function(data) {
                // save to cache
                window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                deferred.resolve(data);
            }, function() {
                deferred.resolve({});
//                $('.preloader_card').hide();
//                $('.update-card-list-btn').show();
            });
            app.session.update();
        }
        return deferred.promise();
    };
    return {
        getCardList: getCardList
    };
}());