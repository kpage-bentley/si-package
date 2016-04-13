/// <reference path="../../typings/d3/d3.d.ts" />

var createParcoordsGrid = function (parcoords, gridElement, data) {

    // Total number of rows to display
    const GRID_ROWS = 50;

    var sort = {
        axis: null,
        up: false
    };

    function repeatElement(dataArray: any[], elementConstructor, limit?: number): any[] {
        limit = typeof limit === 'undefined' ? dataArray.length : limit;

        var result = [];
        for (var i = 0; i < Math.min(limit, dataArray.length); ++i) {
            var data = dataArray[i];
            var element = elementConstructor(data, i);
            result.push(element);
        }
        return result;
    }

    function resetHeaderIcons(skipIndex) {
        var theadRow = gridElement.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];
        var icons = theadRow.getElementsByTagName("i");
        for (var i = 0; i < icons.length; ++i) {
            if (i !== skipIndex) {
                icons[i].className = "";
            }
        }
    }

    var dg: any = function () {

        var columns = d3.keys(data[0]);

        // Create table skeleton
        gridElement.innerHTML = "<table class='table table-hover'>" +
                                    "<thead><tr></tr></thead>" +
                                    "<tbody></tbody>" +
                                "</table>";

        // Populate table header
        var theadRow = gridElement.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];
        var headColumns = repeatElement(columns, (col, idx) => {
            var th = document.createElement("th");
            th.innerHTML = col + "<i></i>";

            th.addEventListener('mousedown', e => {
                resetHeaderIcons(idx);
                var icon = th.getElementsByTagName("i")[0];
                var icons = ['', 'icon-chevron_down', 'icon-chevron_up'];
                var index = (icons.indexOf(icon.className) + 1) % icons.length;
                icon.className = icons[index];
            });
            return th;
        });
        for (var i = 0; i < headColumns.length; ++i) {
            theadRow.appendChild(headColumns[i]);
        }

        // Populate table body
        var tbody = gridElement.getElementsByTagName("tbody")[0];
        var tableRows = repeatElement(data, d => {
            var entries = columns.map(col => d[col]);
            var tr = document.createElement("tr");

            var rowColumns = repeatElement(entries, col => {
                var td = document.createElement("td");
                td.innerHTML = col;
                return td;
            });
            for (var i = 0; i < rowColumns.length; ++i) {
                tr.appendChild(rowColumns[i]);
            }

            tr.addEventListener('mouseover', (e) => {
                parcoords.highlight([d]);
            });
            tr.addEventListener('mouseout', parcoords.unhighlight);

            return tr;
        }, GRID_ROWS)
        for (var i = 0; i < tableRows.length; ++i) {
            tbody.appendChild(tableRows[i]);
        }

        return dg;
    };

    dg();

    dg.brush = function(elements) {
        sort.axis = null;
    };

    return dg;
};
