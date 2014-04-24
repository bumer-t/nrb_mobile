"use strict";
app.views.DepositListView = Backbone.View.extend({
    getTemplateData: function(model) {
        var templateData = null;
        var depositOffers = model.attributes;
        if ($.isEmptyObject(model.attributes)) {
            return templateData;
        }
        var list_deposits = new Array();
        var DEPOSITS = remapDepositOffers(depositOffers);
        //window.DEPOSITS = DEPOSITS;
        $.each(depositOffers.order_deposits, function(deposit_key, deposit_value) {
            var list_deposit_small_detail = DEPOSITS[deposit_value]['currencies'];
            list_deposits.push({'deposit' : DEPOSITS[deposit_value],
                'list_deposit_small_detail': list_deposit_small_detail});
        });
        templateData = {'deposits': list_deposits};
        return templateData;
    },

    initialize: function() {
        var self = this;
        this.templateData = null;
        this.model = new app.models.DepositOffers();
        this.model.fetch({reset: true});
        this.templateData = this.getTemplateData(this.model);

        this.model.bind('request', this.ajaxStart, this);
        this.model.bind('sync', this.ajaxComplete, this);

        this.model.on("change", function() {
            console.debug('on change');
            console.debug('model', this.model);
            this.templateData = this.getTemplateData(this.model);
            this.render();
        }, this);
    },

    ajaxStart: function(arg1,arg2,arg3){
        console.debug('start ajax');
        //start spinner
        //$('#item-loading').fadeIn({duration:100});
    },
    ajaxComplete: function(){
        //$('#item-loading').fadeOut({duration:100});
    },

    render: function() {
        console.debug('render deposit offers', this.templateData);
        //if (this.templateData != null) {
        this.templateData = this.templateData || {};
        this.$el.html(this.template(this.templateData));
        //}
        return this;
    }
});