var featureCollection = require('turf-featurecollection');
var centroid = require('turf-centroid');
var distance = require('turf-distance');
var intersect = require('turf-intersect');
var point = require('turf-point');
var linestring = require('turf-linestring');

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

  //if centroid intersects the featurecollection, return it
  var intersection = intersect(fc, cent);
  if(intersection.type != 'GeometryCollection') {
    return cent;
  }

  //else get all points in the fc and all lines in the collection
  var points = [];
  var segments = [];
  fc.features.forEach(function (f) {
    if (f.geometry.type === 'Point') {
      points.push(f);
    } else if (f.geometry.type === 'MultiPoint') {
      f.geometry.coordinates.forEach(function (coord) {
        points.push(point(coord));
      });
    } else if (f.geometry.type === 'LineString')  { 
      f.geometry.coordinates.forEach(function (coord, i) {
        if(i < f.geometry.coordinates.length) {
          segments.push([linestring(coord, f.geometry.coordinates[i + 1]));
        }
      });
    } else if (f.geometry.type === 'MultiLineString')  { 
      f.geometry.coordinates.forEach(function (line) {
        line.forEach(function (coord, i) {
          if(i < f.geometry.coordinates.length) {
            segments.push([linestring(coord, line[i + 1]));
          }
        });
      });
    } else if (f.geometry.type === 'Polygon')  { 
      f.geometry.coordinates.forEach(function (ring) {
        ring.forEach(function (coord, i) {
          if(i < f.geometry.coordinates.length) {
            segments.push([linestring(coord, ring[i + 1]));
          }
        });
      });
    } else if (f.geometry.type === 'MultiPolygon')  { 
      f.geometry.coordinates.forEach(function (poly) {
        poly.forEach(function (ring) {
          ring.forEach(function (coord, i) {
            if(i < f.geometry.coordinates.length) {
              segments.push([linestring(coord, ring[i + 1]));
            }
          });
        });
      });
    }
  })

  //for all points, get the distance using turf-distance
  var minDistance = Infinity;
  var currentMin;
  points.forEach(function (pt) {
    var dist = distance(pt, cent, 'miles')
    if(dist < minDistance) {
      minDistance = dist;
      currentMin = pt;
    }
  });

  //for all line segments, use the distToSegment function
  segments.forEach(function (segment) {
    var dist = distToSegment(cent, segment[0], segment[1]);
    if(dist < minDistance) {
      minDistance = dist;
      currentMin = pt;
    }
  });

  //return the point with the shortest distance
  var distances
}

// modified from http://stackoverflow.com/a/1501725
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
  if (t < 0) return dist2(p, v);
  if (t > 1) return dist2(p, w);
  var x = v[0] + t * (w[0] - v[0]);
  var y = v[1] + t * (w[1] - v[1]);
  return dist2(p, [x, y]);
}
function distToSegment(p, v, w) { 
  return Math.sqrt(distToSegmentSquared(p, v, w)); 
}

function dist2(v, w) { 
  return Math.pow(v[0] - w[0], 2) + Math.pow(v[1] - w[1], 2);
}