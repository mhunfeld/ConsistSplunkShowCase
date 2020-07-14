require([
    'underscore',
    'jquery',
    '/static/app/ConsistSplunkToolbox/components/range-slider/rangeSlider.js',
    '/static/app/ConsistSplunkShowCase/helper/ReadMeView.js',
    '/static/app/ConsistSplunkShowCase/components/range-slider/rangeSlideWebcomponent.js',
    '/static/app/ConsistSplunkToolbox/utils/showtokens.js',
    'splunkjs/mvc/simplexml/ready!'
], function( 
        _,
        $,
        RangeSlider,
        ReadMeView
    ){


        var testSlider = new RangeSlider({
            label: 'Slider as Backbone View',
            min: 0,
            max: 96,
            defaultValue: 24,
            step:   12,
            id: 'my-range-slider',
            token: 'slider_tok',
            prefix: '-@',
            suffix: '$timeUnit$',
            labelPrefix: 'letzte ',
            labelSuffix: '$labelSuffix$'
        }, {tokens: true});

        testSlider.render();

        $('#customFieldset .fieldset').append(testSlider.el);

        var readMeView = new ReadMeView({
            path: '/ConsistSplunkToolbox/components/range-slider'
        });
    
        $('#readme').append(readMeView.render().$el);
    });

    //@ sourceURL=timerangeslider_main.js