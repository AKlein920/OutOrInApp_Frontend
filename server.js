var express = require('express');

var app = express();
var cors = require('cors');
var port = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(cors());

app.listen(port, function() {
  console.log('App is running on port: ' + port);
});
