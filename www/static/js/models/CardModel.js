"use strict";

app.models.Card = Backbone.Model.extend({

    initialize:function () {
    },

    sync: function(method, model, options) {
        if (method === "read") {
            app.adapters.Card.getCardList().done(function (data) {
                options.success(data);
            });
        }
    }

});