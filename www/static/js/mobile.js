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

function change_hash_url(hash_url) {
    location.hash = hash_url;
}

//
function include_html(celector, template_name) {
    celector.load(template_name+'.html', function(){$(this).trigger("create")});
    change_hash_url(template_name);
    document.addEventListener("backbutton", onBackKeyDown, false);
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
    change_hash_url('auth_otp');
    $('#login_phone').hide();
    $('#login_code').show();
}

function send_otp() {
    if ($('#code').val().length < 1) {
        alert('Не введен otp-пароль');
        return false;
    }
    //success
//    $("#div_my_deposits").load('my_deposits.html', function(){$(this).trigger("create")});
    include_html($("#div_my_deposits"),'my_deposits');
    $('#div_login_forms').hide();
    $('#div_my_deposits').show();
}

function onLoad() {
    $.mobile.phonegapNavigationEnabled = true;
    document.addEventListener("deviceready", onDeviceReady, false);
    console.log('qweqweqwe')
}

// Cordova is loaded and it is now safe to call Cordova methods
//
function onDeviceReady() {
    // Register the event listener
    document.addEventListener("backbutton", onBackKeyDown, false);
}

// Handle the back button
//
function onBackKeyDown() {
    alert(1111);
    alert(location.hash);
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
        include_html($("#div_deposit_info"),'deposit_info');
//        $("#div_deposit_info").load('deposit_info.html', function(){$(this).trigger("create")});
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
        include_html($('#'+currency).find('.div_create_deposit'),'deposit_create');
//        $('#'+currency).find('.div_create_deposit').load('deposit_create.html', function(){$(this).trigger("create")});
        $('#'+currency).find('.div_create_deposit').show();
    });

    //здесь будет запрос на оформление депозита
    $(document).on('touchstart click', '#deposit_create', function(e){
        e.stopPropagation(); e.preventDefault();
        console.log('create');
//        $("#result").load('deposit_created_finish.html', function(){$(this).trigger("create")});
        include_html($("#result"),'deposit_created_finish');
        $('#div_main').hide();
        $('#result').show();
    });

    //set
//    window.localStorage.setItem("key", "value");
    //get
//    var value = window.localStorage.getItem("key");
    change_hash_url('homepage');

    document.addEventListener("backbutton", onBackKeyDown1, false);

    function onBackKeyDown1() {
        alert(222222);
        alert(location.hash);
    }

});