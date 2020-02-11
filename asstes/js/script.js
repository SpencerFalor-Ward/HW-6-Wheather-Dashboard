// Function to empty out the results search
function clear() {
  $(".info").empty();
  $(".uv").empty();
  $(".forecast").empty();
}

function dateTime() {
  var q = $(".city")
    .val()
    .trim();
  // var info = $(".info");
  var m = moment();
  var mDateTime = m.format("LLL");
  $(".info").prepend(`<p>${q} ${mDateTime}</p>`);
  console.log(mDateTime);
}

function weatherInfo() {
  var apiKey = "df830f96f75d2076c720c75bf9a8d1a4";
  var q = $(".city")
    .val()
    .trim();
  var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${apiKey}&units=metric`;
  $.ajax({
    url: weatherURL,
    method: "GET"
  }).then(function(results) {
    var iconURL = `http://api.openweathermap.org/img/w/${results.weather[0].icon}.png`;
    // info.append(`<img src=${ iconURL }>`);
    var info = $(".info");
    var wR = results.main;
    var weatherInfo = info.append(
      `<img src=${iconURL}> <br>
      Temperature: ${wR.temp}°F <br> Humidity: ${wR.humidity}% <br> Wind Speed:${results.wind.speed}MPH`
    );
    console.log(weatherInfo);
    console.log(results);
  });
}

function uvIndex() {
  var apiKey = "df830f96f75d2076c720c75bf9a8d1a4";
  var q = $(".city")
    .val()
    .trim();
  var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${apiKey}&units=metric`;
  $.ajax({
    url: weatherURL,
    method: "GET"
  }).then(function(results) {
    var uvURL = `http://api.openweathermap.org/data/2.5/uvi?APPID=${apiKey}&lat=${results.coord.lat}&lon=${results.coord.lon}`;
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function(results) {
      var uv = $(".uv");
      var uvInfo = uv.text(`UV Index: ${results.value}`);
      // if (results.value < 2) {
      // }
      console.log(results);
      console.log(uvInfo);
    });
  });
}

// //need to make card for 5 day to append below too
function forecastInfo() {
  var apiKey = "df830f96f75d2076c720c75bf9a8d1a4";
  var q = $(".city")
    .val()
    .trim();
  var numDays = 5;
  // var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&APPID=${apiKey}`;
  var forecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${q}&cnt=${numDays}&APPID=${apiKey}&units=imperial `;
  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function(results) {
    for (var i = 0; i < 5; i++) {
      var forecast = $(".forecast");
      // var forecastDate = results.list[i].dt_txt;
      var forecastDate = results.list[i].dt;
      // var forecastIcon = results.list[i].weather[3].icon;
      var forecastIconURL = `http://api.openweathermap.org/img/w/${results.list[i].weather[0].icon}.png`;
      var forecastId = results.list[i].weather[0].description;
      var forecastTemp = results.list[i].main.temp;
      var forecastHumidity = results.list[i].main.humidity;
      forecast.append(`<div id=${[i]}>`);
      $(`#${[i]}`).append(
        `${forecastDate} <br>
        <img src=${forecastIconURL}> <br>
        ${forecastId} <br>
        Temp: ${forecastTemp}°F <br>
        Humidity: ${forecastHumidity}%`
      );
    }
    console.log(results);
    console.log(forecastInfo);
  });
}
//make list is an array and you need to for 5 it and if you use weather also need to indentify where in its array you are calling
// function iconIMG() {
//   var apiKey = "df830f96f75d2076c720c75bf9a8d1a4";
//   var q = $(".city")
//     .val()
//     .trim();
//   var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${apiKey}&units=metric`;
//   $.ajax({
//     url: weatherURL,
//     method: "GET"
//   }).then(function(results) {
//     // var forecast = $(".forecast");
//     var info = $(".info");
//     var iconURL = `http://api.openweathermap.org/img/w/${results.weather[0].icon}.png`;
//     info.append(`<img src=${iconURL}>`);
//     console.log(iconURL);
//     console.log(results);
//     // console.log(`new results ${results}`);
//   });
// }

$(".form").submit(function(event) {
  event.preventDefault();
  clear();
  dateTime();
  weatherInfo();
  uvIndex();
  forecastInfo();
  // iconIMG();
  // weatherURL();
  // uvURL();
  // forecastURL();
  console.log(this);
});
//make more variables to have functions call and make more self contained functions and then call them where needed. Much cleaner.
