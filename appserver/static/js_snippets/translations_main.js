require([
    'backbone',
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunk.i18n',
    'splunkjs/mvc/simplexml/ready!'
], function( 
    Backbone,
        _,
        $,
        mvc,
        i18n
    ){
        mvc.setFilter("toI18N", function(inputValue) {
            
            return i18n._("inputValue");
        });


        $('.huhu').text("js_lalala")
});

//@ sourceURL=translations_main.js