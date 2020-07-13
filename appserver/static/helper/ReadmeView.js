

require.config({
    paths: {
        'showdown' : '/static/app/ConsistSplunkShowCase/vendor/showdown',
        'showdown-prettify' : '/static/app/ConsistSplunkShowCase/vendor/showdown-prettify'
    },
    shim: {
        "showdown-prettify": {
            deps: [
                'showdown'
            ]
        }
    }
});


define(['backbone', 
    'showdown',
    '/static/app/ConsistSplunkShowCase/vendor/google-code-prettify/prettify.js',
    'showdown-prettify',
    'css!/static/app/ConsistSplunkShowCase/vendor/google-code-prettify/prettify.css'
], function(Backbone, showdown) {

    var ReadmeView = Backbone.View.extend({
        

        initialize: function(options) {
            this.converter = new showdown.Converter({ 
                          tables: true, 
                          extensions: ['prettify']
                      });

            this.path = options.path;
            this.baseUrl = "../../../static/app/";
        }, 

        render: function() {
            this.$el.empty();

            this.getReadMe()
            .done(function( readMeContent ) {
              readMeAsHtml = this.converter.makeHtml(readMeContent);
              readMeAsHtml = readMeAsHtml.replace(/\.\//g, this.baseUrl + this.path + '/')
              this.$el. append(readMeAsHtml);
              PR.prettyPrint();
            }.bind(this));

            return this;
        }, 

        getReadMe: function() {
            return $.ajax({
                url: this.baseUrl + this.path + "/README.md",
                beforeSend: function( xhr ) {
                  xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                }
            });
        }
    });

    return ReadmeView;

});