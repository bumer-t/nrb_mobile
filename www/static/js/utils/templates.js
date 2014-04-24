/**
* Created with PyCharm.
* User: serikov
* Date: 4/4/14
* Time: 5:40 AM
* To change this template use File | Settings | File Templates.
*/
app.utils.templates = (function(){
    var load = function(views, callback) {
        var deferreds = [];

        $.each(views, function(index, view) {
            if (!app.views[view]) {
                alert('View ' + view + ' not found!');
                return;
            }
            deferreds.push($.get('tpl/' + view + '.html', function(data) {
                // fill template properte of view instance
                app.views[view].prototype.template = doT.template(data);
            }, 'html'));

        });
        $.when.apply(null, deferreds).done(callback);
    };

    return {
         load: load
    };
}());

//app.utils.templates = (function(){
//    var load = function(views, callback) {
//        var deferreds = [];
//
//        $.each(views, function(index, view) {
//            if (!app.views[view]) {
//                alert('View ' + view + ' not found!');
//                return;
//            }
//            deferreds.push($.get('tpl/' + view + '.html', function(data) {
//                // fill template properte of view instance
//                app.views[view].prototype.template = doT.template(data);
//            }, 'html'));
//
//        });
//        $.when.apply(null, deferreds).done(callback);
//    };
//
//    return {
//         load: load
//    };
//}());



