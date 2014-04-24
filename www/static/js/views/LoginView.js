"use strict";

app.views.LoginView = Backbone.View.extend({
    initialize: function() {
        this.slug = this.model.slug;
    },

    render: function() {
        var baseView = new app.views['LayoutBase'];

        baseView.setNested(this.template());
        this.$el.html(baseView.render().el);

        //this.$el.html(this.template());
        $('.login-form', this.$el).hide();
        var phone = app.session.getPhone();
        if (!phone) {
            $('.otp-code', this.$el).show();
        } else {
            $('.login-phone', this.$el).show();
        }
        var defaultPhone = phone;
        defaultPhone = defaultPhone?defaultPhone:'380';
        $('.default_phone', this.$el).val(defaultPhone.replace('+',''));
        return this;
    },

    // events handlers place here please
    events: {
        "click #btn_link_phone": "linkPhone",
        "click #btn_login": "login"
    },

    linkPhone: function (event) {
        var phone = '+' + $('#phone_number_link', this.$el).val();
        var otp = $('#code', this.$el).val();
        var cnt = this.$el;
        app.Authorizator.linkPhone(phone, otp, function (status) {
            if (!status) {
                return;
            }
            $('.login-form', cnt).hide();
            $('.login-phone', cnt).show();
            // on success link phone
            var defaultPhone = app.session.getPhone();
            defaultPhone = defaultPhone ? defaultPhone : '380';
            $('.default_phone', cnt).val(defaultPhone.replace('+',''));

        });
        return false;
    },

    login: function (event) {
        var self = this;
        var phone = '+' + $('#phone_number', this.$el).val();
        var password = $('#password', this.$el).val();
        // lock button to prevent double click

        app.Authorizator.checkPassword(phone, password, function(status) {
            if (!status) {
                return;
            }
            var router = new app.routers.AppRouter();
            app.session.clearDataWithoutPhone();
            router.navigate(self.slug.replaceAll(ROUTE_SEPARATOR, '/'), true);
        });
    }

});