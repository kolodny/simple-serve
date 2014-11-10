var simpleServe = require('..');
var assert = require('assert');
var request = require('request');

describe('A multi-route server', function() {
  var server;
  var baseUrl;

  before(function(next) {
    simpleServe({
      'GET /': 'got /',
      'POST /': 'posted /',
    })(function(err, _server) {
      server = _server;
      baseUrl = 'http://localhost:' + server.address().port;
      next();
    });
  });

  after(function() { server.close(); });

  it('should get the correct responses', function(next) {
    request(baseUrl, function(err, res, body) {
      assert.equal(body, 'got /');
      request.post(baseUrl, function(err, res, body) {
        assert.equal(body, 'posted /');
        next();
      });
    });
  });
});


