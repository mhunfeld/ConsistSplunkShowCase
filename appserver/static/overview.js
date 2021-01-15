require([
    '/static/app/ConsistSplunkShowCase/helper/ReadmeView.js',
    'splunkjs/mvc/simplexml/ready!'
], function( 
        ReadmeView
    ) { 

        var readMeView = new ReadmeView({
            path: 'ConsistSplunkShowCase/',
            filename: 'README.md',
            el: "#readme"
        });

       $('#readme').append(readMeView.render().$el);

       var todoView = new ReadmeView({
            path: 'ConsistSplunkShowCase/',
            filename: 'TODO.md',
            el: "#todos"
        });

        $('#todos').append(todoView.render().$el);
});