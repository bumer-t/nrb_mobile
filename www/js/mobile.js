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
    };
};

$(function(){
    //вкладки на главной - % и мои ставки
//    var prevSelection = "tab1";
//    $("#navbar ul li").on('click', function() {
//        var newSelection = $(this).children("a").attr("data-tab-class");
//        $("."+prevSelection).addClass("ui-screen-hidden");
//        $("."+newSelection).removeClass("ui-screen-hidden");
//        prevSelection = newSelection;
//    });

    //для поля-телефон - фиксируем код страны
    var phone_code = getPhoneCode();
    $('#phone_number').attr("placeholder", phone_code);
    $('#phone_number').attr("value", phone_code);
    //ввод только цифер
    $('#phone_number').numeric();

    $('.height_center').each(function() {
        var heightHeader = Math.round($(this).parent().height() / 2);
        $(this).css('padding-top', heightHeader - Math.round($(this).children().height() / 2));
    });



    $('#but_auth').on('touchstart', function(e){
        e.stopPropagation(); e.preventDefault();
        alert('qqq');

    });


});