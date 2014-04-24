"use strict";

window.ROUTE_SEPARATOR = '__';
window.CLIENT_DATA_CACHE = window.CLIENT_DATA_CACHE || {};
window.CLIENT_DATA_LOAD_COUNTER = window.CLIENT_DATA_LOAD_COUNTER || 0;
window.DATA_LOAD_CB_LIST = window.DATA_LOAD_CB_LIST || [];
window.DATA_LOAD_CBT_LIST = window.DATA_LOAD_CBT_LIST || [];
window.DATA_LOAD_CACHE_TIME = window.DATA_LOAD_CACHE_TIME || 10*1000;
//window.DATA_LOAD_CACHE_TIME = window.DATA_LOAD_CACHE_TIME || 1;

app.utils.onApiLoad = function(checkUrl, params, callback, callbackTimeout) {
    var key = [checkUrl, JSON.stringify(params)].join('-');
    if (key in window.CLIENT_DATA_CACHE) {
        var cachedData = window.CLIENT_DATA_CACHE[key];
        if ((Date.now()-cachedData['time']) < window.DATA_LOAD_CACHE_TIME) {
            if(callback) callback(cachedData['data']);
            return;
        }
        delete window.CLIENT_DATA_CACHE[key];
    }

    callbackTimeout = callbackTimeout || function(){}
    function loadClientData(callback, requestTimeout, requestCount) {
        var requestTimeout = requestTimeout || 500;
        var requestCount = typeof requestCount !== 'undefined' ? requestCount: 1;
        if (requestCount > 100) {
             callback(true);
            return
        }
        $.extend(params, {'rand':Math.random()});
        $.ajax({
            type:'GET',
            url:checkUrl,
            data: params,
            dataType:'json',
            timeout:30000,
            statusCode:{
                200: function(data) { callback(data)},
                202: function() {
                    setTimeout(function () {
                        loadClientData(callback, requestTimeout, requestCount+1);
                    }, requestTimeout*(1+Math.log(requestCount)));
                },
                500: function(data){callback(data, true)}
            }
        });
    }
    window.DATA_LOAD_CB_LIST.push(callback);
    window.DATA_LOAD_CBT_LIST.push(callbackTimeout);

    if (window.CLIENT_DATA_LOAD_COUNTER>0) {
        return;
    }
    window.CLIENT_DATA_LOAD_COUNTER++
    loadClientData(function(data, isError) {
        window.CLIENT_DATA_CACHE[key] = {'data':data, time:Date.now()};
        window.CLIENT_DATA_LOAD_COUNTER--;
        var isError = isError || false

        if (isError) {
            window.DATA_LOAD_CB_LIST = window.DATA_LOAD_CBT_LIST;
        }
        while(true) {
            callback = window.DATA_LOAD_CB_LIST.pop();
            if (typeof(callback) == "undefined") break;
            if (typeof(callback) == "function") {
                callback(data);
            }
        }
    })
};

app.utils.url = function(name, params) {
    var params = params || '';
    var url = '';
    if (name) {
        url += '#/' + name;
    } else {
        return '#/home';
    }

    if (params && $.isArray(params)) {
        params = params.join('/');
    }
    url += params?'/'+params:'';
    return url;
};

app.utils.render = function(content) {
    //$('body').html(content.find('#wrapper'));
    $('body').html(content);
}

//берём перевёрнутый json
function getOffers() {
    var model = new app.models.DepositOffers();
    model.fetch({'reset': true});
    return model.getMappedData();
}

//для логина передаем урл на которой потом следует перейти
function getLastRoute(){
    var route = Backbone.history.fragment;
    route = route.replaceAll('/', ROUTE_SEPARATOR);
    return route
}

//прелоудер показывается вместо кнопки
function loaderWorker(selector, status) {
    if ($(selector).length ) {
        if (!$('#preload').length ) {
            selector.after('<div id="preload"><br><img src="static/images/preloader_p24.gif" /></div>');
        }
        if (status == true) {
            selector.hide();
            $('#preload').show();
        } else {
            $('#preload').hide();
            selector.show();
        }
    }
}

//replaceAll для строк
String.prototype.replaceAll = function(search, replace){
    return this.split(search).join(replace);
};

//Подымает вверх 1-ю букву
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function gettext(key){
    return key;
}

function number_format(number, decimals, dec_point, thousands_sep) {
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}