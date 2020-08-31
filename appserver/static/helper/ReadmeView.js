

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

    //Info on https://github.com/showdownjs/showdown/wiki/Add-default-classes-for-each-HTML-element    
    //in our case we use bootstrap default classes, but you can insert custom classes with custom css
    const elementToClassMapping = {
        table: 'table table-bordered'
      }
      
    const customClassBinding = Object.keys(elementToClassMapping)
        .map(key => ({
            type: 'output',
            regex: new RegExp(`<${key}(.*)>`, 'g'),
            replace: `<${key} class="${elementToClassMapping[key]}" $1>`
        }));
      

    var ReadmeView = Backbone.View.extend({
        

        initialize: function(options) {
            this.converter = new showdown.Converter({ 
                          tables: true, 
                          extensions: ['prettify', customClassBinding]
                      });

            this.path = options.path;
            this.baseUrl = "../../../static/app/";
            
            this.getReadMe()
            .done(function( readMeContent ) {
              this.readMeAsHtml = this.converter.makeHtml(readMeContent);
              this.readMeAsHtml = this.readMeAsHtml.replace(/\.\//g, this.baseUrl + this.path + '/');
              PR.prettyPrint();
              this.render();
            }.bind(this));

           // this.render();
        }, 

        render: function() {
            this.$el.empty();
            this.$el.append(this.readMeAsHtml);
            return this;
        }, 

        getReadMe: function() {
            return $.ajax({
                url: this.baseUrl + this.path + "/README.md",
                beforeSend: function( xhr ) {
                  xhr.overrideMimeType( "application/x-www-form-urlencoded;charset=utf-8" );
                }
            });
        }
    });

    return ReadmeView;

});