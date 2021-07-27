// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// request to /api/:date? with a valid date 
// -> { unix: milliseconds, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
app.get('/api/:date?', (req, res) => {
  var dateParam = req.params.date

  if (!dateParam) {
    res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() })
  }

  if (dateParam.length >= 13) 
    dateParam = parseInt(dateParam)

  var date = new Date(dateParam)

  if (date.toUTCString() != "Invalid Date") {
    res.json({ unix: date.getTime(), utc: date.toUTCString() })
  }
  res.json({ error : "Invalid Date" })
})






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
