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

});