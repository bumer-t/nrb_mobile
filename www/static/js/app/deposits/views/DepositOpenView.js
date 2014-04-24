function get_term(deposit_type, currency, term_type) {
    var currencies = DEPOSITS[deposit_type].currencies;
    var result = {'period':'', base_rate: ''};
    for (el_currency in currencies) {
        if (currencies[el_currency].curr_id == currency){
            var terms = currencies[el_currency].terms;
            for (el_term in terms) {
                if (terms[el_term].type_code == term_type) {
                    result['period'] = terms[el_term].period;
                    result['base_rate'] = terms[el_term].base_rate;
                    break;
                }
            }
            break;
        }
    }
    return result;
}

app.views.DepositOpenView = Backbone.View.extend({
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
    },
    render: function() {
        this.$el.html(this.template(this.tempalteData));
        return this;
    },

    events: {
        "click .place_deposit": "placeDeposit"
    },

    placeDeposit: function(e, er) {
        var target = e.currentTarget;
        var $target = $(target);
        console.log('оформление', target.id);
        e.stopPropagation(); e.preventDefault();

        var id = target.id;
        var id_split = id.split('_');

        var deposit_type = id_split[0];
        var currency = id_split[1];
        var term_type = id_split[2];

        var term = get_term(deposit_type, currency, term_type);
        this.openForm = new app.views.DepositOpenForm({model: term});
        $('.content_0_deposit_detail', this.$el).html(this.openForm.render().el);

//        var content_1_deposit_detail = $target.closest(".content_1_deposit_detail");
//        console.debug('idet', content_1_deposit_detail);
//        $('.content_0_deposit_detai', this.$el).html('<h2>KAVABUNGA</h2>');
//        //$target.closest(".content_0_deposit_detail").html('<h2>KAVABUNGA</h2>');
////        $target.closest(".content_0_deposit_detail").html(content_1_deposit_detail.html());
//        //content_1_deposit_detail.load('deposit_create.html', function(){$target.trigger("create")});
//
//        console.log(term);
//
    }

});