/// <reference path="../../typings/d3/d3.d.ts" />

interface rgb {
    r: number;
    g: number;
    b: number;
}

class ParcoordsHelper {

    public static template = `
        <div class='parcoords' style='height:200px;'></div>
        <div class='parcoords-grid'></div>
    `;

    public static create(parcoords, gridElement, data, customGridColumns) {

        // Preserve a copy of the data as it was initially
        var originalData = data.slice();

        if (typeof customGridColumns === 'undefined') {
            customGridColumns = [];
        }

        var config = {
            checkbox: false
        };

        // Total number of rows to display
        const GRID_ROWS = 50;

        function createRows() {
            var columns = d3.keys(data[0]);

            var sortOnColumn;
            var sortUp;

            // Determine sortOnColumn/direction from UI
            var theadRow = gridElement.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];
            var icons = theadRow.getElementsByTagName("i");
            for (var i = 0; i < icons.length; ++i) {
                var icon = icons[i];
                if (icon.className === 'icon-chevron_down') {
                    sortOnColumn = columns[i];
                    sortUp = true;
                }
                else if (icon.className === 'icon-chevron_up') {
                    sortOnColumn = columns[i];
                    sortUp = false;
                }
            }


            // Create copy of data
            var sorted = data.slice();
            if (typeof sortOnColumn !== 'undefined') {
                sorted.sort((a, b) => {
                    return a[sortOnColumn] - b[sortOnColumn]
                });
                if (sortUp) {
                    sorted.reverse();
                }
            }

            // Populate table body
            var tbody = gridElement.getElementsByTagName("tbody")[0];
            tbody.innerHTML = "";
            var tableRows = repeatElement(sorted, d => {
                var entries = columns.map(col => d[col]);
                var tr = document.createElement("tr");

                // Add checkbox to header
                if (config.checkbox) {
                    var th = document.createElement("th");
                    th.width = '20px';
                    th.innerHTML = "<input type='checkbox' checked='checked'></input>";
                    var checkbox = th.getElementsByTagName("input")[0];

                    // Triggered when checkbox is unchecked
                    checkbox.addEventListener('change', e => {
                        var index = data.indexOf(d);
                        if (index > -1) {
                            data.splice(index, 1);
                        }
                        createRows();
                    });

                    tr.appendChild(th);
                }

                var rowColumns = repeatElement(entries, col => {
                    var td = document.createElement("td");
                    td.innerHTML = col;
                    return td;
                });
                for (var i = 0; i < rowColumns.length; ++i) {
                    tr.appendChild(rowColumns[i]);
                }
                for (var i = 0; i < customGridColumns.length; ++i) {
                    var td = document.createElement("td");
                    td.appendChild(customGridColumns[i].constructor(d));
                    tr.appendChild(td);
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
        }

        function createHeader() {
            var columns = d3.keys(data[0]);

            // Populate table header
            var theadRow = gridElement.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];

            // Add checkbox to header
            if (config.checkbox) {
                var th = document.createElement("th");
                th.width = '20px';
                th.innerHTML = "<input type='checkbox' checked='checked'></input>";
                var checkbox = th.getElementsByTagName("input")[0];
                checkbox.addEventListener('change', e => {
                    if (checkbox.checked) {
                        data = originalData.slice();
                    } else {
                        data = [];
                    }
                    createRows();
                });
                theadRow.appendChild(th);
            }

            var headColumns = repeatElement(columns, col => {
                var th = document.createElement("th");
                th.innerHTML = col + "<i></i>";

                th.addEventListener('mousedown', e => {
                    resetHeaderIcons(col);
                    var icon = th.getElementsByTagName("i")[0];
                    if (icon.className === '')
                        icon.className = 'icon-chevron_down';
                    else if (icon.className === 'icon-chevron_down')
                        icon.className = 'icon-chevron_up';
                    else
                        icon.className = '';
                    createRows();
                });
                return th;
            });
            for (var i = 0; i < headColumns.length; ++i) {
                theadRow.appendChild(headColumns[i]);
            }
            for (var i = 0; i < customGridColumns.length; ++i) {
                var custom = customGridColumns[i];
                var th = document.createElement("th");
                th.innerHTML = custom.name;
                theadRow.appendChild(th);
            }
        }

        function createTable() {

            // Create table skeleton
            gridElement.innerHTML = "<table class='table table-hover'>" +
                                        "<thead><tr></tr></thead>" +
                                        "<tbody></tbody>" +
                                    "</table>";
            createHeader();
            createRows();
        }

        function repeatElement(dataArray: any[], elementConstructor, limit?: number): any[] {
            limit = typeof limit === 'undefined' ? dataArray.length : limit;

            var result = [];
            for (var i = 0; i < Math.min(limit, dataArray.length); ++i) {
                var data = dataArray[i];
                var element = elementConstructor(data);
                result.push(element);
            }
            return result;
        }

        function resetHeaderIcons(skipValue?: any) {
            var theadRow = gridElement.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];
            var icons = theadRow.getElementsByTagName("i");
            for (var i = 0; i < icons.length; ++i) {
                var icon = icons[i];
                if (icon.previousSibling.textContent !== skipValue) {
                    icon.className = "";
                }
            }
        }

        function brush(elements) {
            data = elements;
            resetHeaderIcons();
            createRows();
        }

        createTable();

        return {
            brush: brush
        };
    }

    public static hexToRgb(hex: string): rgb {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}
