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

var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
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

    //клик по Депозиту
    $('.deposit').on('touchstart click', function(e){
        e.stopPropagation(); e.preventDefault();
        var id_deposit = ($(this).attr('id'));
        var title = $('#' + id_deposit).find('.dep_name').text();
        $('#title').text(title);
        $("#div_deposit_info").load('deposit_info.html', function(){$(this).trigger("create")});
        $('#deposits_list').hide();
        $('#div_deposit_info').show();
    });

    //Показывает форму оформления депозита
    $(document).on('touchstart click', '.place_deposit', function(e){
        e.stopPropagation(); e.preventDefault();
        console.log('оформление');
        var temp_currency = $('#head_currency .ui-state-active').contents().attr('href');
        var currency = temp_currency.substring(1,temp_currency.length);
        $('#'+currency).find('table').hide();
        $('#'+currency).find('.div_create_deposit').load('deposit_create.html', function(){$(this).trigger("create")});
        $('#'+currency).find('.div_create_deposit').show();
    });

    //здесь будет запрос на оформление депозита
    $(document).on('touchstart click', '#deposit_create', function(e){
        e.stopPropagation(); e.preventDefault();
        console.log('create');
        $("#result").load('deposit_created_finish.html', function(){$(this).trigger("create")});
        $('#div_main').hide();
        $('#result').show();
    });
    
    //
    createCookie('qwe1', '1111',2);
    alert(getCookie('qwe1'));

    //set
//    window.localStorage.setItem("key", "value");
    //get
//    var value = window.localStorage.getItem("key");
});