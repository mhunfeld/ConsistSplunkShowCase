require([
    '/static/app/ConsistSplunkToolbox/components/map/requireConfigMap.js'
], function() {
    
    require([
    'underscore',
    'splunkjs/mvc',
    'splunkjs/mvc/searchmanager',
    '/static/app/ConsistSplunkToolbox/components/map/maps.js',
    '/static/app/ConsistSplunkToolbox/components/map/panelView.js',
    '/static/app/ConsistSplunkToolbox/components/map/routeView.js',
    ], function (_, mvc, SearchManager, MapCreator, PanelView, RouteView) { 

        var map = new MapCreator.MapView({
            id: "map"
        });


        var mapPanel = new PanelView({
            id: "map_element",
            el: $("#map"),
            title: "Map"
        }, map);

        var routeView = new RouteView({
            id: 'routes',
            managerid: 'map_search', 
            el: '#map',
            mapView: 'map',
            panel: 'map_element',
            data: 'results',
            routeViewOptions: {
                groupBy: 'track_id', 
                coloredRoutesByPathIdentifier: true,
                pathColorList: [
                    "#006D9C",
                    "#4FA484",
                    "#EC9960",
                    "#AF575A",
                    "#B6C75A",
                    "#62B3B2",
                    "#294E70",
                    "#738795",
                    "#EDD051",
                    "#BD9872","#5A4575","#7EA77B","#708794","#D7C6B7","#339BB2","#55672D","#E6E1AE","#96907F","#87BC65","#CF7E60","#7B5547","#77D6D8","#4A7F2C","#F589AD","#6A2C5D","#AAABAE","#9A7438","#A4D563","#7672A4","#184B81"
                ]
            }
        });

    });
});