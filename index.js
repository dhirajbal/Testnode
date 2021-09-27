var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
}));
require('./App/Routes/route')(app);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});