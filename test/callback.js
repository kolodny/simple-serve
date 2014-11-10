var simpleServe = require('..');
var assert = require('assert');
var request = require('request');

describe('A simple get request', function() {
  var responseBody = '<html><body><h1>It works!</h1></body></html>';
  var server;
  var baseUrl;
  var ticks = 0;

  before(function(next) {
    simpleServe({
      'GET /': responseBody
    }, function() {
      ticks++;
    })(function(err, _server) {
      server = _server;
      baseUrl = 'http://localhost:' + server.address().port;
      next();
    });
  });

  after(function() { server.close(); });

  it('should get the response', function(next) {
    request(baseUrl, function(err, res, body) {
      assert(!err);
      assert.equal(ticks, 1);
      next();
    });
  });
});


