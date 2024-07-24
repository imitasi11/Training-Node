require("dotenv").config();
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const mongoose = require('mongoose');

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
};

app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }));

console.log("Hello World");
app.get("/", (_req, res) => {
  res
    // .send('Hello Express')
    .sendFile(__dirname + "/views/index.html");
});
app.get("/json", (_req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);
app.get(
    "/:word/echo",
    function (req,res,next) {
        console.log(req.params.word);
        console.log(req);
        res.json({echo: req.params.word});
    }
)
app.get(
    "/name",
    function (req,res,next) {
        console.log(req.query.first);
        console.log(req.query.last);
        res.json({name: `${req.query.first} ${req.query.last}`});
    }
)

app.post("/name", function(req, res) {
  console.log(req.body.first);
  console.log(req.body.last);
  res.json({name: `${req.body.first} ${req.body.last}`});
});

app.use("/public", express.static("public"));

module.exports = app;
