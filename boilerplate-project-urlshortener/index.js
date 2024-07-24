require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");
const bodyParser = require("body-parser");

const urlMap = {};
// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", function (req, res) {
  const { body: data } = req;
  console.log(data);
  const { url } = data;
  const regex = /^https?:\/\//;
  if (!regex.test(url)) {
    res.json({ error: "invalid url" });
    console.log("invalid url");
  } else {
      let short = Math.floor(1000 + Math.random() * 9000);
      console.log(url);
      urlMap[short] = url;
      res.json({ original_url: url, short_url: short });
      console.log(urlMap);
  }
});

app.get("/api/shorturl/:url", function (req, res) {
  const { url } = req.params;
  const originalUrl = urlMap[url];
  console.log(originalUrl);
  
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
