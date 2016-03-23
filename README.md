# Library

This repository contains all of the files that other projects will need to access from the Structural Insights application.

## Parallel Coordinates

`<si-parcoords data-settings="settings"></si-parcoords>`

#### Settings

| Key               | Type       | Description                           | Default      |
|-------------------|------------|---------------------------------------|--------------|
| `alpha`           | `number`   |                                       | 0.4          |
| `brushingEnabled` |            |                                       |              |
| `color`           |            |                                       |              |
| `getData`         | `function` |                                       | **required** |
| `hideAxis`        |            |                                       |              |
| `showGrid`        | `boolean`  |  show the table beneath the chart     | `false`      |



# TODO:
- Reverse axis
- Opacity, line thickness (functions)
- line type
- Pull out more color stuff, use ranges (if no bound is passed)
- Ordering (optional, must have arrays match)
- Long term - sorting on grid, paging
- When hovering don't show all the lines (as background)
