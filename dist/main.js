d3.divgrid = function (config) {
    var columns = [];
    var dg = function (selection) {
        if (columns.length == 0)
            columns = d3.keys(selection.data()[0][0]);
        selection.selectAll("table")
            .data([true])
            .enter().append("table")
            .attr("class", "table table-hover");
        var table = selection.select("table")
            .selectAll("thead")
            .data([true])
            .enter().append("thead")
            .selectAll("tr")
            .data([true])
            .enter().append("tr")
            .selectAll("th")
            .data(columns)
            .enter().append("th")
            .text(function (d) {
            return d;
        });
        selection.select("table")
            .selectAll("tbody")
            .data([true])
            .enter().append("tbody");
        var tbody = selection.select("tbody");
        var rows = tbody.selectAll("tr")
            .data(function (d) {
            return d;
        });
        rows.enter().append("tr");
        rows.exit().remove();
        var cells = rows.selectAll("td")
            .data(function (d) {
            return columns.map(function (col) {
                return d[col];
            });
        });
        cells.enter().append("td");
        cells.text(function (d) {
            return d;
        });
        cells.exit().remove();
        return dg;
    };
    dg.columns = function (_) {
        if (!arguments.length)
            return columns;
        columns = _;
        return this;
    };
    return dg;
};
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
                    var gridDomElement = angular.element("<div class='parcoords-grid'></div>");
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
                                .selectAll("tbody tr")
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
            .module('si.package', [])
            .directive('siParcoords', ParcoordsDirective.Factory());
    })(package = si.package || (si.package = {}));
})(si || (si = {}));
