"use strict";

app.views.LayoutBase = Backbone.View.extend({
    nestedContent: '',
    initialize: function() {
        this.headerView = new app.views.HeaderView();
        app._views['header'] = this.headerView;
    },
    render: function() {

        this.$el.html(this.template());
        $('.header', this.el).html(this.headerView.render().el);
        $('.page_content', this.$el).html(this.nestedContent);
        console.debug('el', this.el);
        return this;
    },

    setNested: function(nestedContent) {
        this.nestedContent = nestedContent;
        return this;
    },

    getHeader: function () {
        return this.headerView;
    }
});




