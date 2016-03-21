var si;
(function (si) {
    var package;
    (function (package) {
        var ParcoordsDirective = (function () {
            function ParcoordsDirective($log, $compile) {
                this.$log = $log;
                this.$compile = $compile;
                this.restrict = 'EA';
                this.scope = {
                    settings: '='
                };
                ParcoordsDirective.that = this;
            }
            ParcoordsDirective.prototype.link = function (scope, element, attrs) {
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
                var parcoords = d3.parcoords()(graphElement);
                if (settings.color) {
                    parcoords.color(settings.color);
                }
                parcoords.alpha(0.4);
                settings.getData().then(function (data) {
                    parcoords.data(data);
                    if (settings.hideAxis) {
                        parcoords.hideAxis(settings.hideAxis);
                    }
                    parcoords.render();
                    if (settings.brushingEnabled) {
                        parcoords.brushMode("1D-axes");
                    }
                    if (settings.showGrid) {
                        var gridElement = graphElement.nextElementSibling;
                        var grid = d3.divgrid();
                        var redrawGrid = function (gridData) {
                            d3.select(gridElement)
                                .datum(gridData.slice(0, 50))
                                .call(grid)
                                .selectAll(".row")
                                .on("mouseover", function (d) {
                                parcoords.highlight([d]);
                            })
                                .on("mouseout", parcoords.unhighlight);
                        };
                        redrawGrid(data);
                        parcoords.on("brush", function (d) {
                            redrawGrid(d);
                        });
                    }
                });
            };
            ParcoordsDirective.Factory = function () {
                var directive = function ($log, $compile) {
                    return new ParcoordsDirective($log, $compile);
                };
                directive['$inject'] = ['$log', '$compile'];
                return directive;
            };
            return ParcoordsDirective;
        })();
        angular
            .module('si.widgets')
            .directive('siParcoords', ParcoordsDirective.Factory());
    })(package = si.package || (si.package = {}));
})(si || (si = {}));
