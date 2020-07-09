require([
    'underscore',
    'jquery',
    '/static/app/ConsistSplunkToolbox/components/datepicker/datepicker.js',
    '/static/app/ConsistSplunkToolbox/utils/showtokens.js',
    'splunkjs/mvc/simplexml/ready!'
], function( 
        _,
        $,
        Datepicker
    ){


        var singelDatepicker = new Datepicker({
            id: 'customSingleDatepicker',
            token: 'customdate_tok',
            default: 'now'
        });
        

        singelDatepicker.render();

        $('#customSingleDatepicker').append(singelDatepicker.el);


        var rangeDatepicker = new Datepicker({
            id: 'customRangeDatepicker',
            token: 'customrangedate_tok',
            asRange: true
        });
        

        rangeDatepicker.render();

        $('#customRangeDatepicker').append(rangeDatepicker.el);



    });

    //@ sourceURL=datepicker_main.js