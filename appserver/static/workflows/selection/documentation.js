require([
    '/static/app/ConsistSplunkShowCase/helper/ReadmeView.js',
    'splunkjs/mvc/simplexml/ready!'
], function( 
        ReadmeView
    ) { 

        var readMeView = new ReadmeView({
            path: 'ConsistSplunkShowCase/workflows/selection/',
            filename: 'README.md',
            el: "#readme"
        });

       $('#readme').append(readMeView.render().$el);
});