var http = require('http');
var qs = require('querystring');
var url = require('url');

module.exports = function(routes, callback) {
  return function(cb) {
    var server = http.createServer(function (request,response) {
      var method = request.method.toUpperCase();
      var ext = /\.(\w+$)/.exec(request.url);
      if (!ext) {
        ext = 'html';
      } else {
        ext = ext[1];
      }
      switch(ext) {
        case 'html':
        case 'htm':
          response.writeHead(200,{"Content-Type": "text/html"});
          break;
        case 'js':
          response.writeHead(200, {"Content-Type": "text/javascript"});
          break;
      }
      for (var meta in routes) {
        var route = routes[meta];
        var parts = meta.split(' ');
        var routeMethod = parts[0].toUpperCase();
        var urlRegex = new RegExp('^' + parts[1].replace(/\/g/, '\\/') + '(?:\\?.*)?$', 'i');
        var matches;
        if (method === routeMethod && (matches = urlRegex.exec(request.url))) {
          var url_parts = url.parse(request.url, true);
          var query = url_parts.query;
          if (method === 'POST') {
            var data = '';
            request.on("data", function(chunk) {
              data += chunk;
            });
            request.on("end", function() {
              var postData = qs.parse(data);
              response.end(compile(route, query, postData));
            });
          } else {
            response.end(compile(route, query, {}));
          }
          return callback && callback(request);
        }
      }
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.end('404 Not Found\n');
    }).listen(function() {
      cb(null, server);
    });
  };
};

function compile(responseBody, query, postData) {
  var data = {};
  for (var i in query)    data[i] = query[i];
  for (var i in postData) data[i] = postData[i];
  return responseBody.replace(/\{\s*(\w+)\s*\}/g, function(all, prop) {
    return prop in data ? data[prop] : '';
  });
}
