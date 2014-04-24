app.views.DepositOpenForm = Backbone.View.extend({
    initialize: function() {
        var header_name_deposit = {'main_page' : 'Оформить депозит',
            'my_deposits_page':'Мои вклады',
            'settings':'Настройки'};

        var list_deposits = new Array();
        $.each(depositOffers.order_deposits, function(deposit_key, deposit_value) {
            var list_deposit_small_detail = DEPOSITS[deposit_value]['currencies'];
            header_name_deposit[DEPOSITS[deposit_value].dep_code] = DEPOSITS[deposit_value].dep_name;
            list_deposits.push({'deposit' : DEPOSITS[deposit_value],
                'list_deposit_small_detail': list_deposit_small_detail});
        });
        this.depositsOffers = {'deposits': list_deposits};
        this.tempalteData = list_deposits[0];
        this.tempalteData = this.model;
        console.debug('termasdas', this.model);
    },
    render: function() {
        console.debug('this', this);
        this.$el.html(this.template(this.tempalteData));
        return this;
    }
});