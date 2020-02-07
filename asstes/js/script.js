var info = $(".info");
var forecast = $(".forecast");
var uv = $(".uv");

function weatherQueryURL() {
  var apiKey = "df830f96f75d2076c720c75bf9a8d1a4";
  // Grab text the user typed into the search input, add to the queryParams object
  var q = $(".city")
    .val()
    .trim();
  var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${apiKey}&units=metric`;
  console.log(q);

  // Logging the URL so we have access to it for troubleshooting
  console.log(weatherURL);
  console.log(weatherURL + q);
}

weatherQueryURL();
// Function to empty out the results search
function clear() {
  $(".results").empty();
}

// .on("click") function associated with the Search Button
$(".btn").click(function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();
  // var m = moment (); = date and time now
  var m = moment();
  var mDateTime = m.format("LLL");

  // Empty the region associated with the articles
  // clear();

  // Build the query URL for the ajax request to the API
  var apiKey = "df830f96f75d2076c720c75bf9a8d1a4";
  var q = $(".city")
    .val()
    .trim();
  var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${apiKey}&units=imperial`;
  // var queryURL = weatherQueryURL();
  var queryURL = weatherURL;

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(results) {
    var wR = results.main;
    // var br = $("<br>");
    // var cDTI = info.prepend(`<p>${q} ${mDateTime} ${results.weather.icon}</p>`); ???? Why doesnt this work
    var weatherInfo = info.html(
      `Temperature: ${wR.temp}°F <br> Humidity: ${wR.humidity}% <br> Wind Speed:${results.wind.speed}MPH`
    );
    console.log(weatherInfo);
    console.log(results);
    // console.log(cDTI);
    var uvURL = `http://api.openweathermap.org/data/2.5/uvi?APPID=${apiKey}&lat=${results.coord.lat}&lon=${results.coord.lon}`;
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function(results) {
      var uvInfo = uv.text(`UV Index: ${results.value}`);
      console.log(results);
      console.log(uvInfo);
    });
  });
});
