/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/d3/d3.d.ts" />

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
                var gridDomElement = angular.element("<div class='parcoords-grid' align='center'></div>");
                element.append(gridDomElement);
                ParcoordsDirective.that.$compile(gridDomElement)(scope);
            }

            var graphElement = element[0].firstElementChild;

            var parcoords = (d3 as any).parcoords()(graphElement);

            // Set color
            if (settings.color) {
                parcoords.color(settings.color);
            }

            // Set alpha level of parcoords
            parcoords.alpha(0.4);

            settings.getData().then(data => {

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
                            .selectAll(".row")
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

            }); // End of getData scope

            /*
            // Appends blue line
            var svgWidth = parseInt(d3.select('svg').style("width"));
            var svgHeight = parseInt(d3.select('svg').style("height"));
            var siStructure: any = d3.select('svg');

            siStructure.append("polyline")
                .attr({
                    points:[
                        0.072 * svgWidth,
                        0.125 * svgHeight,

                        0.0709 * svgWidth + 0.14343 * svgWidth,
                        svgHeight * 0.75,

                        0.0709 * svgWidth + 0.143 * svgWidth * 2,
                        svgHeight * 0.75,

                        0.0709 * svgWidth + 0.143 * svgWidth * 3,
                        svgHeight * 0.75,

                        0.0709 * svgWidth + 0.143 * svgWidth * 4,
                        svgHeight * 0.65,

                        0.0709 * svgWidth + 0.143 * svgWidth * 5,
                        svgHeight * 0.48,

                        0.0709 * svgWidth + 0.143 * svgWidth * 6,
                        svgHeight * 0.465
                    ],
                    stroke:"#4bacdd",
                    "stroke-width": svgHeight * 0.03,
                    fill:"none",
                    "stroke-linecap":"round",
                    opacity:0.7
                })
                .classed("sipoly", true);

            var sipoly: any = $('.sipoly');
            sipoly.tipsy({
                gravity: 'e',
                html: true,
                title: function() {
                    return ' <br>Lakeshore Medical Center<br>Moment Frame<br>Gravity members = 4.4psf<br>Lateral System = 2.5psf<br>Steel Weight = 6.9psf<br>Overall Performace = 75%<br>Safety Rating = 7<br>Construction Time = 26 months<br> ';
                }
            });*/
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
        .module('si.widgets')
        .directive('siParcoords', ParcoordsDirective.Factory());
}
