require([
    'jquery',
    'splunkjs/mvc',
    '/static/app/ConsistSplunkToolbox/components/popups/popups.js',
    'splunkjs/mvc/simplexml/ready!'
],
function($, mvc, Popup) {


    var table = mvc.Components.get('table');

    var popup1 = new Popup({
        title: "Popup mit Table",
        body: table.el
    });

    popup1.render();

    $('#dashboard1').append(popup1.$el);

    //Button zum Anzeigen des Popups
    $('#showPopup1').on('click', function() {
        popup1.show();
    });


    var popupContent = mvc.Components.get('popupTemplate');

    var popup2 = new Popup({
        title: "Popup mit HTML-Template in SimpleXML und dynamischen Tokens",
        body: popupContent.el
    });

    popup2.render();

    $('#dashboard1').append(popup2.$el);

    //Button zum Anzeigen des Popups
    $('#showPopup2').on('click', function() {
        popup2.show();
    });

});