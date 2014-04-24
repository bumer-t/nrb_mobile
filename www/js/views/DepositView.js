"use strict";

app.views.DepositView = Backbone.View.extend({
    base: 'LayoutBase',

    initialize: function() {
        var offers = this.model.offers;
        var list_deposit_small_detail = offers[this.model.type]['currencies'];
        this.tempalteData = {
            'deposit' : offers[this.model.type],
            'list_deposit_small_detail': list_deposit_small_detail,
            'currency_current' : this.model.currency
        }
    },
    render: function() {

        var baseView = new app.views[this.base]();
        console.debug('depview render')
        var title = this.tempalteData['deposit'].dep_name;
        app._views['header'].setTitle(title);

        baseView.setNested(this.template(this.tempalteData));
        this.$el.html(baseView.render().el);
        if (typeof this.model.currency === 'undefined'){
            $('.tab_ul_deposit_detail_currency:first', this.$el).addClass('active');
            $('.tab_li_deposit_detail_currency:first', this.$el).addClass('active');
        }
        return this;
    },

    events: {
//        "click .place_deposit": "placeDeposit"
    },

    placeDeposit: function(e, er) {
        var target = e.currentTarget;
        var $target = $(target);
//        console.log('оформление', target.id);
    }

});