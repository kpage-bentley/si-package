/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="./parcoords.helper.ts" />

interface ParcoordScope {
    settings: any
}

class ParcoordDirective {

    restrict: string;
    scope: ParcoordScope;
    template: string;

    constructor() {
        this.restrict = 'EA';
        this.scope = {
            settings: '='
        };
        this.template = ParcoordsHelper.template;
    }

    public link(scope: ParcoordScope, element: angular.IAugmentedJQuery, attrs: any): void {
        var settings = scope.settings;

        var graphElement = element[0].firstElementChild as HTMLElement;

        // Keep track of the getData promise
        var getData = settings.getData();

        // Setup the parcoords object
        ParcoordsHelper.setup(graphElement, settings, getData);

        // Whenever the window is resized, redraw the parcoords with the same settings
        window.onresize = event => {
            ParcoordsHelper.setup(graphElement, settings, getData);
        };
    }

    public static Factory() {
        var directive = () => {
            return new ParcoordDirective();
        };
        return directive;
    }
}

angular
    .module('si.package')
    .directive('siParcoords', ParcoordDirective.Factory());