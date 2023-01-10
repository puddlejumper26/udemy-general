const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  console.log(1111, res);
  // res.send("Hello, world!");
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  // console.log(5555, res);
  res.send(4444);
});

app.listen(8080, function () {
  console.log("Server listening on port 8080");
});

console.log(33333);
