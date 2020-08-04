require([
        '/static/app/ConsistSplunkToolbox/components/popovers/popovers.js',
        'splunkjs/mvc/simplexml/ready!'
    ],
    function(popovers) {

        popovers.initAll();
    })