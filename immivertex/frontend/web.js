
var gzippo = require('gzippo'),
  express = require('express'),
  basicAuth = require('basic-auth'),
  app = express(),

  auth = function(req, res, next) {
    var user = basicAuth(req);
    if (user && user.name == "admin" && user.pass == "admin")
      return next();
    else {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }
  }

app.use(auth, express.static(__dirname + "/"));
app.use(auth, gzippo.staticGzip("" + __dirname + "/"));
app.listen(process.env.PORT || 8000);
