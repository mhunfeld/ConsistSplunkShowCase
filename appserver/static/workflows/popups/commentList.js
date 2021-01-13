define([
    'underscore', 
    'backbone',
    'moment',
    'splunkjs/mvc',
    'splunkjs/mvc/simplesplunkview',
    'css!./commentList.css'
], function(_, Backbone, moment, mvc, SimpleSplunkView) {

    var defaultTokens = mvc.Components.getInstance('default');

    const linebreak2br = function(input) {
        return input.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }

    var CommentListView = SimpleSplunkView.extend({

        tagName: 'div',

        className: 'commentList',

        options: {
            data: "results",  // The data results model from a search
        },
        
        output_mode: "json",

        createView: function() {
            // TODO: Create a visualization
            return this;
        },

        commentTemplate: function(comment) {
            return /*html*/`
            <li class="comment">
                <div class="content">${linebreak2br(comment.comment)}</div>
                <div class="metadata">
                    <span class="user">${comment.user}</span>
                    <span class="created">${moment(parseInt(comment.created)).format('DD.MM.YYYY hh:mm')}</span>
                </div>
            </li>`
        },

        listTemplate: function(comments) {
            return /*html*/`
            <ul class="comments">
              ${comments.map((comment) => {
                  return this.commentTemplate(comment);
              }).join('')}
            </ul>`
        },


        updateView: function(viz, data) {
            this.$el.empty();
            this.$el.append(this.listTemplate(data));
        }
    });

    
    

    return CommentListView;

});