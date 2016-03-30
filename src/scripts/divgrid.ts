/// <reference path="../../typings/d3/d3.d.ts" />

(d3 as any).divgrid = function (config) {
    // Total number of rows to display
    const GRID_ROWS = 50;

    var columns = [];

    var dg = function (selection) {

        var data = selection.data()[0];

        if (columns.length == 0)
            columns = d3.keys(selection.data()[0][0]);

        // Append table
        selection.selectAll("table")
            .data([true])
            .enter().append("table")
            .attr("class", "table table-hover")

        var createRows = (sortOnColumn?) => {

            if (typeof sortOnColumn !== "undefined") {
                data.sort((a, b) => {
                    return a[sortOnColumn] - b[sortOnColumn]
                });
            }

            var tbody = selection.select("tbody");

            // Create rows
            var rows = tbody.selectAll("tr")
                .data(data.slice(0, GRID_ROWS));
            rows.enter().append("tr");
            rows.exit().remove();

            // Create cells for each row
            var cells = rows.selectAll("td")
                .data(d => columns.map(col => d[col]));
            cells.enter().append("td");
            cells.text(function (d) {
                return d;
            });
            cells.exit().remove();
        }

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
                })
                .on("click", d => {
                    createRows(d);
                });

        // Create tbody
        selection.select("table")
            .selectAll("tbody")
                .data([true])
                .enter().append("tbody");

        createRows();

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
