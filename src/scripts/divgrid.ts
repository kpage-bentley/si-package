/// <reference path="../../typings/d3/d3.d.ts" />

(d3 as any).divgrid = function (config) {
    var columns = [];

    var dg = function(selection) {
        if (columns.length == 0)
            columns = d3.keys(selection.data()[0][0]);

        // Append table
        var table = selection.append("table")
            .attr("class", "table");

        // Create Header
        table.append("thead").append("tr")
            .selectAll("th")
            .data(columns).enter()
            .append("th")
            .text(function (d) {
                return d;
            });

        // Create Rows
        table.append("tbody")
            .selectAll("tr")
            .data(function (d) {
                return d;
            }).enter()
            .append("tr")
            .selectAll("td")
            .data(function (d) {
                return columns.map(function (col){
                    return d[col];
                })
            }).enter()
            .append("td")
            .text(function (d) {
                return d;
            });

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
