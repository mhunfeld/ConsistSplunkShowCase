require([
    'jquery',
    'underscore',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    '/static/app/ConsistSplunkShowCase/workflows/selection/selectionRenderer.js',
    '/static/app/ConsistSplunkShowCase/workflows/commentList.js',
    '/static/app/ConsistSplunkShowCase/workflows/kvStoreService.js',
    'splunkjs/mvc/simplexml/ready!'
],
function($, _, mvc, TableView, SelectionRenderer, CommentList, KvStoreService) {
    
    var submittedTokens = mvc.Components.getInstance('submitted');
    var table = mvc.Components.get('table');

    var selectionRenderer = new SelectionRenderer({
        selectedWagonsToken: "selected",
        tableComponent: table
    });

    submittedTokens.on("change:selected", function(lala, selected) {
        if((selected && selected.length > 0)) {
            submittedTokens.set('editSelection', true);
        } else {
            submittedTokens.unset('editSelection');
        }
    });

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

    table.getVisualization(function(tableView) {
        tableView.addCellRenderer(selectionRenderer);
        tableView.addRowExpansionRenderer(commentRenderer);
    });

    var kvStoreService = new KvStoreService({
        app: 'ConsistSplunkShowCase/',
        kvStore: 'user_comments'
    })

    var saveComments = function(event) {

        var comment = $('#comment').val();
        var user = $('#user').val();
        var created = Date.now();

        var selectedItems = submittedTokens.get('selected');

        var comments = selectedItems.map((selected) => {
            return {
                country: selected,
                user: user,
                comment: comment, 
                created: created
            }
        });



        kvStoreService.saveRecordsInBatch(comments)

    };


    $('#save').on('click', saveComments);


    submittedTokens.set("wait_for_js_to_load", " ");


    
});

//@ sourceURL=popup_main.js