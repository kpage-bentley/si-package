# Library

This repository contains all of the files that other projects will need to access from the Structural Insights application.

## Latest Version

### Parallel Coordinates

```html
    <parallel-coords-chart
        data-settings="settings"
        data-data="data"
        data-selected-indices="selectedIndices">
    </parallel-coords-chart>
```

##### Settings

These are the settings. Note that you can either pass `colorFunction` or `colorRange`, not both.

| Key               | Type                  | Description                           | Default      |
|-------------------|-----------------------|---------------------------------------|--------------|
| `alpha`           | `number`              | Set the brush alpha level.            | `0.4`        |
| `brushingEnabled` | `boolean`             | Whether you can brush.                | `false`      |
| `colorFunction`   | `(d: any) => string`  | Used to determine the brush color.    | `null`       |
| `colorRange`      | `ColorRange`          | Used to determine the brush color.    | `null`       |
| `flipAxis`        | `string[]`            | Flip an axis.                         | `[]`         |
| `hideAxis`        | `string[]`            | Hide an axis.                         | `[]`         |
| `reorderable`     | `boolean`             | Whether you reorder axis by dragging. | `false`      |

```javascript
interface ColorRange {
    axis: string;
    upper: ColorRangeLimit;
    lower: ColorRangeLimit;
}
interface ColorRangeLimit {
    color?: string;
    value: number;
}
```

##### Data

Each item in the array can represent one brush stroke.

```javascript
any[];
```

##### Selected Indices

This array is used to specify which indices from data should be brushed (in case you wanted to draw a subset of the data).

```javascript
number[];
```


## Deprecated Version

### Parallel Coordinates

`<si-parcoords data-settings="settings"></si-parcoords>`

##### Settings

| Key               | Type       | Description                           | Default      |
|-------------------|------------|---------------------------------------|--------------|
| `alpha`           | `number`   |                                       | 0.4          |
| `brushingEnabled` |            |                                       |              |
| `color`           |            |                                       |              |
| `getData`         | `function` |                                       | **required** |
| `hideAxis`        |            |                                       |              |
| `showGrid`        | `boolean`  |  show the table beneath the chart     | `false`      |
| `reorderable`     |            |                                       |              |

#### Color

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
### SunBurst

```html
    <hierarchical-sunburst-chart
        data-settings="settings"
        data-data="data">
    </hierarchical-sunburst-chart>
```

##### Settings

These are the settings.

| Key               | Type                  | Description                           | Default      |
|-------------------|-----------------------|---------------------------------------|--------------|
| `width`           | `number`              | Set the width of chart.               | `500`        |
| `height` 			| `number`              | Set the height of chart.              | `500`        |
| `colors`   		| `Object with key value pair`          | for setting color of pies.            | `null`       |
| `title`      		| `string`          | Set title for sunburst chart.    | `null`       |

```javascript
interface HierarchicalSunburstChartSettings {
    width ?: number;
    height ?: number;
    title ?: string;
    colors ?: any;
}
```

##### Data

need description.

```javascript
any[];
```



## Demo
http://kpage-bentley.github.io/si-package/

[//]: # (TODO:)
[//]: # (Line thickness)
[//]: # (Line type)
[//]: # (Ordering - optional, must have arrays match)
[//]: # (Long term: sorting on grid, paging)
[//]: # (Long term: When hovering don't show all the lines as background)
