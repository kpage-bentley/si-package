/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />

interface ParallelCoordsChartSettings {
    alpha?: number;
    brushingEnabled?: boolean;
    colorFunction?: (d: any) => string;
    colorRange?: ColorRange;
    flipAxis?: string[];
    hideAxis?: string[];
    reorderable?: boolean;
}

interface ColorRange {
    axis: string;
    upper: ColorRangeLimit;
    lower: ColorRangeLimit;
}
interface ColorRangeLimit {
    color?: string;
    value: number;
}

class ParallelCoordsChartComponent {

    public restrict: string;
    public scope: any;
    public template: string;

    private static that: ParallelCoordsChartComponent;

    constructor() {
        ParallelCoordsChartComponent.that = this;

        this.restrict = 'EA';
        this.scope = {
            settings: '=',
            data: '=',
            selectedIndices: '='
        };
        this.template = `<div class='parcoords' style="height:200px"></div>`;
    }

    public link(scope: any, element: angular.IAugmentedJQuery, attrs: any): void {
        // Set defaults
        if (typeof scope.settings.alpha === "undefined") {
            scope.settings.alpha = 0.4;
        }
        if (typeof scope.settings.flipAxis === "undefined") {
            scope.settings.flipAxis = [];
        }
        if (typeof scope.settings.hideAxis === "undefined") {
            scope.settings.hideAxis = [];
        }
        if (typeof scope.data === "undefined") {
            scope.data = [];
        }

        // Whenever the window is resized, redraw the parcoords with the same settings
        let resizeFunction = (event: Event) => {
            ParallelCoordsChartComponent.that.renderComponent(element, scope);
        };
        window.addEventListener('resize', resizeFunction);

        ParallelCoordsChartComponent.that.renderComponent(element, scope);

        scope.$watch("data", () => {
            ParallelCoordsChartComponent.that.renderComponent(element, scope);
        }, true);

        scope.$watch("selectedIndices", () => {
            ParallelCoordsChartComponent.that.renderComponent(element, scope);
        }, true);

        scope.$on("$destroy", () => {
            window.removeEventListener('resize', resizeFunction);
        });
    }

    private renderComponent(elementRef: angular.IAugmentedJQuery, scope: any): void {
        let allData = scope.data as any[];
        let settings = scope.settings as ParallelCoordsChartSettings;
        let selectedIndices = scope.selectedIndices as number[];

        // Reset element
        let element = elementRef.children()[0] as HTMLElement;
        element.innerHTML = "";

        // Create parcoords element
        let parcoords = (d3 as any).parcoords()(element);

        // Color settings
        if (typeof settings.colorFunction !== "undefined") {
            parcoords.color(settings.colorFunction);
        }
        else if (typeof settings.colorRange !== "undefined") {
            // Set default colors
            let lower = {
                color: settings.colorRange.lower.color ? settings.colorRange.lower.color : "#de1c22",
                alpha: 1.0
            };
            let upper = {
                color: settings.colorRange.upper.color ? settings.colorRange.upper.color : "#acdd4b",
                alpha: 1.0
            };

            // Lower includes the alpha channel
            if ((lower.color.length - 1) % 4 === 0) {
                let alphaLength = (lower.color.length - 1) / 4;

                let color = lower.color.slice(0, -alphaLength);
                let alphaString = lower.color.substr(lower.color.length - alphaLength);
                let alpha = parseInt(alphaString, 16) / 255;

                lower.color = color;
                lower.alpha = alpha;
            }

            // Upper includes the alpha channel
            if ((upper.color.length - 1) % 4 === 0) {
                let alphaLength = (upper.color.length - 1) / 4;

                let color = upper.color.slice(0, -alphaLength);
                let alphaString = upper.color.substr(upper.color.length - alphaLength);
                let alpha = parseInt(alphaString, 16) / 255;

                upper.color = color;
                upper.alpha = alpha;
            }

            let domain = [settings.colorRange.lower.value, settings.colorRange.upper.value];
            let range = [lower, upper];

            let colorScale = (d3 as any).scale.linear()
                .domain(domain)
                .range(range);

            let colorFunction = (d) => {
                let index = d[settings.colorRange.axis];

                let colorValue = colorScale(index);

                let rgb = ParallelCoordsChartComponent.hexToRgb(colorValue.color);
                let rgba = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + colorValue.alpha + ")";
                return rgba;
            };
            parcoords.color(colorFunction);
        }

        // Set alpha level of traces
        parcoords.alpha(settings.alpha);

        // Set the data
        let data = [];
        if (selectedIndices) {
            for (let index of selectedIndices) {
                data.push(allData[index]);
            }
        }
        parcoords.data(data);

        // Hide the appropriate axis
        if (settings.hideAxis.length && data.length) {
            parcoords.hideAxis(settings.hideAxis);
        }

        // Render the traces
        parcoords.render();

        // Enable brushing
        if (settings.brushingEnabled) {
            parcoords.brushMode("1D-axes");
        }

        // Set reorderable
        if (settings.reorderable === true) {
            parcoords.reorderable();
        }

        // Flip the appropriate axis
        if (settings.flipAxis.length) {
            parcoords.flipAxis(settings.flipAxis);
        }
    }

    public static Factory() {
        var directive = () => {
            return new ParallelCoordsChartComponent();
        };
        return directive;
    }

    private static hexToRgb(hex: string): { r: number; g: number; b: number; } {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}

angular
    .module('si.package')
    .directive('parallelCoordsChart', ParallelCoordsChartComponent.Factory());