
require([
    '/static/app/ConsistSplunkShowCase/css_snippets/js/panelView.js',
    "splunkjs/mvc",
    "splunkjs/mvc/singleview",
    'splunkjs/mvc/visualizationregistry',
    "splunkjs/ready!"
], function(PanelView, mvc, SingleView, VisualizationRegistry) { 
    

    // var gesamtkostenSingleView = new SingleView({
    //     id: "gesamtkosten_SingleView",
    //     managerid: "gesamtkosten_search",
    //     underLabel: "seit letzten Monat",
    //     colorBy: 'trend',
    //     useColors: 1,
    //     unit: 'GB', 
    //     trendInterval: '-1h',
    //     trendDisplayMode: 'absolute'
    // });

    // var gesamtkostenPanel = new PanelView({
    //     id: "gesamtkosten_html_panel",
    //     el: $("#gesamtkosten_html_panel"),
    //     title: "Gesamtkosten im Monat"
    // }, gesamtkostenSingleView);
    // //gesamtkostenPanel.render();


    // var SemiDonutViz = VisualizationRegistry.getVisualizer('semicircle_donut', 'semicircle_donut');

    // var kostenAufteilungPieChart = new SemiDonutViz({
    //     id: 'kostenaufteilung_PieChart',
    //     managerid: 'kostenaufteilung_search',
    //     height: '250px',
    //     //el: $('#kostenaufteilung_html_panel'),
    // });

    // kostenAufteilungPieChart.settings.set({
    //     'semicircle_donut.semicircle_donut.colorField': 'color',
    //     'semicircle_donut.semicircle_donut.cutoutPercentage': 75,
    //     'semicircle_donut.semicircle_donut.legendPosition': 'right',
    //     'semicircle_donut.semicircle_donut.type': 'full'
    // });

    // //kostenAufteilungPieChart.render();

    // var kostenaufteilungPanel = new PanelView({
    //     id: "kostenaufteilung_html_panel",
    //     el: $("#kostenaufteilung_html_panel"),
    //     title: "Kostenaufteilung"
    // }, kostenAufteilungPieChart);


    // // <option name="semicircle_donut.semicircle_donut.colorField">color</option>
    // //     <option name="semicircle_donut.semicircle_donut.cutoutPercentage">75</option>
    // //     <option name="semicircle_donut.semicircle_donut.legendPosition">right</option>
    // //     <option name="semicircle_donut.semicircle_donut.type">full</option>

    // var gesamtdatenverbrauchSingleView = new SingleView({
    //     id: "gesamtdatenverbrauch_SingleView",
    //     managerid: "gesamtverbrauch_search",
    //     underLabel: "seit letzten Monat",
    //     colorBy: 'trend',
    //     useColors: 1,
    //     unit: 'GB', 
    //     height: '250px',
    //     trendInterval: '-1h',
    //     trendDisplayMode: 'absolute'
    // });

    // var gesamtdatenverbrauchPanel = new PanelView({
    //     id: "gesamtdatenverbrauch_html_panel",
    //     el: $("#gesamtdatenverbrauch_html_panel"),
    //     title: "Gesamtdatenverbrauch"
    // }, gesamtdatenverbrauchSingleView);


    // <option name="colorBy">trend</option>
    // <option name="drilldown">none</option>
    // <option name="rangeColors">["0x53a051","0x0877a6","0xf8be34","0xf1813f","0xdc4e41"]</option>
    // <option name="trendDisplayMode">absolute</option>
    // <option name="trendInterval">-1h</option>
    // <option name="underLabel">seit letzten Monat</option>
    // <option name="unit">GB</option>
    // <option name="useColors">1</option>
});