require([
    'jquery',
    'underscore',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    '/static/app/ConsistSplunkShowCase/workflows/popups/popups.js',
    '/static/app/ConsistSplunkShowCase/workflows/popups/commentList.js',
    '/static/app/ConsistSplunkShowCase/workflows/kvStoreService.js',
    'splunkjs/mvc/simplexml/ready!'
],
function($, _, mvc, TableView, Popup, CommentList, KvStoreService) {
    
    var submittedTokens = mvc.Components.getInstance('submitted');

    var ActionRenderer = TableView.BaseCellRenderer.extend({

        template: function(data) {
            return /*html*/`<i id="addComment" class="icon-speech-bubble icon actions" title="Kommentar zu Eintrag hinterlegen"></i>`;
        },

        canRender: function(cell) {
            return cell.field=='Actions';
        },

        render: function($td, cell) {
                $td.html(this.template());
        }
    });

    var actionRenderer = new ActionRenderer();


    var commentList = new CommentList({
        managerid: "commentSearch",
        output_mode: 'json'
    });

    commentList.render();

    var CommentRenderer = TableView.BaseRowExpansionRenderer.extend({
        canRender: function(rowData) {
            return true;
        },
        setup: function($container, rowData) {
            var countryIndex = _.indexOf(rowData.fields, 'Country');
            var country = rowData.values[countryIndex];
            submittedTokens.set('selectedCountry', country);
            submittedTokens.set('showComments', ' ');

        },
        teardown: function($container, rowData) {
            submittedTokens.unset('showComments');
        },
        render: function($container, rowData) {
            $container.append(commentList.$el);
            return $container;
        }
    });

    var commentRenderer = new CommentRenderer();



    mvc.Components.get('table').getVisualization(function(tableView) {
        tableView.addCellRenderer(actionRenderer);
        tableView.addRowExpansionRenderer(commentRenderer);
        tableView.render();
    });

    var popupForm = mvc.Components.get('content1');

    var kvStoreService = new KvStoreService({
        app: 'ConsistSplunkShowCase/',
        kvStore: 'user_comments'
    })

    var saveComment = function(event) {
        var comment = $('#comment').val();
        var user = $('#user').val();
        var country = $('#country').val();
        var region = $('#region').val();

        kvStoreService.saveRecord({
            comment: comment, 
            user: user,
            country: country,
            region: region, 
            created: Date.now()
        })

    };

    var popup1 = new Popup({
        title: "Popup mit Table",
        body: popupForm.el,
        onSave: saveComment
    });

    popup1.render();

    $('#dashboard1').append(popup1.$el);
    
    $('#table').on('click', '#addComment', function(event) {
        popup1.show();
    });

    submittedTokens.set("wait_for_js_to_load", " ");


    
});

//@ sourceURL=popup_main.js