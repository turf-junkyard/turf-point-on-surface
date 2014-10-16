var featureCollection = require('turf-featurecollection');
var centroid = require('turf-center');
var distance = require('turf-distance');
var inside = require('turf-inside');
var explode = require('turf-explode');

module.exports = function(fc) {
  // normalize
  if(fc.type != 'FeatureCollection') {
    if(fc.type != 'Feature') {
      fc = {
        type: 'Feature',
        geometry: fc
      };
    }
    fc = featureCollection([fc]);
  }

  //get centroid
  var cent = centroid(fc);

  // check to see if centroid is on surface
  var onSurface = false;
  var i = 0;
  while(!onSurface && i < fc.features.length) {
    var geom = fc.features[i].geometry.type;
    if (geom.type === 'Point') {
      if (cent.geometry.coordinates[0] === geom.coordinates[0] &&
        cent.geometry.coordinates[1] === geom.coordinates[1]) {
        onSurface = true;
      }
    } else if(geom.type === 'MultiPoint') {
      var onMultiPoint = false;
      var k = 0;
      while(!onMultiPoint && k < geom.coordinates.length) {
        if (cent.geometry.coordinates[0] === geom.coordinates[k][0] &&
          cent.geometry.coordinates[1] === geom.coordinates[k][1]) {
          onSurface = true;
          onMultiPoint = true;
        }
        k++;
      }
    } else if(geom.type === 'LineString') {
      var onLine = false;
      var k = 0;
      while(!onLine && k < geom.coordinates.length - 1) {
        var x = cent.coordinates[0];
        var y = cent.coordinates[1];
        var x1 = geom.coordinates[k][0];
        var y1 = geom.coordinates[k][1];
        var x2 = geom.coordinates[k+1][0];
        var y2 = geom.coordinates[k+1][1];
        if(pointOnSegment(x, y, x1, y1, x2, y2)) {
          onLine = true;
          onSurface = true;
        }
        k++;
      }
    } else if(geom.type === 'MultiLineString') {
      var onMultiLine = false;
      var j = 0;
      while(!onMultiLine && j < geom.coordinates.length) {
        var onLine = false;
        var k = 0;
        var line = geom.coordinates[j];
        while(!onLine && k < line.length - 1) {
          var x = cent.coordinates[0];
          var y = cent.coordinates[1];
          var x1 = line[k][0];
          var y1 = line[k][1];
          var x2 = line[k+1][0];
          var y2 = line[k+1][1];
          if(pointOnSegment(x, y, x1, y1, x2, y2)) {
            onLine = true;
            onSurface = true;
          }
          k++;
        }
        j++;
      }
    } else if(geom.type === 'Polygon' || geom.type === 'MultiPolygon') {
      if(inside(cent, geom)) {
        onSurface = true;
      }
    } 
    i++;
  }
  if(onSurface) {
    return cent;
  } else {
    var vertices = explode(fc);
    var closestVertex;
    var closestDistance = Infinity;
    for(var i = 0; i < vertices.features.length; i++) {
      var dist = distance(cent, vertices.features[i], 'miles');
      if(dist < closestDistance) {
        closestDistance = dist;
        closestVertex = vertices.features[i];
      }
    }
    return closestVertex;
  }
}

function pointOnSegment (x, y, x1, y1, x2, y2) {
  var ab = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1));
  var ap = Math.sqrt((x-x1)*(x-x1)+(y-y1)*(y-y1)+(z-z1)*(z-z1));
  var pb = Math.sqrt((x2-x)*(x2-x)+(y2-y)*(y2-y)+(z2-z)*(z2-z));
  if(ab === ap + pb) {
    return true;
  }
}