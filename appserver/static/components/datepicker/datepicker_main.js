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


        var datepicker = new Datepicker({
            id: 'customDatepicker',
            token: 'customdate_tok'
        });
        

        datepicker.render();

        $('#customDatepicker').append(datepicker.el);


    });

    //@ sourceURL=datepicker_main.js