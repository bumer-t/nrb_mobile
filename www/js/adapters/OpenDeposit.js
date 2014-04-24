/**
 * Created with PyCharm.
 * User: serikov
 * Date: 4/23/14
 * Time: 3:23 PM
 * To change this template use File | Settings | File Templates.
 */

app.OpenDeposit = (function(){
    var URL_CREATE = app.config.API_URL + '/deposits/create';
    var URL_CHECK  = app.config.API_URL + '/deposits/checkopendeposit';

    var create = function(params)  {
        console.log('createDeposit');
        console.log(params);
        var result = {'result':false, title:'', text:''};
        loaderWorker($('#deposit_create'), true);
        $.ajax({
            type : 'POST',
            url : app.config.API_URL + '/deposits/create',
            dataType : 'json',
            data : params,
            timeout : 30000,
            success : function(response) {
                console.log('response');
                console.log(response);
                check(params);
            },
            error : function(data) {
                loaderWorker($('#deposit_create'), false);
                console.log(data);
                data = $.parseJSON(data.responseText);
                alert(data.user.message);
            }
        });
        return result;
    };

    var check = function(params, requestCounter)  {
        requestCounter = requestCounter||0;
        params['rand'] =  Math.random();
        console.log('params-check');
        console.log(params);
        $.ajax({
            type: 'GET',
            url: app.config.API_URL + '/deposits/checkopendeposit',
            dataType: 'json',
            data: params,
            timeout: 30000,
            success: function(data){
                console.log(data);
                var delay = parseInt(data['delay']);
                var times = parseInt(data['times']);
                if (data['isChecked'] != '1') {
                    if (requestCounter>times) {
                        alert('Извините, произошел технический сбой. Пожалуйста, повторите запрос позже.');
                        loaderWorker($('#deposit_create'), false);
                        return;
                    }
                    setTimeout(function() {
                        check(params, requestCounter+1);
                    }, 1000*delay);
                    return;
                }
                if (data['isSuccess'] == '1') {
                    loaderWorker($('#deposit_create'), false);
                    new app.routers.AppRouter().navigate('deposit/result/'+params.type_deposit+'/'+params.currency+'/'+params.type_id+'/'+params.dep_sum, true);
                } else {
                    loaderWorker($('#deposit_create'), false);
                    alert(data.title);
                }
            },
            error : function(data) {
                loaderWorker($('#deposit_create'), false);
                console.log(data);
                data = $.parseJSON(data.responseText);
                alert(data.user.message);
            }
        });
    };
    return {
        create: create,
        check: check
    };
}());
