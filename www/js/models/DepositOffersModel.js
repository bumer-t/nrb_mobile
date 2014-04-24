"use strict";

app.models.DepositOffers = Backbone.Model.extend({

    initialize:function () {
    },

    sync: function(method, model, options) {
        if (method === "read") {
            app.adapters.DepositOffers.getOffersList().done(function (data) {
                options.success(data);
            });
        }
    },

    getMappedData: function() {
        return remapDepositOffers(this.attributes);
    }

});

//удаляет со списка undefined-элемент
function cleanArray(current_array) {
    var result = new Array();
    for (var i in current_array){
        if (current_array[i] != undefined) {
            result.push(current_array[i]);
        }
    }
    return result;
}

//переворачивает список депозитных ставок(json)
function remapDepositOffers(depositOffers) {
    var depositOffersMapped = {};
    var data_by_currency = depositOffers.tabledata;

    //для сортировки списка по валюте
    var currency_list_order = depositOffers.order;
    var currency_list_dict = {};
    for (var i in currency_list_order){
        currency_list_dict[currency_list_order[i]] = i;
    }

    for (var currency_id in data_by_currency) {
        var deposits = data_by_currency[currency_id].deposits;
        for (var dep_index in deposits) {
            var deposit = deposits[dep_index];
            if (depositOffersMapped[deposit.dep_code] === undefined) {
                depositOffersMapped[deposit.dep_code] = {'currencies':[], 'currencies_count':0};
            }
            var deposit_max_rate = 0;
            for (var term_index in deposit.terms) {
                var term = deposit.terms[term_index];
                if (term.base_rate > deposit_max_rate) {
                    deposit_max_rate = term.base_rate;
                }
            }
            var curency_obj = {
                'curr_id':currency_id,
                'curr_name':data_by_currency[currency_id].curr_name.split(' ')[0].toLocaleLowerCase(),
                'curr_short_name':data_by_currency[currency_id].curr_short_name,
                'deposit_max_rate':deposit_max_rate,
                'terms': deposit.terms
            };
            depositOffersMapped[deposit.dep_code].currencies[currency_list_dict[curency_obj.curr_id]] = curency_obj; //записываем с учетом сортировки по валюте
            depositOffersMapped[deposit.dep_code].currencies_count ++;
            depositOffersMapped[deposit.dep_code].dep_name = deposit.dep_name;
            depositOffersMapped[deposit.dep_code].partial_withdrawsl = deposit.partial_withdrawsl;
            depositOffersMapped[deposit.dep_code].percent_payment = deposit.percent_payment;
            depositOffersMapped[deposit.dep_code].chance_recharge = deposit.chance_recharge;
            depositOffersMapped[deposit.dep_code].dep_code = deposit.dep_code;
        }
    }

    //удаляем undefined после сортировки в валютах
    var order_deposits = depositOffers.order_deposits;
    for (var i in order_deposits) {
        depositOffersMapped[order_deposits[i]].currencies = cleanArray(depositOffersMapped[order_deposits[i]].currencies);
    }
//    console.log(depositOffersMapped);
    return depositOffersMapped;
}
