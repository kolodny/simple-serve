var simpleServe = require('..');
var assert = require('assert');
var request = require('request');

describe('A request', function() {
  var server;
  var baseUrl;

  before(function(next) {
    simpleServe({
      'GET /': 'html type',
      'GET /index.html': 'html type',
      'GET /main.js': 'js type'
    })(function(err, _server) {
      server = _server;
      baseUrl = 'http://localhost:' + server.address().port;
      next();
    });
  });

  after(function() { server.close(); });

  it('should get the correct mime types', function(next) {
    var ticks = 3;
    request(baseUrl, function(err, res, body) {
      assert(!err);
      assert.equal(res.headers['content-type'], 'text/html');
      if (!--ticks) { next(); }
    });
    request(baseUrl + '/index.html', function(err, res, body) {
      assert(!err);
      assert.equal(res.headers['content-type'], 'text/html');
      if (!--ticks) { next(); }
    });
    request(baseUrl + '/main.js', function(err, res, body) {
      assert(!err);
      assert.equal(res.headers['content-type'], 'text/javascript');
      if (!--ticks) { next(); }
    });
  });
});


