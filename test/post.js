var simpleServe = require('..');
var assert = require('assert');
var request = require('request');

describe('A simple post request', function() {
  var responseBody = '<html><body><h1>Hello { name }</h1></body></html>';
  var name = 'Moshe Kolodny';
  var renderedBody = '<html><body><h1>Hello '+name+'</h1></body></html>';
  var server;
  var baseUrl;

  before(function(next) {
    simpleServe({
      'POST /': responseBody
    })(function(err, _server) {
      server = _server;
      baseUrl = 'http://localhost:' + server.address().port;
      next();
    });
  });

  after(function() { server.close(); });

  it('should get the response', function(next) {
    request.post(baseUrl, {form: {name: name}}, function(err, res, body) {
      assert(!err);
      assert.equal(res.statusCode, 200);
      assert.equal(body, renderedBody);
      next();
    });
  });
});


