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
|fc|A FeatureCollection, Feature, or Geometry of any type|

###Usage

```js
centroid(fc)
```

###Example

```js
var centroid = require('turf-point-on-surface');
var fs = require('fs');

var fc = JSON.parse(fs.readFileSync('path/to/myFile.geojson'));
var cent = centroid(fc);
```