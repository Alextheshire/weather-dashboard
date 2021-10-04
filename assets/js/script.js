var apiKey =  '3ff796ce952848366a2c9d57a6fa6042'
var weatherCoord 
var searchCities = JSON.parse(localStorage.getItem("searchCities")) || []
var searchButton = $("#searchBtn")
var searchList = $("#searchList")
var previousSearch = $('li')
function callAPI(request) {
    fetch(request)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            var latitude = data.list[0].coord.lat;
            var longitude = data.list[0].coord.lon;
            var weatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&exclude=&appid=' + apiKey;
            fetch(weatherAPI)
                .then(function(response) {
                    return response.json()
                })
                .then(function(data) {
                    cityName = searchCities[0]
                    $('.visually-hidden').each(function(i) {
                        $(this).removeClass('visually-hidden')
                    })
                    console.log(data)
                    $('#cityname').html(cityName + "(" + moment(data.daily[0].dt, "X").format("M/D/YYYY") + ")" + `<img src="http://openweathermap.org/img/wn/` + data.current.weather[0].icon + `@2x.png" alt="weather icon">`)
                    $('#temp').text('Temperature: ' + data.current.temp + '°')
                    $('#wind').text('Wind: ' + data.current.wind_speed + 'MPH')
                    $('#humidity').text('Humidity: ' + data.current.humidity + '%')
                    $('#uvindex').text(data.current.uvi)
                    for(i=1; i < 6; i++){
                        $('#date' + i).text(moment(data.daily[i].dt, "X").format("M/D/YYYY"))
                        $("#icon" + i).html(`<img src="http://openweathermap.org/img/wn/` + data.daily[i].weather[0].icon + `@2x.png" alt="weather icon">`)
                        $('#temp' + i).text('Temperature: ' + data.daily[i].temp.day + '°')
                        $('#wind' + i).text('Wind: ' + data.daily[i].wind_speed + 'MPH')
                        $('#humidity' + i).text('Humidity: ' + data.daily[i].humidity + '%')
                    }
                })
            
        })
}
function populateList() {
    searchList.html('');
    if(searchCities.length > 8) {searchCities.length = 8}
    for(i=0; i < searchCities.length; i++) {
        var cityList = document.createElement('li');
        cityList.textContent = searchCities[i];
        searchList.append(cityList)
        $('li').addClass('citylistitem')
        $('li').addClass('rounded')

        

    }
    previousSearch = $('li')
}

function citySearch(event) {
    event.preventDefault()
    var searchInput = $('#searchCity').val()
    if(searchInput == "") {
        return
    } else {
        for( var i = 0; i < searchCities.length; i++){ 
    
            if ( searchCities[i] == searchInput) { 
        
                searchCities.splice(i, 1); 
            }}
    searchCities.unshift(searchInput)
    localStorage.setItem("searchCities", JSON.stringify(searchCities))
    populateList()
    var cityName = searchCities[0]
    weatherCoord = 'https://api.openweathermap.org/data/2.5/find?q=' + cityName + '&appid=3ff796ce952848366a2c9d57a6fa6042'
    callAPI(weatherCoord)
    previousSearch.on("click", prevCitySearch)


    }
    $('#searchCity').val('')
}
function prevCitySearch(event) {
    event.preventDefault()
    var whatYouClickedOn = $(event.target)
    var searchInput = whatYouClickedOn.text()

    if(searchInput == "") {
        return
    } else {
        for( var i = 0; i < searchCities.length; i++){ 
    
            if ( searchCities[i] == searchInput) { 
        
                searchCities.splice(i, 1); 
            }}
    searchCities.unshift(searchInput)
    localStorage.setItem("searchCities", JSON.stringify(searchCities))
    populateList()
    var cityName = searchCities[0]
    weatherCoord = 'https://api.openweathermap.org/data/2.5/find?q=' + cityName + '&appid=3ff796ce952848366a2c9d57a6fa6042'
    callAPI(weatherCoord)
    previousSearch = $('li')
    previousSearch.on("click", prevCitySearch)

    }
}
populateList()
searchButton.on("click", citySearch)
previousSearch.on("click", prevCitySearch)
// 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=3ff796ce952848366a2c9d57a6fa6042'