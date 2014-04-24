"use strict";
app.views.MyDepositsDepositListView = Backbone.View.extend({
    getTemplateData: function() {
        var templateData = [];
        console.debug('this.model', this.model);
        if ($.isEmptyObject(this.model)) {
            return templateData;
        }

        var deposits = $.map(this.model.models, function(model) { return model.attributes});
        templateData = {'deposits': deposits};
        console.debug('templateData', templateData);

        return templateData;
    },
    initialize: function() {
        var self = this;
        this.depositList = new app.models.DepositCollection();
        this.model = this.depositList;
        this.model.fetch({reset: true});

        this.templateData = self.getTemplateData();
        this.model.on("reset", function() {
            console.debug('on reset');
            self.templateData = self.getTemplateData();
            console.debug('template data', self.templateData);
            this.render();
        }, this);
    },

    render: function() {
        this.$el.empty();
        console.debug('template', self.templateData);
        this.templateData = this.templateData || {};
        this.$el.html(this.template(this.tempalteData));
        return this;
    },

    events: {
        'click .deposit-item': 'openMoreAboutDeposit'
    },

    openMoreAboutDeposit: function (e) {
        var target = $(e.currentTarget);
        var account = target.attr('data-account');
        var url = app.utils.url('mydeposits/moreabout', account);
        new app.routers.AppRouter().navigate(url);
    }
});