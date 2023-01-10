// obtained from openWeather api
// https://api.openweathermap.org/data/2.5/weather?lat=49.8851869&lon=8.6736295&appid=2c56827089a97441d33b88ff3d25098f
// Darmstadt lat=49.8851869&lon=8.6736295
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/weather.html");
});

app.post("/", (req, res) => {
  // location = "Muehltal";
  // console.log("req -- ", req);
  const location = req.body.cityName;
  // console.log("location - ", location);
  const apiKey = "2c56827089a97441d33b88ff3d25098f";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" +
    location +
    "&appid=" +
    apiKey;
  https.get(url, (response) => {
    // console.log("weather - response -", response);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      // console.log("weather-data-", weatherData);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      res.write(
        "<p>The weather in <b>" +
          location +
          "</b> is currently " +
          description +
          "</p>"
      );
      res.write("<h1>Temperature is " + temp + "</h1>");
      // res.write(
      //   '<form action="/" method="POST"><button type="submit">Back</button></form>'
      // );
      res.send();
    });
  });
});

app.listen(4000, function () {
  console.log("Weather listening on 4000");
});
