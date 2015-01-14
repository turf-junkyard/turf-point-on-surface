turf-point-on-surface
===
[![Build Status](https://travis-ci.org/Turfjs/turf-point-on-surface.svg)](https://travis-ci.org/Turfjs/turf-point-on-surface)

Finds a point guaranteed to be on the surface of a GeoJSON object.


###Install

```sh
npm install turf-point-on-surface
```

###Parameters

|name|description|
|---|---|
|fc|A FeatureCollection, Feature, or Geometry of any type|

###Usage

```js
pointOnSurface(fc)
```

###Example

```js
var pointOnSurface = require('turf-point-on-surface');
var fs = require('fs');

var fc = JSON.parse(fs.readFileSync('path/to/myFile.geojson'));
var cent = pointOnSurface(fc);
```
