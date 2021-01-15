require([
    'jquery',
    'splunkjs/mvc',
    '/static/app/ConsistSplunkShowCase/dashboards/workshop/tableCellRenderer.js',
    '/static/app/ConsistSplunkShowCase/dashboards/workshop/tableRowExpansion.js',
    '/static/app/ConsistSplunkToolbox/components/popovers/popovers.js',
    '/static/app/ConsistSplunkToolbox/components/datepicker/datepicker.js',
    '/static/app/ConsistSplunkToolbox/extensions/multiselect/multiselect.js',
    'css!/static/app/ConsistSplunkShowCase/dashboards/workshop/main.css',
    'css!/static/app/ConsistSplunkShowCase/dashboards/workshop/tables.css',
    'splunkjs/mvc/simplexml/ready!'
], function($, mvc, UserAgentTableCellRenderer, EventSearchBasedRowExpansionRenderer, popovers, Datepicker, Multiselect) {

    new Multiselect('region')
        .smartDefaultValue()
        .livesearch( {
            baseSearch: 'regionSearch',
            searchByLabelField: true,
            searchByValueField: true,
            count: 15
        });

    new Multiselect('country')
        .smartDefaultValue()
        .livesearch( {
            baseSearch: 'countrySearch',
            searchByLabelField: true,
            searchByValueField: true,
            count: 15
        });

    var rangeDatepicker = new Datepicker({
        label: 'Zeitraum',
        id: 'customRangeDatepicker',
        token: 'time',
        asRange: true,
    });

    $('#fieldset1').prepend(rangeDatepicker.$el)

        
    var table = mvc.Components.get('accessByUser_table');
    table.getVisualization(function(tableView) {
        var userAgentRenderer = new UserAgentTableCellRenderer();
        tableView.addCellRenderer(userAgentRenderer);

        //da popovers in tabellen erst nach dem rendern initialisiert werden können, 
        //müssen wir eine gesonderte Funktion aufrufen, die bei jedem Rendern der Tabelle aufgerufen wird
        popovers.initInTableCellRenderer('accessByUser_table');
        
        tableView.render();
    });


    var tableElement = mvc.Components.getInstance("logEntriesBySourcetype_table");
    tableElement.getVisualization(function(tableView) {
        // Add custom cell renderer, the table will re-render automatically.
        tableView.addRowExpansionRenderer(new EventSearchBasedRowExpansionRenderer());
    });



});

//@ sourceURL=main.js