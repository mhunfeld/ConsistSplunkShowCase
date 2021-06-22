require([
    'underscore',
    'jquery',
    '/static/app/ConsistSplunkToolbox/components/datepicker/datepicker.js',
    '/static/app/ConsistSplunkShowCase/helper/ReadmeView.js',
    '/static/app/ConsistSplunkToolbox/utils/showtokens.js',
    'splunkjs/mvc/simplexml/ready!'
], function( 
        _,
        $,
        Datepicker,
        ReadmeView
    ){


        var singelDatepicker = new Datepicker({
            label: 'Datepicker as Single Date',
            id: 'customSingleDatepicker',
            token: 'customdate_tok',
            default: 'now',
            el: '#customSingleDatepicker'
        });


        var rangeDatepicker = new Datepicker({
            label: 'Datepicker as Range Picker',
            id: 'customRangeDatepicker',
            token: 'customrangedate_tok',
            asRange: true, 
            el: '#customRangeDatepicker'
        });

        var rangeDatepicker = new Datepicker({
            label: 'Datepicker as Range Picker and intermediate search',
            id: 'customRangeDatepickerIntermediate',
            token: 'customrangedateIntermediate_tok',
            asRange: true, 
            searchWhenChange: true,
            el: '#customRangeDatepickerIntermediate'
        });


        var extendedDatepicker = new Datepicker({
            label: 'Datepicker with Options',
            id: 'customExtendedDatepicker',
            token: 'customextendeddate_tok',
            asRange: true,
            el: '#customExtendedDatepicker',
            datepickerOptions: {
                timePicker: true,
                timePickerIncrement: 15,
                timePicker24Hour: true,
            }
        });
        

        var readMeView = new ReadmeView({
            path: '/ConsistSplunkToolbox/components/datepicker',
            el: '#readme'
        });

    });

    //@ sourceURL=datepicker_main.js