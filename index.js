var featureCollection = require('featureCollection');
var centroid = require('turf-centroid');
var distance = require('turf-distance');

module.exports = function(fc) {
  // normalize
  if(fc.type != 'FeatureCollection') {
    if(fc.type != 'Feature') {
      fc = {
        type: 'Feature'
        geometry: fc
      };
    }
    fc = featureCollection([fc]);
  }

  //get centroid

  //if centroid intersects the featurecollection, return it

  //else get all points in the fc and all lines in the collection

  //for all points, get the distance using turf-distance

  //for all line segments, use the distToSegment function

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
  return dist2(p, { x: v[0] + t * (w[0] - v[0]),
                    y: v[1] + t * (w[1] - v[1]) });
}
function distToSegment(p, v, w) { 
  return Math.sqrt(distToSegmentSquared(p, v, w)); 
}

function dist2(v, w) { 
  return Math.pow(v[0] - w[0], 2) + Math.pow(v[1] - w[1], 2);
}