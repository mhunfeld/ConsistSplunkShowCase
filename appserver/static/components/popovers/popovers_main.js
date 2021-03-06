require([
        'splunkjs/mvc',
        '/static/app/ConsistSplunkToolbox/components/popovers/popovers.js',
        '/static/app/ConsistSplunkShowCase/helper/ReadmeView.js',
        'splunkjs/mvc/simplexml/ready!'
    ],
    function(mvc, popovers, ReadmeView) {

        popovers.initAll();

        //Unterstützung von Themes muss bei initialisierung in JS manuell implementiert werden.
        //statt content wird ein template übergeben, in dem die css-Klasse für das Theming übergeben werdne könnte.
        $('#popoverInJS').popover({
            title:"See What I Did There?",
            placement:"top",
            trigger:"hover",
            content:"init in JS!!! :) "
        });




    //Unterstützung von Themes muss bei initialisierung in JS manuell implementiert werden.
    //statt content wird ein template übergeben, in dem die css-Klasse für das Theming übergeben werdne könnte.
        var field1 = mvc.Components.get('field1');
        field1.$el.find('label').popover({
            title:"See What I Did There?",
            placement:"top",
            trigger:"hover",
            content:"init in JS! :) "
        }).append('<span class="icon-info-circle info"></span>');


        var readMeView = new ReadmeView({
            path: '/ConsistSplunkToolbox/components/popovers',
            el: '#readme'
        });


    });