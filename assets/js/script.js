var apiKey =  '3ff796ce952848366a2c9d57a6fa6042'
var cityName = "Moscow"
var weatherCoord = 'https://api.openweathermap.org/data/2.5/find?q=' + cityName + '&appid=3ff796ce952848366a2c9d57a6fa6042'
var weatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=&appid=' + apiKey;
var latitude
var longitude

function callAPI(request) {
    fetch(request)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
            latitude = data.list[0].coord.lat;
            longitude = data.list[0].coord.lon;
            console.log(longitude)
            
        })
}

callAPI(weatherCoord)

// 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=3ff796ce952848366a2c9d57a6fa6042'