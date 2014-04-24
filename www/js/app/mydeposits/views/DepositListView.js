function load_deposits() {
    var url = 'http://localhost:8000/mydeposits/getDepositList'
    var data = MY_DEPOSITS;
    return data
}

app.views.MyDepositsDepositListView = Backbone.View.extend({
    initialize: function() {
        this.tempalteData = load_deposits();
    },

    render: function() {
        this.$el.html(this.template(this.tempalteData));
        return this;
    }
});