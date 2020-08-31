require([
    'underscore',
    'jquery',
    '/static/app/ConsistSplunkToolbox/components/range-slider/rangeSlider.js',
    '/static/app/ConsistSplunkShowCase/helper/ReadmeView.js',
    '/static/app/ConsistSplunkToolbox/utils/showtokens.js',
    'splunkjs/mvc/simplexml/ready!'
], function( 
        _,
        $,
        RangeSlider,
        ReadmeView
    ){


        var timeSlider = new RangeSlider({
            label: 'Slider as time picker',
            min: 0,
            max: 96,
            defaultValue: 24,
            step:   12,
            id: 'my-time-range-slider',
            token: 'timeslider_tok',
            prefix: '-@',
            suffix: '$timeUnit$',
            labelPrefix: 'letzte ',
            labelSuffix: '$labelSuffix$',
            el: '#timeRangeSlider'
        }, {tokens: true});


        var simpleSlider = new RangeSlider({
            label: 'Slider as simple range slider',
            min: 0,
            max: 64,
            id: 'my-range-slider',
            token: 'slider_tok',
            labelSuffix: 'Einträge',
            el: '#rangeSlider'
        }, {tokens: true});

        var readMeView = new ReadmeView({
            path: '/ConsistSplunkToolbox/components/range-slider',
            el: '#readme'
        });
    });

    //@ sourceURL=timerangeslider_main.js