/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

module si.package {

    import ILogService = angular.ILogService;

    interface ParCoordScope {
        settings: any
    }

    class ParcoordsDirective {
        static that: ParcoordsDirective;

        restrict: string = 'EA';
        scope: ParCoordScope = {
            settings: '='
        };

        constructor(private $log: ILogService, private $compile: any) {
            ParcoordsDirective.that = this;
        }

        public link(scope: ParCoordScope, element: angular.IAugmentedJQuery, attrs: any): void {
            var settings = scope.settings;

            var graphDomElement = angular.element("<div class='parcoords' style='height:200px;'></div>");
            element.append(graphDomElement);
            ParcoordsDirective.that.$compile(graphDomElement)(scope);

            if (settings.showGrid) {
                var gridDomElement = angular.element("<div class='parcoords-grid'></div>");
                element.append(gridDomElement);
                ParcoordsDirective.that.$compile(gridDomElement)(scope);
            }

            var graphElement = element[0].firstElementChild;

            // Keep track of the getData promise
            var getData = settings.getData();

            var setupParcoords = () => {
                (graphElement as HTMLElement).innerHTML = '';
                var parcoords = (d3 as any).parcoords()(graphElement);

                // Set color
                if (settings.color) {
                    parcoords.color(settings.color);
                }

                // Set alpha level of parcoords
                parcoords.alpha(0.4);

                getData.then(data => {
                    parcoords.data(data);

                    // Hide the proper axis
                    if (settings.hideAxis) {
                        parcoords.hideAxis(settings.hideAxis);
                    }

                    // Render
                    parcoords.render();

                    // Enable brushing
                    if (settings.brushingEnabled) {
                        parcoords.brushMode("1D-axes");
                    }

                    // create data table, row hover highlighting
                    if (settings.showGrid) {
                        var gridElement = graphElement.nextElementSibling;

                        var grid = (d3 as any).divgrid();

                        var redrawGrid = (gridData) => {
                            d3.select(gridElement)
                                .datum(gridData.slice(0, 50))
                                .call(grid)
                                .selectAll("tbody tr")
                                .on("mouseover", (d) => {
                                    parcoords.highlight([d]);
                                })
                                .on("mouseout", parcoords.unhighlight);
                        };

                        redrawGrid(data);

                        parcoords.on("brush", (d) => {
                            redrawGrid(d);
                        });
                    }
                });
            };

            // Setup the parcoords object
            setupParcoords();

            // Whenever the window is resized, redraw the parcoords with the same settings
            window.onresize = event => {
                setupParcoords();
            };
        }

        public static Factory() {
            var directive = ($log, $compile) => {
                return new ParcoordsDirective($log, $compile);
            };
            directive['$inject'] = ['$log', '$compile'];

            return directive;
        }
    }

    angular
        .module('si.package', [])
        .directive('siParcoords', ParcoordsDirective.Factory());
}
