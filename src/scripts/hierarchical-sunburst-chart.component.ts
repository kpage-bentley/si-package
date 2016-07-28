/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

interface HierarchicalSunburstChartSettings {
    width ?: number;
    height ?: number;
    title ?: string;
    colors ?: any;
}


class HierarchicalSunburstChartComponent {

    public restrict: string;
    public scope: any;
    public template: string;
    // Dimensions of sunburst.
    private width: number;
    private height: number;
    private colors: any;
    private title: string;

    private radius: number;
    private totalSize: number;
    private vis: any;
    private partition: any;
    private arc: any;
    private label: any;
    private chartelement: any; 
    private static that: HierarchicalSunburstChartComponent;

    constructor() {
        HierarchicalSunburstChartComponent.that = this;
        this.restrict = 'EA';
        this.scope = {
            settings: '=',
            data: '='
        };
        this.template = `<div class="main">
                            <div class="chart">
                                <div class="explanation" style="visibility: hidden;">
                                    <span class="spiname"></span><br />
                                    <span class="percentage"></span><br />
                                </div>
                            </div>
                        </div>`;
    }

    public link(scope: any, element: angular.IAugmentedJQuery, attrs: any): void {
        // Set defaults
        if (typeof scope.settings.height === "undefined") {
            scope.settings.height = 400;
        }
        if (typeof scope.settings.width === "undefined") {
            scope.settings.width = 400;
        }
        if (typeof scope.settings.colors === "undefined") {
            scope.settings.colors = {
                "Skewed Connections": "#3423F3",
                "Span to Depth Ratio": "#5592EF",
                "Element Weights": "#905E54",
                "Procurement Time": "#529683",
                "Super structure Weight": "#9E40CE",
                "spiPass": "#9E40CE",
                "spifail": "#9E40CE",
                "Weight of Beams": "#9E40CE",
            };
        }
        if (typeof scope.data === "undefined") {
            scope.data = [];
        }

        // Whenever the window is resized, redraw the sunburst with the same settings
        let resizeFunction = (event: Event) => {
            HierarchicalSunburstChartComponent.that.renderComponent(element, scope);
        };
        window.addEventListener('resize', resizeFunction);

        HierarchicalSunburstChartComponent.that.renderComponent(element, scope);

        scope.$watch("data", () => {
            HierarchicalSunburstChartComponent.that.renderComponent(element, scope);
        }, true);
        
        scope.$on("$destroy", () => {
            window.removeEventListener('resize', resizeFunction);
        });
    }

    private renderComponent(elementRef: angular.IAugmentedJQuery, scope: any): void {
        let allData = scope.data as any[];
        let settings = scope.settings as HierarchicalSunburstChartSettings;


        this.radius = Math.min(settings.width, settings.height) / 2.5;
        // Total size of all segments; we set this later, after loading the data.
        this.totalSize = 0;
        this.colors = scope.settings.colors;
        this.title = scope.settings.title;

        // Reset element
        let element = elementRef.children()[0] as HTMLElement;
        this.chartelement = element;
        element.innerHTML = this.template;

        this.vis = d3.select(".main").append("svg:svg")
            .attr("width", settings.width)
            .attr("height", settings.height)
            .append("svg:g")
            .attr("id", "container")
            .attr("transform", "translate(" + settings.width / 2 + "," + settings.height / 2 + ")");

        this.partition = (d3 as any).layout.partition() 
            .size([2 * Math.PI, this.radius * this.radius])
            .value(function (d: any) { return d.size; });

        this.arc = d3.svg.arc()
            .startAngle(function (d: any) { return d.x; })
            .endAngle(function (d: any) { return d.x + d.dx; })
            .innerRadius(function (d: any) {
                if (d.depth == 1)
                    return Math.sqrt(d.y) + 20;
                else
                    return (Math.sqrt(d.y + d.dy) - 5);
            })
            .outerRadius(function (d: any) {
                if (d.depth == 1)
                    return Math.sqrt(d.y) + 36;
                else
                    return Math.sqrt(d.y);
            })
            .cornerRadius(5);

       
        // Use d3.text and d3.csv.parseRows so that we do not need to have a header
        // row, and can receive the csv as an array of arrays.
        var self = this; 
        if (allData.length != 0) {
            self.createVisualization(scope.data);
        }
        else {
            d3.select(element).select(".explanation").style("visibility", "");
            d3.select(element).select(".spiname").text("NoData");
                
        }
    }

