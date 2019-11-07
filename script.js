// api.openweathermap.org/data/2.5/weather?q={city name}

/* 
type ie -- GET POST PUT DELETE
$.ajax({url:'', type:''}).done(function(response){})
*/
// City

// Date

// Icon image (visual representation of weather conditions)

// Temperature

// Humidity

// Wind speed

// UV index
$(document).ready(function() {
  $("#submit").on("click", function() {
    // $('<div>')

    const inputValue = $("#input").val();
    var urlQuery = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue},us&units=imperial&appid=90561c413c70d3cc0edce0ee85ce735e`;
    $.ajax({
      type: "POST",
      url: urlQuery
    }).then(function(response) {
      const city = response.name;
      const temperature = response.main.temp;
      const humidity = response.main.humidity;
      const windSpeed = response.wind.speed;
      //   const UV = response;
      console.log(`
      city: ${city}
      tempature: ${temperature}
      humidity: ${humidity}
      windspeed: ${windSpeed}
      `);

      //   api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml
      const conditions = `
      <div>
        <p>city: ${city}</p>
        <p>tempature: ${temperature}</p>
        <p>humidity: ${humidity}</p>
        <p>windspeed: ${windSpeed}</p>
      </div>
      `;
      $("#conditions").html(conditions);
    });
    const weatherForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue},us&mode=json&appid=90561c413c70d3cc0edce0ee85ce735e`;

    $.ajax({
      type: "POST",
      url: weatherForecast
    }).then(function(response) {
      const map = {};
      for (const weather of response.list) {
        const key = weather.dt_txt.split(" ")[0];
        if (!map[key]) {
          map[key] = weather;
        }
      }
      console.log(map);
      //We have a map with 5 dats and we should simply get the values as an array
      const forecast5Day = Object.values(map).slice(0, 5);
      console.log(forecast5Day);
      //We need to loop through forecast5Day inside for loop
      //create variables for any properties on the object we will need to reference
      //in our html template
      //Use these variables to interpolate into template string containing 
      //desired html
      //Create div in html with id or class to `append` each template in 
      //We ahve an array of objects, each object represents one data structure for each html template
      for (const weather of response.list) {
        const key = weather.dt_txt.split(" ")[0];
        if (!map[key]) {
          map[key] = weather;
        }
      }
    });
  });
});

// city = response+ " "
