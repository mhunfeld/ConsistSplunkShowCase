


require([
    '/static/app/ConsistSplunkToolbox/extensions/multiselect/multiselect.js',
    '/static/app/ConsistSplunkToolbox/extensions/input/input.js',
    '/static/app/ConsistSplunkShowCase/helper/ReadmeView.js',
    '/static/app/ConsistSplunkToolbox/utils/showtokens.js',
    'css!/static/app/ConsistSplunkToolbox/material-iconfont/material-icons.css',
    'splunkjs/mvc/simplexml/ready!'
], function( 
        Multiselect,
        Input,
        ReadmeView
    ) {


        var input1 = new Multiselect('field1');
        input1.smartDefaultValue();

        var input2 = new Multiselect('field2');
        input2.sortable();

        new Multiselect('field3')
            .applyCopyToClipboard()
            .pastable()
            .refreshable();


        var region = new Multiselect('region');
        region.smartDefaultValue();
        region.livesearch({
            baseSearch: 'regionSearch',
        });

        var country = new Multiselect('country');
        country.smartDefaultValue();
        country.livesearch({
            baseSearch: 'countrySearch',
            searchByLabelField: true,
            searchByValueField: true,
            count: 20
        });

       var test = new Input('field9').rememberSelectedValue();


        var readMeView = new ReadmeView({
            path: '/ConsistSplunkToolbox/extensions/multiselect',
            el: "#readme"
        });

       $('#readme').append(readMeView.render().$el);
       
});

//@ sourceURL=inputfields_main.js