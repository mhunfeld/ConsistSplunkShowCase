require([
        'splunkjs/mvc',
        "splunkjs/mvc/tableview",
        '/static/app/ConsistSplunkToolbox/components/popovers/popovers.js',
        'splunkjs/mvc/simplexml/ready!'
    ],
    function(mvc, TableView, popovers, UAParser) {

        popovers.initAll();

        $('#popoverInJS').popover({
            title:"See What I Did There?",
            placement:"top",
            trigger:"hover",
            content:"init in JS!!! :) "
        });

        var field1 = mvc.Components.get('field1');
        field1.$el.find('label').popover({
            title:"See What I Did There?",
            placement:"top",
            trigger:"hover",
            content:"init in JS! :) "
        }).append('<span class="icon-info-circle info"></span>');

    });