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
            labelSuffix: '$labelSuffix$'
        }, {tokens: true});

        timeSlider.render();

        $('#customFieldset .fieldset').append(timeSlider.el);


        var simpleSlider = new RangeSlider({
            label: 'Slider as simple range slider',
            min: 0,
            max: 64,
            id: 'my-range-slider',
            token: 'slider_tok',
            labelSuffix: 'Einträge'
        }, {tokens: true});

        simpleSlider.render();

        $('#customFieldset .fieldset').append(simpleSlider.el);




        var readMeView = new ReadmeView({
            path: '/ConsistSplunkToolbox/components/range-slider'
        });
    
        $('#readme').append(readMeView.render().$el);
    });

    //@ sourceURL=timerangeslider_main.js