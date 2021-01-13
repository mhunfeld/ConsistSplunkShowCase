define([
    'underscore', 
    'backbone',
    'splunkjs/mvc',
    'css!./popups.css'
], function(_, Backbone, mvc) {

    var defaultTokens = mvc.Components.getInstance('default');

    var PopupView = Backbone.View.extend({

        tagName: 'div',

        className: 'modal fade hide',

        template: function(title, body) {
            return /*html*/`
            <div class="modal-header">
                <button aria-label="Schließen" type="button" class="close close-button">×</button>
                <h3 class="modal-title">${title}</h3>
            </div>
            <div class="modal-body">
                ${typeof body === 'object' ? "" : body }
            </div>
            <div class="modal-footer">
                <div class="btn-group" role="group">
                    <button id="close" class="close-button btn btn-secondary modal-btn-secondary pull-left">Abbrechen</button>
                    <button id="save" class="save-button btn btn-primary modal-btn-primary pull-right">Speichern</button>
                </div>
            </div>`
        },
                
        initialize: function(options) {
            this.options = options;

            this.title = options.title || "";
            this.body = options.body || "";
            this.onSave = options.onSave || function() {console.warn("Not Implemented!")};
        },

        setTitle: function(title) {
            this.title = title;
        },

        setBody: function(body) {
            this.body = body;
        },
        
        events: {
            'click .close-button': 'close',
            'click .save-button': 'save'
        },
        
        show: function() {
            this.render();
            this.$el.modal('show');
        },

        save: function() {
            if(this.onSave && _.isFunction(this.onSave)) {
                this.onSave();
            }
            this.$el.modal('hide');
        },

        close: function() {
            // defaultTokens.unset(this.options.showHideToken);
            this.$el.modal('hide');
        },

        render: function() {
            this.$el.empty();
            this.$el.append(this.template(this.title, this.body));
            if(typeof this.title  === 'object') {
                this.$el.find('.modal-title').append(this.title);
            }

            if(typeof this.body  === 'object') {
                this.$el.find('.modal-body').append(this.body);
            }

            this.$el.data('backdrop', false);
        }
    });

    
    

    return PopupView;

});