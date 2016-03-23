/// <reference path="../../typings/d3/d3.d.ts" />

(d3 as any).divgrid = function (config) {
    var columns = [];

    var dg = function (selection) {
        if (columns.length == 0)
            columns = d3.keys(selection.data()[0][0]);

        // Append table
        selection.selectAll("table")
            .data([true])
            .enter().append("table")
            .attr("class", "table table-hover")

        // Create Header
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

        // Create tbody
        selection.select("table")
            .selectAll("tbody")
                .data([true])
                .enter().append("tbody");

        // Create rows
        var tbody = selection.select("tbody");

        var rows = tbody.selectAll("tr")
            .data(function (d) {
                return d;
            });
        rows.enter().append("tr")
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

    (dg as any).columns = function(_) {
        if (!arguments.length)
            return columns;
        columns = _;
        return this;
    };

    return dg;
};
