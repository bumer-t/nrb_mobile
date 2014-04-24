app.views.LandingView = Backbone.View.extend({
    initialize: function() {
        this.headerView = new app.views.HeaderView();
        this.depositListView = new app.views.DepositListView();
    },

    render: function() {
        this.$el.html(this.template());
        $('.header', this.el).html(this.headerView.render().el);
        $('.depositList', this.el).html(this.depositListView.render().el);
        return this;
    }
});