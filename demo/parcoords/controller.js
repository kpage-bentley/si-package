var myApp = angular.module('si.package.demo');

myApp.controller('ParcoordsController', ['$scope', '$q', function ($scope, $q) {

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

}]);
