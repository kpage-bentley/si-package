/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

class ParcoordsController {

    static $inject = ['$scope', '$q'];
    constructor(private $scope: any, private $q: angular.IQService) {

        $scope.settings = {
            alpha: 1.0,
            getData: () => {
                return $q.when([
                    { w: 1, x: 10, y: 14, z: 10 },
                    { w: 2, x: 12, y: 12, z: 12 },
                    { w: 3, x: 14, y: 10, z: 14 }
                ]);
            },
            hideAxis: ["w"],
            // Not supported in parcoords yet!
            //flipAxis: ["y"],
            showGrid: true,
            brushingEnabled: true,
            color:  {
                type: "RANGE",
                axis: "y",
                upper: {
                    color: "#00FF00",
                    value: 14
                },
                lower: {
                    color: "#FF0000",
                    value: 10
                }
            },
            reorderable: true
        }
    }
}

angular
    .module('si.package.demo')
    .controller('ParcoordsController', ParcoordsController);
