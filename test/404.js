var simpleServe = require('..');
var assert = require('assert');
var request = require('request');

describe('A 404 request', function() {
  var responseBody = '<html><body><h1>It works!</h1></body></html>';
  var server;
  var baseUrl;

  before(function(next) {
    simpleServe({
      'GET /': responseBody
    })(function(err, _server) {
      server = _server;
      baseUrl = 'http://localhost:' + server.address().port;
      next();
    });
  });

  after(function() { server.close(); });

  it('should get a 404 response', function(next) {
    request(baseUrl + '/foo/', function(err, res, body) {
      assert(!err);
      assert.equal(res.statusCode, 404);
      next();
    });
  });
});


