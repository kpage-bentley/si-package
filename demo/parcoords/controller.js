var myApp = angular.module('si.package.demo');

myApp.controller('ParcoordsController', ['$scope', '$q', function ($scope, $q) {

    // Sun Burst
    $scope.settingssun = {
        width: 500,
        height: 500,
        title: 'My Sunburst',
        colors: {
            "Skewed Connections": "#3423F3",
            "Span to Depth Ratio": "#5592EF",
            "Element Weights": "#905E54",
            "Procurement Time": "#529683",
            "Super structure Weight": "#9E40CE",
            "Weight of Beams": "#9E40CE",
        }
    };

    $scope.datasun = [];


    var textData =  "Element Weights-spiPass-Weight of Beams, 60\n"+
                    "Element Weights-spifail-Weight of Beams, 10\n" +
                    "Skewed Connections-spiPass-Connections Affecting Contrustion Cost, 100\n" +
                    "Skewed Connections-spifail-Connections Affecting Contrustion Cost, 0\n" +
                    "Procurement Time-spiPass-Beam Lead Time, 72\n" +
                    "Procurement Time-spiPass-Column Lead Time, 16\n" +
                    "Procurement Time-spiPass-Brace Lead time, 24\n" +
                    "Procurement Time-spifail-Beam Lead Time, 6\n" +
                    "Procurement Time-spifail-Column Lead Time, 12\n" +
                    "Super structure Weight-spiPass-Beam Weight, 36\n" +
                    "Super structure Weight-spiPass-Column Weight, 54\n" +
                    "Super structure Weight-spifail-Beam Weight, 6\n" +
                    "Super structure Weight-spifail-Column Weight, 4"

    var csv = d3.csv.parseRows(textData);
    var json = buildHierarchy(csv);
    $scope.datasun = json;

    // Old Version
    $scope.oldSettings = {
        alpha: 1.0,
        getData: function () {
            var data = [];
            for (var i = 0; i < 250; ++i) {
                data.push({
                    w: Math.random() * 100,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    z: Math.random() * 100
                });
            }
            return $q.when(data);
        },
        hideAxis: ["w"],
        // Not supported in parcoords yet!
        //flipAxis: ["y"],
        showGrid: true,
        brushingEnabled: true,
        color: {
            type: "RANGE",
            axis: "y",
            upper: {
                color: "#bc103211",
                value: 100
            },
            lower: {
                color: "#10bc44FF",
                value: 0
            }
        },
        gridRowColor: function (d) {
            if (d.y > 60) {
                return "rgba(255, 0, 0, 0.1)";
            }
            else {
                return "rgba(0, 255, 0, 0.1)";
            }
        },
        reorderable: true,

        // Used to specify custom columns to show in grid
        // that won't show in parcoords
        customGridColumns: [
            {
                name: 'rounded',
                constructor: function (d) {
                    var canvas = document.createElement('canvas');

                    canvas.style.width = '100px';
                    canvas.style.height = '30px';
                    canvas.height = 30;
                    canvas.width = 100;

                    var ctx = canvas.getContext("2d");
                    ctx.font = "14px Consolas";

                    var text1 = "w = " + Math.round(d.w) + "; x = " + Math.round(d.x);
                    var text2 = "y = " + Math.round(d.y) + "; z = " + Math.round(d.z);

                    ctx.fillText(text1, 0, 10);
                    ctx.fillText(text2, 0, 25);

                    return canvas;
                }
            }
        ]
    };

    // New Version
    $scope.settings = {
        alpha: 1.0,
        brushingEnabled: true,
        colorRange: {
            type: "RANGE",
            axis: "y",
            upper: {
                color: "#bc103211",
                value: 100
            },
            lower: {
                color: "#10bc44FF",
                value: 0
            }
        },
        // Not supported in parcoords yet!
        //flipAxis: ["y"],
        hideAxis: ["w"],
        reorderable: true
    };

    $scope.data = [];
    $scope.selectedIndices = [];

    setTimeout(function () {
        for (var i = 0; i < 250; ++i) {
            $scope.data.push({
                w: Math.random() * 100,
                x: Math.random() * 100,
                y: Math.random() * 100,
                z: Math.random() * 100
            });
            $scope.selectedIndices.push(i);
        }
        $scope.$apply();
    }, 0);

    $scope.innerControl = {};

    $scope.clickSaveScreenshot = function() {
        $scope.innerControl.saveScreenshot();
    };

    // Take a 2-column CSV and transform it into a hierarchical structure suitable
    // for a partition layout. The first column is a sequence of step names, from
    // root to leaf, separated by hyphens. The second column is a count of how 
    // often that sequence occurred.
    function buildHierarchy(csv) {

        var root = { "name": "root", "children": [] };

        for (var i = 0; i < csv.length; i++) {
            var sequence = csv[i][0];
            var size = +csv[i][1];
            if (isNaN(size)) { // e.g. if this is a header row
                continue;
            }
            var parts = sequence.split("-");
            var currentNode = root;
            for (var j = 0; j < parts.length; j++) {
                var children = currentNode["children"];
                var nodeName = parts[j];
                var childNode;
                if (j + 1 < parts.length) {
                    // Not yet at the end of the sequence; move down the tree.
                    var foundChild = false;
                    for (var k = 0; k < children.length; k++) {
                        if (children[k]["name"] == nodeName) {
                            childNode = children[k];
                            foundChild = true;
                            break;
                        }
                    }
                    // If we don't already have a child node for this branch, create it.
                    if (!foundChild) {
                        childNode = { "name": nodeName, "children": [] };
                        children.push(childNode);
                    }
                    currentNode = childNode;
                } else {
                    // Reached the end of the sequence; create a leaf node.
                    childNode = { "name": nodeName, "size": size };
                    children.push(childNode);
                }
            }
        }
        return root;
    };

}]);
