const {test} = require("../libs/controller/testController");
const path = require("path");
module.exports = require("express")
  .Router()
  .get("/test", test);