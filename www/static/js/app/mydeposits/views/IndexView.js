app.views.MyDepositsIndexView = Backbone.View.extend({
    initialize: function() {
        this.headerView = new app.views.HeaderView();


    },

    render: function() {
        this.$el.html(this.template());
        $('.header', this.el).html(this.headerView.render().el);

        this.depositListView = new app.views.MyDepositsDepositListView();
        $('.depositListContainer', this.el).html(this.depositListView.render().el);
        return this;
    }
});