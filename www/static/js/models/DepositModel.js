"use strict";

app.models.Deposit = Backbone.Model.extend({

    initialize:function () {
    },

    sync: function(method, model, options) {
        if (method === "read") {
            app.adapters.Deposit.findById(parseInt(this.id)).done(function (data) {
                options.success(data);
            });
        }
    }

});

app.models.DepositCollection = Backbone.Collection.extend({

    model: app.models.Deposit,

    sync: function(method, model, options) {
        if (method === "read") {
            app.adapters.Deposit.getActiveList().done(function (data) {
                options.success(data);
            });
        }
    }

});