    // Main function to draw and set up the visualization, once we have the data.
    private createVisualization(json: any) {
        var self = this;
        // Bounding circle underneath the sunburst, to make it easier to detect
        // when the mouse leaves the parent g.
        this.vis.append("svg:circle")
            .attr("r", this.radius)
            .style("opacity", 0);

       
        // For efficiency, filter nodes to keep only those large enough to see.
        var nodes = this.partition.nodes(json)
            .filter(function (d) {
                return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
            });
       
        var path = this.vis.data([json]).selectAll("path")
            .data(nodes)
            .enter().append("g")
            .attr("class", "arc");

        path.append("svg:path")
            .attr("display", function (d) {
                if (d.depth == 1)
                    return d.depth ? null : "none";
                else
                    return "none";
            })
            .attr("d", this.arc)
            .attr("fill-rule", "evenodd")
            .style("fill", function (d) {
                if (d.name != "root") {
                    var test = self.getAncestors(d);
                    return self.shadeColor(self.colors[test[0].name], -8 * test.length);
                }
            })
            .style("opacity", 1)
            .on("mouseover", this.mouseover());

        var s = d3.select(".spiname");
        d3.select(this.chartelement).select(".spiname")
            .text(this.title);
        d3.select(this.chartelement).select(".percentage")
            .text("");
        d3.select(this.chartelement).select(".explanation")
            .style("visibility", "");

        // Add the mouseleave handler to the bounding circle.
        d3.select(this.chartelement).select("#container").on("mouseleave", this.mouseleave());

        // Get total size of the tree = value of root node from partition.
        this.totalSize = path.node().__data__.value;
    };

    //Fade out color 
    private shadeColor(color, percent) {
        var num = parseInt(color.slice(1), 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    // Fade all but the current sequence, and show it in the breadcrumb trail.
    private mouseover(): (d, i) => void {
        return (d, i) => {
            var self = this;
            var percentage = (100 * d.value / this.totalSize).toPrecision(3);
            var percentageString = percentage + "%";
            if (percentage < '0.1') {
                percentageString = "< 0.1%";
            }

            d3.select(".spiname")
                .text(d.name);
            d3.select(".percentage")
                .text(percentageString);
            d3.select(".explanation")
                .style("visibility", "");

            var sequenceArray = self.getAncestors(d);
            // Fade all the segments.
            this.vis.selectAll("path")
                .style("opacity", 0.3);

            // enable children segments.
            this.vis.selectAll("path")
                .filter(function (node) {
                    if (d.children != undefined)
                        return (d.children.indexOf(node) >= 0);
                })
                .attr("display", null);

            // Then highlight only those that are an ancestor of the current segment.
            this.vis.selectAll("path")
                .filter(function (node) {
                    return (sequenceArray.indexOf(node) >= 0);
                })
                .style("opacity", 1); 
        }
    }

    // Restore everything to full opacity when moving off the visualization.
    private mouseleave(): (d, i) => void {
        return (d, i) => {
            var self = this;
            // Deactivate all segments during transition.
            this.vis.selectAll("path").on("mouseover", null);

            // Transition each segment to full opacity and then reactivate it.
            this.vis.selectAll("path")
                .transition()
                .duration(1000)
                .style("opacity", 1)
                .attr("display", function (d) {
                    if (d.depth == 1)
                        return d.depth ? null : "none";
                    else
                        return "none";
                })
                .each("end", function () {
                    d3.select(this).on("mouseover", self.mouseover());
                });

            d3.select(".spiname")
                .text(this.title);
            d3.select(".percentage")
                .text("");
        }
    }

    // Given a node in a partition layout, return an array of all of its ancestor
    // nodes, highest first, but excluding the root.
    private getAncestors(node) {
        var path = [];
        var current = node;
        while (current.parent) {
            path.unshift(current);
            current = current.parent;
        }
        return path;
    }
    
    public static Factory() {
        var directive = () => {
            return new HierarchicalSunburstChartComponent();
        };
        return directive;
    }

}
angular
    .module('si.package',[])
    .directive('hierarchicalSunburstChart', HierarchicalSunburstChartComponent.Factory());