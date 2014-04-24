"use strict";

app.views.MyDepositsMoreAboutView = Backbone.View.extend({
    base: 'LayoutBase',

    initialize: function() {
        this.tempalteData = this.model;
    },

    render: function() {
        var baseView = new app.views[this.base]();
        baseView.setNested(this.template(this.te));
        this.$el.html(baseView.render().el);
        return this;
    }
});