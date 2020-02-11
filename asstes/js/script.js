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
    var info = $(".info");
    var wR = results.main;
    var weatherInfo = info.append(
      `Temperature: ${wR.temp}°F <br> Humidity: ${wR.humidity}% <br> Wind Speed:${results.wind.speed}MPH`
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
      console.log(results);
      console.log(uvInfo);
    });
  });
}

// function uvIndex(uvURL) {
//   $.ajax({
//     url: uvURL,
//     method: "GET"
//   }).then(function(results) {
//     var uv = $(".uv");
//     var uvInfo = uv.text(`UV Index: ${results.value}`);
//     console.log(results);
//     console.log(uvInfo);
//   });
// }

// function forecastURL() {
//   var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&APPID=${apiKey}&units=imperial`;
//   console.log(forecastURL);
// }

// //need to make card for 5 day to append below too
function forecastInfo() {
  var apiKey = "df830f96f75d2076c720c75bf9a8d1a4";
  var q = $(".city")
    .val()
    .trim();
  var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&APPID=${apiKey}&units=imperial`;
  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function(results) {
    var forecast = $(".forecast");
    var forecastInfo = forecast.append(results.list.weather);
    console.log(results);
    console.log(forecastInfo);
  });
}

function iconIMG() {
  var apiKey = "df830f96f75d2076c720c75bf9a8d1a4";
  var q = $(".city")
    .val()
    .trim();
  var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${apiKey}&units=metric`;
  $.ajax({
    url: weatherURL,
    method: "GET"
  }).then(function(results) {
    var forecast = $(".forecast");
    var iconURL = `http://api.openweathermap.org/img/w/${results.weather[0].icon}.png`;
    forecast.append(`<img src=${iconURL}>`);
    console.log(iconURL);
    console.log(results);
    // console.log(`new results ${results}`);
  });
}

// btn.click(function(event) {
//   // Prevents the page from reloading on form submit.
//   event.preventDefault();
//   clear();
//   // dateTime();
//   // weatherURL();
//   weatherInfo();
//   // uvURL();
//   // uvIndex();
//   // forecastURL();
//   // forecastInfo();
//   // iconIMG();
// });
$(".form").submit(function(event) {
  event.preventDefault();
  clear();
  iconIMG();
  dateTime();
  weatherInfo();
  // weatherURL();
  // uvURL();
  uvIndex();
  // forecastURL();
  forecastInfo();
  console.log(this);
});
//make more variables to have functions call and make more self contained functions and then call them where needed. Much cleaner.
