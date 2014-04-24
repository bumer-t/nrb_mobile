"use strict";

app.session = {

    isLoggedIn: function () {
        var csid = window.localStorage.getItem('id');
        var csidTime = window.localStorage.getItem('csid-time');
        if (csid === null || csid == 'undefined') return false;
        if (csidTime === null || csidTime == 'undefined') return false;
        var sessionTime = Math.round(((app.session.getTime()) - csidTime)/(1000*60));
        if (sessionTime>10) return false
        return true;
    },

    login: function(csid, depsid) {
        window.localStorage.setItem('id', csid);
        window.localStorage.setItem('depsid', depsid);
        app.session.update();
    },
    getPhone: function() {
        return window.localStorage.getItem('phone');
    },
    clearDataWithoutPhone: function() {
        window.localStorage.removeItem('deposits');
        //window.localStorage.removeItem('deposit_offers');
        window.localStorage.removeItem('cards'); // del
    },
    update: function() {
        window.localStorage.setItem('csid-time', app.session.getTime());
    },
    getTime: function() {
        return new Date().getTime();
    }

}

app.Authorizator = (function(){
    var storage = window.localStorage;
    var URL_LINK_PHONE = app.config.API_URL + '/api/iapi/linkPhone';
    var URL_CHECK_PASS = app.config.API_URL + '/api/iapi/auth';
    var API_STATUS_FAIL = 'fail';
    var API_STATUS_FALSE = 'false';
    var imei = storage.getItem('imei');
    if (imei === null || imei == 'undefined') {
        imei = 'testimei' + Math.random();
        storage.setItem('imei', imei);
    }

    var linkPhone = function(phone, otp, onSuccessCallback) {
        var $btnLinkPhone = $('#btn_link_phone');
        $btnLinkPhone.attr('disabled', 'disabled');
        $.ajax({
            type: 'GET',
            url: URL_LINK_PHONE,
            dataType: 'json',
            data: {'phone': phone, 'imei': imei, otp: otp},
            timeout: 30000,
            success: function (data) {
                $btnLinkPhone.removeAttr('disabled');
                console.debug('data', data);
                if (data.st ===  API_STATUS_FAIL) {
                    alert(data.err);
                    onSuccessCallback(false);
                    return false;
                }
                if (otp === '') {
                    $('.otp-cnt').show();
                    return;
                }
                storage.setItem('phone', phone);
                onSuccessCallback(true);
            },
            error : function (data) {
                $btnLinkPhone.removeAttr('disabled');
                onSuccessCallback(false);
            }
        });
    };

    var checkPassword = function(phone, password, onSuccessCallback) {
        var $btnLogin = $('#btn_login');
        $btnLogin.attr('disabled', 'disabled');
        $.ajax({
            type: 'GET',
            url: URL_CHECK_PASS,
            dataType: 'json',
            data: {'phone': phone, 'imei': imei, password: password},
            timeout: 30000,
            success: function (data) {
                $btnLogin.removeAttr('disabled');
                console.debug('auth data', data);
                if (API_STATUS_FALSE == data.status) {
                    alert(data.status);
                    onSuccessCallback(false);
                    return false;
                }
                app.session.login(data.id, data.depsid);
                onSuccessCallback(true);
            },
            error : function(data) {
                $btnLogin.removeAttr('disabled');
                onSuccessCallback(false);
            }
        });
    };
    return {
        linkPhone: linkPhone,
        checkPassword: checkPassword
    };
}());

