"use strict";

app.views.MyDepositsIndexView = Backbone.View.extend({
    base: 'LayoutBase',
    initialize: function() {
    },

    render: function() {
        console.debug('render mydeposits');
        var baseView = new app.views[this.base]();
        baseView.setNested(this.template());
        this.$el.html(baseView.render().el);

        $('.depositListContainer', this.el).html(new app.views.MyDepositsDepositListView().render().el);

        return this;
    }
});