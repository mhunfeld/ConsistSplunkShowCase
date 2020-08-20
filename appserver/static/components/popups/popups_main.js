require([
    'jquery',
    'splunkjs/mvc',
    '/static/app/ConsistSplunkToolbox/components/popups/popups.js',
    'splunkjs/mvc/simplexml/ready!'
],
function($, mvc, Popup) {


    var table = mvc.Components.get('table');

    var popup = new Popup({
        title: "hallo",
        body: table.el
    });

    popup.render();

    $('#dashboard1').append(popup.$el);

    $('#showPopup').on('click', function() {
        popup.show();
    })

});