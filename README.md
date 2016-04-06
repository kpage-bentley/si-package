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
| `reorderable`     |            |                                       |              |

### Color

Supports passing a function in the form:

```javascript
(d) => {
    // d contains the individual data element
    return "rgba(255, 255, 255, 1.0)";
}
```

Or you can pass an object of the type:

```javascript
{
    type: "RANGE",
    axis: "axis_to_compare",
    upper: {
        color: "#00FF00",
        value: 14
    },
    lower: {
        color: "#FF0000",
        value: 10
    }
}
```
#Demo
http://kpage-bentley.github.io/si-package/

[//]: # (TODO:)
[//]: # (Line thickness)
[//]: # (Line type)
[//]: # (Ordering - optional, must have arrays match)
[//]: # (Long term: sorting on grid, paging)
[//]: # (Long term: When hovering don't show all the lines as background)
