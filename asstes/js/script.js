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
  var m = moment();
  var mDateTime = m.format("LLL");
  $(".info").prepend(`<p>${q} <br> ${mDateTime}</p>`);
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
      var uvTxt = $("<div class='uvTxt'>");
      var uvNum = $("<div class='uvNum'>");
      var rV = results.value;
      var uvInfo = uvNum.text(`${rV}`);
      uv.append(uvTxt, uvNum);
      uvTxt.text("UV Index:");
      uvNum.text(uvInfo);

      if (rV <= 2) {
        `${uvInfo} Burn in 60 min`;
        uvNum.css(background - color, "green");
      } else if (rV == 3 || rV == 4 || rV == 5) {
        `${uvInfo} Burn in 45 min`;
        uvNum.css(background - color, "orange");
      } else if (rV == 6 || rV == 7) {
        `${uvInfo} Burn in 30 min`;
        uvNum.css(background - color, "crimson");
      } else if (rV >= 8) {
        `${uvInfo} Burn in 15 min`;
        uvNum.css(background - color, "red");
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
  // var numDays = 5;
  var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&APPID=${apiKey}`;
  // var forecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${q}&cnt=${numDays}&APPID=${apiKey}&units=imperial`;
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
function forecastCSS() {
  $(`id`).each(function() {
    $("id").css("margin", "2%");
    // id.style.marginRight = "1%";
  });
}
function storeCity(city) {
  var city = $(".city");
  var searched = JSON.parse(localStorage.getItem(city));
  var inputTxt = $("input")
    .val()
    .trim();

  if (searched) {
    searched.push(inputTxt);
  } else {
    searched = [inputTxt];
  }
  localStorage.setItem(city, JSON.stringify(searched));
}

function populateHistory() {
  $(".search").empty();
  var searchedArray = [];
  for (var i = 0; i < searchedArray.length; i++) {
    var searched = JSON.parse(localStorage.getItem(`${searchedArray[i]}`));
    if (searched) {
      searched.forEeach(searched => {
        var history = $("<div id=past>").text(searched);
        $(`${searchedArray[i]}`).append(history);
      });
    }
  }
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

  console.log(this);
});
function historyClick() {
  $("#past").click(function() {
    var q = $(".city")
      .val()
      .trim();
    var pastCity = q.replaceWith($("#past").text());
    event.preventDefault();
    clear();
    dateTime(pastCity);
    weatherInfo(pastCity);
    uvIndex(pastCity);
    forecastInfo(pastCity);
    forecastCSS();
  });
  console.log(this);
}
