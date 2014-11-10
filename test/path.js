var simpleServe = require('..');
var assert = require('assert');
var request = require('request');

describe('A request with a route', function() {
  var server;
  var baseUrl;

  before(function(next) {
    simpleServe({
      'GET /routea.html': 'got routea',
      'GET /routeb.html': 'got routeb',
    })(function(err, _server) {
      server = _server;
      baseUrl = 'http://localhost:' + server.address().port;
      next();
    });
  });

  after(function() { server.close(); });

  it('should get the correct response', function(next) {
    request(baseUrl + '/routea.html', function(err, res, body) {
      assert.equal(body, 'got routea');
      request(baseUrl + '/routeb.html', function(err, res, body) {
        assert.equal(body, 'got routeb');
        next();
      });
    });
  });
});


