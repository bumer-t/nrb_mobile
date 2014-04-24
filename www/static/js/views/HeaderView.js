"use strict";

app.views.HeaderView = Backbone.View.extend({
    initialize: function() {
        var hash = Backbone.history.fragment;
        var header_name = '';
        var activate_tab = 1; //первая вкладка активна(2 - вторая вкладка; 0 - нет вкладок)
        var route = new app.routers.AppRouter().routes[Backbone.history.fragment];
        var routeMapWithoutParams = $.map(new app.routers.AppRouter().routes, function(el, val){return val.split('/:')[0];});
        routeMapWithoutParams.shift();
        var currentRoute = $.grep(routeMapWithoutParams, function(e){ return hash.indexOf(e)==0;})[0];
        // identify application name =
        var APP_DEPOSITS = 'deposits';
        var APP_MYDEPOSITS = 'mydeposits';
        var HEADER_MAP = {
            'login': 'Аутентификация',
            'settings': 'Настройки',
            'mydeposits': 'Мои вклады'
        };

        var NOTAB_LIST = [
            'settings', 'deposit/result'
        ];

        if (currentRoute == 'login'){
            hash = Backbone.history.fragment.split('/')[1];
            route = hash;
        }

        if (route in HEADER_MAP) {
            header_name = HEADER_MAP[route];
        } else {
            header_name = 'Оформить депозит';
        }

        if (hash.indexOf(APP_MYDEPOSITS) === 0) {
            activate_tab = 2;
        } else if(hash.indexOf(APP_DEPOSITS) === 0) {
            activate_tab = 0;
        }

        if (currentRoute in NOTAB_LIST) {
            activate_tab = 1;
        }
        if ('settings' == currentRoute) {
            activate_tab = 0;
        }
        this.tempalteData = {
            header_name: header_name,
            activate_tab :  activate_tab
        }
    },

    setTitle: function(title) {
        this.title = title;
        return this;
    },

    render: function() {
        if (this.title) {
            this.tempalteData['header_name'] = this.title;
        }
        this.$el.html(this.template(this.tempalteData));
        return this;
    },

    events: {
        "click .back-button": "back"
    },

    back: function(event) {
        var appRouter = new app.routers.AppRouter();
        appRouter.back();
        //window.history.back();
        return false;
    }

});