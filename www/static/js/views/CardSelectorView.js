"use strict";
app.views.CardSelectorView = Backbone.View.extend({
    initialize: function() {
        this.templateData = {};
    },
    render: function() {
        console.debug('render cardSelector', this.templateData);
        this.templateData = this.templateData || {};
        this.$el.html(this.template(this.templateData));
        return this;
    }
});