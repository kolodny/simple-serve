Simple-Serve
===

Sample Usage:

```js
var simpleServe = require('simple-serve');
simpleServe({
  'GET /': '<html><body><h1>Working</h1></body></html>',
  'GET /page2.html': '<html><body><h1>Went to Page 2</h1></body></html>',
  'POST /users': 'You posted name: {name}'
})(function(err, server) {
  console.log('http://localhost:' + server.address().port;)
});
```

Note that it returns a [thunk](https://github.com/tj/node-thunkify), because I mainly wrote this to test [co](https://github.com/visionmedia/co) related things

See [test](test) for more usage examples
