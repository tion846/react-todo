
let express = require('express');
let app =express();

// app.use('/', express.static(path.join(__dirname, '..')));
app.use(express.static(__dirname));

app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// app.get('/')

app.listen(3000, function() {
  console.log('Server started: http://localhost:' + 3000 + '/');
});