/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="./parcoords.helper.ts" />

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

                /// Set color
                if (settings.color.type === "RANGE") {

                    var lower = {
                        color: settings.color.lower.color,
                        alpha: 1.0
                    };
                    var upper = {
                        color: settings.color.upper.color,
                        alpha: 1.0
                    };

                    // Set default colors
                    if (lower.color === undefined)
                        lower.color = "#de1c22";
                    if (upper.color === undefined)
                        upper.color = "#acdd4b";

                    // Lower includes the alpha channel
                    if ((lower.color.length - 1) % 4 === 0) {
                        var alphaLength = (lower.color.length - 1) / 4;

                        var color = lower.color.slice(0, -alphaLength);
                        var alphaString = lower.color.substr(lower.color.length - alphaLength);
                        var alpha = parseInt(alphaString, 16) / 255;

                        lower.color = color;
                        lower.alpha = alpha;
                    }

                    // Upper includes the alpha channel
                    if ((upper.color.length - 1) % 4 === 0) {
                        var alphaLength = (upper.color.length - 1) / 4;

                        var color = upper.color.slice(0, -alphaLength);
                        var alphaString = upper.color.substr(upper.color.length - alphaLength);
                        var alpha = parseInt(alphaString, 16) / 255;

                        upper.color = color;
                        upper.alpha = alpha;
                    }

                    var domain = [settings.color.lower.value, settings.color.upper.value];
                    var range = [lower, upper];

                    var colorRange = (d3 as any).scale.linear()
                        .domain(domain)
                        .range(range);

                    var colorFunction = (d) => {
                        var index = d[settings.color.axis];

                        var colorValue = colorRange(index);

                        var rgb = ParcoordsHelper.hexToRgb(colorValue.color);
                        var rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + colorValue.alpha + ")";
                        return rgba;
                    };
                    parcoords.color(colorFunction);
                }
                // Function passed as color
                else if (typeof settings.color === "function") {
                    parcoords.color(settings.color);
                }

                // Set alpha level of parcoords
                if (settings.alpha === undefined) {
                    parcoords.alpha(0.4);
                }
                else {
                    parcoords.alpha(settings.alpha);
                }

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
                        var grid = ParcoordsHelper.create(parcoords, gridElement, data, settings.customGridColumns);

                        parcoords.on("brush", (d) => {
                            grid.brush(d);
                        });
                    }

                    // Set reorderable
                    if (settings.reorderable === true) {
                        parcoords.reorderable();
                    }

                    // Flip axis
                    if (settings.flipAxis && settings.flipAxis.length) {
                        parcoords.flipAxis(settings.flipAxis);
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
