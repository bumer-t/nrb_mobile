"use strict";
app.views.DepositOpenFormView = Backbone.View.extend({
    base: 'LayoutBase',

    initialize: function() {
        var self = this;

        this.offers = this.model.offers;
        this.depositListDetail = [];
        var currencies = this.offers[this.model.type]['currencies'];
        for (var i in currencies){
            var result = {'show':false, 'table_currency':''};
            if (currencies[i].curr_id == this.model.currency){
                result['show'] = true;
            }
            result['table_currency'] = currencies[i];
            this.depositListDetail.push(result);
        }

        //загрузка карт
        this.cardList = new app.models.Card();
        this.cardList.on("change", this.onCardListLoad, this);
        this.cardList.fetch({reset: true});
    },
    onCardListLoad: function() {
        this.render();
    },
    render: function() {
        var self = this;
        this.setTemplateData();

        var title = this.tempalteData['deposit'].dep_name;

        var baseView = new app.views[this.base]();
        app._views['header'].setTitle(title);

        baseView.setNested(this.template(this.tempalteData));
        this.$el.html(baseView.render().el);
        self.showCardsLoader();
        //загрузка карт
        if (!this.cardsModels) {
            new app.router.AppRouter().navigate(app.utils.url('login', getLastRoute()));
            return
        }
        if (this.cardsModels.length){
            var cardSelector =  $('.card_input', this.el);
            $(cardSelector).html('');
            $(cardSelector).prepend($('<option>').text(gettext('Выберите карту')).attr("selected","selected"));
            $(this.cardsModels).map(function () {
                var option =$('<option>').val(this.id).text(this.text)
                    .addClass('card_currency_' + this.currency_mnemonic)
                    .attr('data-currency', this.currency);
                $(cardSelector).append(option);
            });
            self.hideCardsLoader();
            $('.update-card-list-btn', this.el).show();
            $('.preloader_card', this.el).hide();
        }
        $('.numeric').numeric();
        return this;
    },
    setTemplateData: function() {
        this.tempalteData = {
            'deposit' : this.offers[this.model.type],
            'list_deposit_small_detail': this.depositListDetail,
            'term_current' : this.model.term,
            'type_current' : this.model.type,
            'currency_current' : this.model.currency
        }
        this.setCardModels();
    },

    setCardModels: function() {
        if ($.isEmptyObject(this.cardList.attributes)) {
            this.cardsModels = [];
            return;
        }
        this.cardsModels = this.cardList.attributes.cards;
    },
    events: {
        "click .update-card-list-btn": "updateCardList",
        "click #deposit_create": "deposit_create"
    },
    showCardsLoader: function() {
        $('.update-card-list-btn', this.el).hide();
        $('.preloader_card', this.el).show();
    },
    hideCardsLoader: function() {
        $('.update-card-list-btn', this.el).show();
        $('.preloader_card', this.el).hide();
    },

    updateCardList: function() {
        var self = this;
        this.showCardsLoader();
        var self=this;
        //this.cardList.fetch({reset: true});
        this.cardList.fetch({
            success: function() {
                self.hideCardsLoader();
            },
            error: function() {
                console.log('Failed to fetch!');
            }
        });
    },
    deposit_create: function(e, er) {
        var target = $(e.currentTarget);
        var result = target.attr('data-res').split('_');
        var deposit_sum = $('#deposit_sum').val();
        var type_deposit = result[0];
        var currency_deposit = result[1];
        var term_deposit_id = result[2];
        if (isNaN(parseFloat(deposit_sum)) || parseFloat(deposit_sum) < 0.01 ){
            alert('Некорректная сумма.');
            return false;
        }

        var min_sum = $('#min_sum').val();
        if (parseFloat(deposit_sum) < parseFloat(min_sum) ){
            alert('Минимальная сумма: '+ min_sum);
            return false;
        }
        var params = {
            'csid' : window.localStorage.getItem('id'),
            'envsid' : window.localStorage.getItem('depsid'),
            'type_id' : term_deposit_id,
            'dep_sum' : deposit_sum,
            'dep_name' : '',
            'isBonus' : 'no',
            'promo_code' : '',
            'percents' : 'in_department',//в отделении
            'funds_source' : 'card', //card
            'card_input' : target.closest('.tab-pane.active').find('.card_input').val(),
            'card_output' : '',
            'currency' : currency_deposit,
            'type_deposit':type_deposit //не для сервера
        };
        console.log(params);

        // call api to open deposit
        app.OpenDeposit.create(params);
    }
});

