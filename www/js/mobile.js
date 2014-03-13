// Phone code for banks
function getPhoneCode() {
    var params = {}
    location.href.replace(/(\w+)=(.+?)(&|$)/g, function (substr, key, value) {
        params[key] = value;
    });
    switch (params.bank) {
        case 'MP':
            return '7';
        case 'PL':
            return '371';
        case 'TG':
            return '995';
        default:
            return '380'
    }
}

function send_phone() {
    if ($('#phone_number').val().length < 7) {
        alert('Не введен номер');
        return false;
    }
    if ($('#password').val().length < 1) {
        alert('Не введен пароль');
        return false;
    }
    //success
    $('#login_phone').hide();
    $('#login_code').show();
}

function send_otp() {
    if ($('#code').val().length < 1) {
        alert('Не введен otp-пароль');
        return false;
    }
    //success
    alert('new page soon');
//    $('#div_my_deposits').load('my_deposits.html').trigger("create");
    $("#div_my_deposits").load('my_deposits.html', function(){$(this).trigger("create")});
    $('#div_login_forms').hide();
    $('#div_my_deposits').show();
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires*1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for(var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


$(function(){
    //для поля-телефон - фиксируем код страны
    var phone_code = getPhoneCode();
    $('#phone_number').attr("placeholder", phone_code);
    $('#phone_number').attr("value", phone_code);
    //ввод только цифер
    $('#phone_number').numeric();
    $('#code').numeric();

    $('.height_center').each(function() {
        var heightHeader = Math.round($(this).parent().height() / 2);
        $(this).css('padding-top', heightHeader - Math.round($(this).children().height() / 2));
    });

    //клик по клопке - Вход
    $('#but_auth').on('touchstart click', function(e){
        e.stopPropagation(); e.preventDefault();
        if ($('#login_phone').is(":visible")) {
            send_phone();
        } else {
            send_otp();
        }
    });

    if (!navigator.cookieEnabled) {
        alert('Включите cookie для комфортной работы с этим сайтом');
    }

    setCookie('qwe', 2);
    alert(getCookie('qwe'));

});