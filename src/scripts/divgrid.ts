/// <reference path="../../typings/d3/d3.d.ts" />

// Keep a reference to the parcoords so you can modify it
(d3 as any).divgrid = function (parcoords) {
    // Total number of rows to display
    const GRID_ROWS = 50;

    var columns = [];

    var selection;

    var sort = {
        axis: null,
        up: false
    };

    function createRows(elements, sortOnColumn?) {
        // Create copy of data
        var sorted = elements.slice();

        if (typeof sortOnColumn !== "undefined") {
            // Set the sort object
            if (sort.axis === sortOnColumn) {
                if (sort.up) {
                    sort.axis = null;
                    sort.up = false;
                }
                else {
                    sort.up = true;
                }
            }
            else {
                sort.axis = sortOnColumn;
                sort.up = false;
            }

            if (sort.axis != null) {
                sorted.sort((a, b) => {
                    return a[sortOnColumn] - b[sortOnColumn]
                });

                if (sort.up) {
                    sorted.reverse();
                }
            }
        }

        var tbody = selection.select("tbody");

        // Create rows
        var rows = tbody.selectAll("tr")
            .data(sorted.slice(0, GRID_ROWS));
        rows.enter().append("tr");
        rows.exit().remove();

        // Give mouseover / mouseout to the rows
        selection.selectAll("tbody tr")
        .on("mouseover", (d) => {
            parcoords.highlight([d]);
        })
        .on("mouseout", parcoords.unhighlight);

        // Create cells for each row
        var cells = rows.selectAll("td")
            .data(d => columns.map(col => d[col]));
        cells.enter().append("td");
        cells.text(function (d) {
            return d;
        });
        cells.exit().remove();

        // Give i elements proper classes in header
        selection.select("table")
            .selectAll("tr")
            .selectAll("th")
            .selectAll("i")
                .attr("class", function(d) {
                    var x = d3.select(this.parentNode).datum();
                    if (x === sort.axis) {
                        return sort.up ? "icon-chevron_down" : "icon-chevron_up";
                    }
                });

        // Add click event to headers
        selection.select("table")
            .selectAll("thead")
            .selectAll("tr")
            .selectAll("th")
            .on("click", d => {
                createRows(elements, d);
            });
    }

    var dg: any = function (_selection) {
        selection = _selection;

        var data = selection.data()[0];

        if (columns.length == 0)
            columns = d3.keys(data[0]);

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
                })
            .selectAll("i")
                .data([true])
                .enter().append("i");

        // Create tbody
        selection.select("table")
            .selectAll("tbody")
                .data([true])
                .enter().append("tbody");

        createRows(data);

        return dg;
    };

    dg.columns = function(_) {
        if (!arguments.length)
            return columns;
        columns = _;
        return this;
    };

    dg.brush = function(elements) {
        sort.axis = null;
        createRows(elements);
    };

    return dg;
};
