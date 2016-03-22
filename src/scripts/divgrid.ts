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
            .text(function (d) { return d; });

        // Create tbody
        table.append("tbody")
            .selectAll("tr")
            .data(function (d) { return d; }).enter()
            .append("tr")
            .selectAll("td");

        // ----- Old Code -----
        /*
        // header
        selection.selectAll(".header")
            .data([true])
            .enter().append("div")
            .attr("class", "header")

        var header = selection.select(".header")
            .selectAll(".cell")
            .data(columns);

        header.enter().append("div")
            .attr("class", function(d,i) { return "col-" + i; })
            .classed("cell", true)

        selection.selectAll(".header .cell")
            .text(function(d) { return d; });

        header.exit().remove();

        // rows
        var rows2 = selection.selectAll(".row")
            .data(function(d) { return d; })

        rows2.enter().append("div")
            .attr("class", "row")

        rows2.exit().remove();

        var cells = selection.selectAll(".row").selectAll(".cell")
            .data(function(d) { return columns.map(function(col){return d[col];}) })

        // cells
        cells.enter().append("div")
            .attr("class", function(d,i) { return "col-" + i; })
            .classed("cell", true)

        cells.exit().remove();

        selection.selectAll(".cell")
            .text(function(d) { return d; });*/

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
