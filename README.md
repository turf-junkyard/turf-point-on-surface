turf-point-on-surface
===
[![Build Status](https://travis-ci.org/Turfjs/turf-point-on-surface.svg)](https://travis-ci.org/Turfjs/turf-point-on-surface)

Finds a centroid guaranteed to be on the surface of a geometry, feature, or featurecollection.


###Install

```sh
npm install turf-point-on-surface
```

###Parameters

|name|description|
|---|---|
|x|x coordinate|
|y|y coordinate|

###Usage

```js
centroid(x, y)
```

###Example

```js
var centroid = require('turf-point-on-surface');
var fs = require('fs');

var fc = JSON.parse(fs.readFileSync('path/to/myFile.geojson'));
var cent = centroid(fc);
```