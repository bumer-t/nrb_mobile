"use strict";

app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        '': 'index',
        'home': 'index',
        'settings': 'settings',
        'login/:slug': 'login',
        'deposit/view/:type': "depositView",
        'deposit/view/:type/:currency': "depositView",
        'deposit/openformview/:type/:currency/:term': "depositOpenFormView",
        'deposit/result/:type/:currency/:term/:sum': "depositResultView",
        'mydeposits': "mydeposits",
        'mydeposits/moreabout/:id': 'mydeposits_moreabout'
    },

    initialize: function() {
        //app.slider = new PageSlider($('body'));
        this.routesHit = 0;
        //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },

    index: function () {
        app.landingView = new app.views.LandingView();
        app.utils.render(app.landingView.render().$el);
    },

    login: function (slug) {
        if (app.session.isLoggedIn()){
            //app.utils.render(new app.views.MyDepositsIndexView().render().$el);
            this.navigate(app.utils.url(slug.replaceAll(ROUTE_SEPARATOR, '/')));
            return;
        }
        app.utils.render(new app.views.LoginView({model:{slug:slug}}).render().$el);
        //after render
        $('.numeric').numeric();
    },

    depositView: function(type, currency) {
        var offers = getOffers();
        app.utils.render(new app.views.DepositView({model:{type:type, currency:currency, offers: offers}}).render().$el);
    },

    depositOpenFormView: function(type,currency,term) {
        if (!app.session.isLoggedIn()) {
            this.navigate(app.utils.url('login', getLastRoute()));
            return;
        }
        var offers = getOffers();
        console.debug('offers', offers);
        app.utils.render(new app.views.DepositOpenFormView({model:{type:type, currency:currency, term:term, offers:offers}}).render().$el);
    },

    depositResultView: function(type,currency,term,sum) {
        var offers = getOffers();
        app.utils.render(new app.views.DepositResultView({model:{
            type:type, currency:currency, term:term, sum:sum, offers:offers}}).render().$el);
    },

    mydeposits: function() {
        if (!app.session.isLoggedIn()) {
            this.navigate(app.utils.url('login', getLastRoute()));
            return;
        }
        console.debug('render mydeposits');
        app.myDepositsIndexView = new app.views.MyDepositsIndexView();
        var content = app.myDepositsIndexView.render().$el;
        app.utils.render(content);
        //app.slider.slidePage(content);
    },

    settings: function() {
        app.utils.render(new app.views.SettingsView().render().$el);
    },

    mydeposits_moreabout: function(id) {
        var depositCollection = new app.models.DepositCollection();
        depositCollection.fetch({reset: true});
        var depositList = depositCollection.models;
        depositList = $.map(depositCollection.models, function(model) {
            return model.attributes
        });

        console.debug('deposit list', depositList);
        //return;
//        console.debug('collection ', this.depositList);
//        this.model = this.depositList;

        var account = id;
        var model = $.grep(depositList, function(e){ return e.account==account;})[0];

        console.debug('moreabout', model);
        app.utils.render(new app.views.MyDepositsMoreAboutView({model:model}).render().$el);
    },
    back: function() {
        window.history.back();
//        if(this.routesHit > 1) {
//            //more than one route hit -> user did not land to current page directly
//            window.history.back();
//        } else {
//            //otherwise go to the home page. Use replaceState if available so
//            //the navigation doesn't create an extra history entry
//            this.navigate('', {trigger:true, replace:true});
//        }
    }
});