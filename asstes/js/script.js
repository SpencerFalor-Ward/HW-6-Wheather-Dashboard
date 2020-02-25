// Function to empty out the results search
function clear() {
  $(".temp").empty();
  $(".uv").empty();
  $(".wind").empty();
  $(".forecast").empty();
  $(".dateTime").empty();
}

function dateTime() {
  var q = $(".city")
    .val()
    .trim();
  var m = moment();
  var mDateTime = m.format("LLL");
  $(".dateTime").prepend(`<p>${q} <br> ${mDateTime}</p>`);
  console.log(mDateTime);
}

function weatherInfo() {
  var apiKey = "df830f96f75d2076c720c75bf9a8d1a4";
  var q = $(".city")
    .val()
    .trim();
  var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${apiKey}&units=imperial`;
  $.ajax({
    url: weatherURL,
    method: "GET"
  }).then(function(results) {
    var iconURL = `http://api.openweathermap.org/img/w/${results.weather[0].icon}.png`;
    // info.append(`<img src=${ iconURL }>`);
    var info = $(".temp");
    var wR = results.main;
    var weatherInfo = info.append(
      `<img src=${iconURL}> <br>
      Temperature: ${wR.temp}°F <br> Humidity: ${wR.humidity}% <br> Wind Speed: ${results.wind.speed}MPH`
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
  var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${apiKey}&units=imperial`;
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
      var uvTxt = $("<div class='uvTxt'>");
      var uvNum = $("<div class='uvNum'>");
      var rV = results.value;
      var uvInfo = uvNum.text(`${rV}`);
      uv.append(uvTxt, uvNum);
      uvTxt.text("UV Index:");
      //uvNum.text(uvInfo);

      if (rV <= 2) {
        var uvInfo = uvNum.text(` ${rV} Burn in 60 min`);
        uvNum.css("backgroundColor", "green");
      } else if (rV > 2 || rV <= 5) {
        var uvInfo = uvNum.text(`${rV} Burn in 45 min`);
        uvNum.css("backgroundColor", "orange");
      } else if (rV == 6 || rV == 7) {
        var uvInfo = uvNum.text(` ${rV} Burn in 30 min`);
        uvNum.css("backgroundColor", "crimson");
      } else if (rV >= 8) {
        var uvInfo = uvNum.text(` ${rV} Burn in 15 min`);
        uvNum.css("backgroundColor", "red");
      }
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
  var numDays = 40;
  var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&APPID=${apiKey}&cnt=${numDays}&units=imperial`;
  // var forecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${q}&cnt=5&APPID=${apiKey}&units=imperial`;
  // var forecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?id=${q}&cnt=${numDays}&appid=${apiKey}&units=imperial`;
  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function(results) {
    for (var i = 0; i < 5; i++) {
      var forecast = $(".forecast");
      // var forecastDate = results.list[i].dt * (60 * 60 * 24 * 1000);
      var forecastDate = new Date(results.list[i].dt * 1000).toLocaleString();
      // var forecastDate = results.list[i].dt_txt;
      // var forecastIcon = results.list[i].weather[3].icon;
      var forecastIconURL = `http://api.openweathermap.org/img/w/${results.list[i].weather[0].icon}.png`;
      var forecastId = results.list[i].weather[0].description;
      var forecastTemp = results.list[i].main.temp;
      // var forecastTemp = results.list[i].temp.day;
      var forecastHumidity = results.list[i].main.humidity;
      // var forecastHumidity = results.list[i].humidity;
      forecast.append(`<div id=${[i]} class="forecast-item">`);
      $(`#${[i]}`).append(
        `${forecastDate} <br>
        <img src=${forecastIconURL}> <br>
        ${forecastId} <br>
        Temp: ${forecastTemp}°F <br>
        Humidity: ${forecastHumidity}%`
      );
    }
    console.log(forecastDate);
    console.log(results);
    console.log(forecastInfo);
  });
}
function forecastCSS() {
  $(`id`).each(function() {
    $("id").css("margin", "2%");
    // id.style.marginRight = "1%";
  });
}
function storeCity(city) {
  var city = $(".city");
  var searched = JSON.parse(localStorage.getItem("cities"));
  var inputTxt = $("input")
    .val()
    .trim();
  if (searched) {
    searched.push(inputTxt);
  } else {
    // localStorage.clear();
    searched = [inputTxt];
  }
  localStorage.setItem("cities", JSON.stringify(searched));

  console.log("Local Storage");
}

function populateHistory() {
  var searchedArray = JSON.parse(localStorage.getItem(`cities`));
  searchedArray.forEach(searched => {
    if ("cities" <= 5) {
      var history = $("<div class='past'>").text(searched);
      $(".search").append(history);
    } else {
      localStorage.clear();
      storeCity();
      var history = $("<div class='past'>").text(searched);
      $(".search").append(history);
      // populateHistory();
    }
  });
  // populateHistory();
  historyClick();
}

$(".form").submit(function(event) {
  event.preventDefault();
  clear();
  storeCity();
  populateHistory();
  dateTime();
  weatherInfo();
  uvIndex();
  forecastInfo();
  forecastCSS();
  $(".city").val("");

  console.log(this);
});

function historyClick() {
  $(".past").click(function() {
    var q = $(".city").val($(this).text());
    event.preventDefault();
    clear();
    dateTime();
    weatherInfo();
    uvIndex();
    forecastInfo();
    forecastCSS();
    $(".city").val("");
  });
  console.log(this);
}
