/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

class ParcoordsController {

    static $inject = ['$scope', '$q'];
    constructor(private $scope: any, private $q: angular.IQService) {

        $scope.settings = {
            alpha: 0.5,
            getData: () => {
                return $q.when([
                    { w: 1, x: 10, y: 14, z: 10 },
                    { w: 2, x: 12, y: 12, z: 12 },
                    { w: 3, x: 14, y: 10, z: 14 }
                ]);
            },
            hideAxis: ["w"],
            showGrid: true,
            brushingEnabled: true,
            color: (d) => {
                switch (d.y) {
                    case 14:
                        return "green";
                    case 12:
                        return "yellow"
                    case 10:
                        return "red";
                }
            }
        }
    }
}

angular
    .module('si.package.demo')
    .controller('ParcoordsController', ParcoordsController);
