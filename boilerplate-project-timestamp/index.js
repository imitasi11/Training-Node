// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");


const isValidDate = (dateString) => {
  let date = new Date(dateString);
  return !isNaN(date.getTime());
}

const isUnix = (unix) => {
  return !isNaN(unix);
}

const getUnix = (dateString) => {
  let date = new Date(dateString);
  return date.getTime();
}
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  if (date) {
    if (isValidDate(date)||isUnix(date)) {
      

      if (isUnix(date)) {
        date = parseInt(date);
      }
      console.log("date", date);
      console.log("unix", getUnix(date));
      console.log("utc", new Date(date).toUTCString());
      console.log(" ");

      res.json({ unix: getUnix(date), utc: new Date(date).toUTCString() });
    } else {
      res.json({ error: "Invalid Date" });
    }
  } else {
    res.json({ unix: Date.now(), utc: new Date().toUTCString() });
  }
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
