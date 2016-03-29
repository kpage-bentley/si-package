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
                color: "#bc1032",
                value: 100
            },
            lower: {
                color: "#10bc44",
                value: 0
            }
        },
        reorderable: true
    };

}]);
