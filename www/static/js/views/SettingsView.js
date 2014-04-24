"use strict";

app.views.SettingsView = Backbone.View.extend({
    base: 'LayoutBase',
    render: function() {
        var baseView = new app.views[this.base]();
        baseView.setNested(this.template(this.tempalteData));
        this.$el.html(baseView.render().el);

        return this;
    },

    events: {
        "click .clear-session": "clearSession",
        "click .clear-all": "clearAll"
    },

    clearAll: function(event) {

        window.localStorage.clear();
        new app.routers.AppRouter().navigate('', true);
    },
    clearSession: function(event) {
        window.localStorage.removeItem('id');
        window.localStorage.removeItem('depsid');
        app.session.clearDataWithoutPhone();
        $('body').html();
        new app.routers.AppRouter().navigate('', true);
    }

});