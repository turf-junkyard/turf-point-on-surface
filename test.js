var test = require('tape');
var centroid = require('./');
var fs = require('fs');

test('point-on-surface', function(t) {
  var fc = fs.readFileSync(__dirname + '/fixtures/multipolygon.geojson');
  var cent = centroid(fc);
  t.ok(cent, 'centroid returned');
  t.equal(cent.type, 'Feature');
  t.equal(cent.geometry.type, 'Point');
  t.equal(typeof cent.geometry.coordinated[0], 'number');
  t.equal(typeof cent.geometry.coordinated[1], 'number');
  t.end();
});