"use strict";

app.adapters.DepositOffers = (function () {
    var OFFERS_URL = app.config.API_URL + '/deposits/getDepositOffers';

    var getOffersList = function() {
        var deferred = $.Deferred();

        var depositOffersCached = window.localStorage.getItem('deposit_offers');
        //depositOffersCached = null;
        if (depositOffersCached != null) {
            deferred.resolve(JSON.parse(depositOffersCached));
        } else {
            $.ajax({
                type:'GET',
                url:OFFERS_URL,
                data: {},
                dataType:'json',
                timeout:30000,
                success:function(data) {
                    //Store sample data in Local Storage
                    window.localStorage.setItem('deposit_offers', JSON.stringify(
                        data
                    ));
                    deferred.resolve(data);
                    app.session.update();
                },
                error: function() {
                    alert('No connection');
                }
            });
        }
        return deferred.promise();
    };

    // The public API
    return {
//        findById: findById,
        getOffersList: getOffersList
    };
}());