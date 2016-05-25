var myApp = angular.module('si.package.demo');

myApp.controller('ParcoordsController', ['$scope', '$q', function ($scope, $q) {

    $scope.settings = {
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
                    canvas.style.height = '100px';
                    canvas.height = 100;
                    canvas.width = 100;

                    var ctx = canvas.getContext("2d");
                    ctx.font = "14px Open Sans";

                    ctx.fillText("w = " + Math.round(d.w), 10, 20);
                    ctx.fillText("x = " + Math.round(d.x), 10, 40);
                    ctx.fillText("y = " + Math.round(d.y), 10, 60);
                    ctx.fillText("z = " + Math.round(d.z), 10, 80);

                    return canvas;
                }
            }
        ]
    };

}]);
