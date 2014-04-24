"use strict";

app.views.DepositResultView = Backbone.View.extend({
    base: 'LayoutBase',

    initialize: function() {
        var offers = this.model.offers;
        var currency_by_deposit = offers[this.model.type]['currencies'];
        for (var i in currency_by_deposit) {
            if (currency_by_deposit[i].curr_id == this.model.currency){
                currency_by_deposit = currency_by_deposit[i];
                break;
            }
        }

        var term_by_deposit = {};
        for (var i in currency_by_deposit.terms){
            if (currency_by_deposit.terms[i].type == this.model.term){
                term_by_deposit = currency_by_deposit.terms[i];
                break;
            }
        }

        this.tempalteData = {
            'deposit' : offers[this.model.type],
            'currency_by_deposit': currency_by_deposit,
            'term_by_deposit': term_by_deposit,
//            'term_current' : this.model.term,
//            'type_current' : this.model.type,
//            'currency_current' : this.model.currency,
            'sum_current' : this.model.sum
        };
    },
    render: function() {
        var title = this.tempalteData['deposit'].dep_name;
        app._views['header'].setTitle(title);

        var baseView = new app.views[this.base]();
        baseView.setNested(this.template(this.tempalteData));
        this.$el.html(baseView.render().el);
        return this;
    },

    events: {
//        "click .place_deposit": "placeDeposit"
    },

    placeDeposit: function(e, er) {
        var target = e.currentTarget;
        var $target = $(target);
        console.log('оформление_подтверждение', target.id);
    }

});