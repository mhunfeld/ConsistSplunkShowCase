require([
    '/static/app/ConsistSplunkToolbox/extensions/table/src/table.js',
    '/static/app/ConsistSplunkShowCase/helper/ReadmeView.js',
    'splunkjs/mvc/simplexml/ready!'
], function(Table, ReadmeView) {

    new Table('renameTableHeader')
        .renameHeader('extra long descriptionalble field name', 'field 2')

    new Table('exampleTable')
        .addNumberOfTableRowsToggler('exampleTable_numberOfRowsToken')
        .addColumnChooser({
            inputfieldId: 'exampleFields',
            sortable: true,
            cookieName: 'exampleTableColumns'
        });


    new Table('fixedColumnTable')
        .addNumberOfTableRowsToggler('fixedColumnTable_numberOfRowsToken')
        .addFixedColumns(2);


    var readMeView = new ReadmeView({
        path: '/ConsistSplunkToolbox/extensions/table'
    });

    $('#readme').append(readMeView.render().$el);
});

//@ sourceURL=table_main.js