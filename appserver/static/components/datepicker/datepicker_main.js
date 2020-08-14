require([
    'underscore',
    'jquery',
    '/static/app/ConsistSplunkToolbox/components/datepicker/datepicker.js',
    '/static/app/ConsistSplunkShowCase/helper/ReadMeView.js',
    '/static/app/ConsistSplunkToolbox/utils/showtokens.js',
    'splunkjs/mvc/simplexml/ready!'
], function( 
        _,
        $,
        Datepicker,
        ReadMeView
    ){


        var singelDatepicker = new Datepicker({
            label: 'Datepicker as Single Date',
            id: 'customSingleDatepicker',
            token: 'customdate_tok',
            default: 'now'
        });
        

        singelDatepicker.render();

        $('#customSingleDatepicker').append(singelDatepicker.el);


        var rangeDatepicker = new Datepicker({
            label: 'Datepicker as Range Picker',
            id: 'customRangeDatepicker',
            token: 'customrangedate_tok',
            asRange: true
        });
        

        rangeDatepicker.render();

        $('#customRangeDatepicker').append(rangeDatepicker.el);


        var extendedDatepicker = new Datepicker({
            label: 'Datepicker with Options',
            id: 'customExtendedDatepicker',
            token: 'customextendeddate_tok',
            asRange: true,
            datepickerOptions: {
                timePicker: true,
                timePickerIncrement: 15,
                timePicker24Hour: true,
            }
        });
        

        extendedDatepicker.render();

        $('#customExtendedDatepicker').append(extendedDatepicker.el);

        var readMeView = new ReadMeView({
            path: '/ConsistSplunkToolbox/components/datepicker'
        });
    
        $('#readme').append(readMeView.render().$el);

    });

    //@ sourceURL=datepicker_main.js