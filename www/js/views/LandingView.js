"use strict";

app.views.LandingView = Backbone.View.extend({
    base: 'LayoutBase',

    initialize: function() {

    },
    render: function() {
        var baseView = new app.views[this.base]();
        baseView.setNested(this.template(this.tempalteData));
        this.$el.html(baseView.render().el);
        this.depositListView = new app.views.DepositListView();
        var depositListViewContent = this.depositListView.render().el;
        if (depositListViewContent != '') {
            $('.depositList', this.el).html(this.depositListView.render().el);
        }
        return this;
    },

    events: {
        'click .test-btn': 'onTestBtnClick'
    },

    onTestBtnClick: function() {
        console.debug('cordova device', cordova.device);
    }

});