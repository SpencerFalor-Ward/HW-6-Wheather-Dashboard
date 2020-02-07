
/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for Openweather API based on form inputs
 */
function weatherQueryURL(){
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${apiKey}`;
    var apiKey = "df830f96f75d2076c720c75bf9a8d1a4";    
    // Grab text the user typed into the search input, add to the queryParams object
    var q= $(".city")
    .val()
    .trim();
    console.log(q);


  // Logging the URL so we have access to it for troubleshooting
  console.log(weatherURL);
  console.log(weatherURL + q);
  return weatherURL
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
  
    // Empty the region associated with the articles
    clear();
  
    // Build the query URL for the ajax request to the API
    var queryURL = weatherQueryURL();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
        console.log(response);
    });
  });
  
