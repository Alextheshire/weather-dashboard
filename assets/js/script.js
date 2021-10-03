var apiKey =  '3ff796ce952848366a2c9d57a6fa6042'
var weatherCoord 
var searchCities = JSON.parse(localStorage.getItem("searchCities")) || []
var searchButton = $("#searchBtn")
var searchList = $("#searchList")
var previousSearch = $('li')


console.log(searchCities)
function callAPI(request) {
    fetch(request)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
            var latitude = data.list[0].coord.lat;
            var longitude = data.list[0].coord.lon;
            console.log(latitude)
            console.log(longitude)
            var weatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=&appid=' + apiKey;
            console.log(weatherAPI)
            fetch(weatherAPI)
                .then(function(response) {
                    return response.json()
                })
                .then(function(data) {
                    console.log(data)
                    
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
        previousSearch = $('li')

    }
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
    console.log(searchInput)
    searchCities.unshift(searchInput)
    console.log(searchCities)
    localStorage.setItem("searchCities", JSON.stringify(searchCities))
    populateList()
    var cityName = searchCities[0]
    weatherCoord = 'https://api.openweathermap.org/data/2.5/find?q=' + cityName + '&appid=3ff796ce952848366a2c9d57a6fa6042'
    callAPI(weatherCoord)

    }
}
function prevCitySearch(event) {
    event.preventDefault()
    var whatYouClickedOn = $(event.target)
    var searchInput = whatYouClickedOn.text()
    console.log(searchInput)

    if(searchInput == "") {
        return
    } else {
        for( var i = 0; i < searchCities.length; i++){ 
    
            if ( searchCities[i] == searchInput) { 
        
                searchCities.splice(i, 1); 
            }}
    console.log(searchInput)
    searchCities.unshift(searchInput)
    console.log(searchCities)
    localStorage.setItem("searchCities", JSON.stringify(searchCities))
    populateList()
    var cityName = searchCities[0]
    weatherCoord = 'https://api.openweathermap.org/data/2.5/find?q=' + cityName + '&appid=3ff796ce952848366a2c9d57a6fa6042'
    callAPI(weatherCoord)

    }
}
populateList()
var previousSearch = $('li')
searchButton.click(citySearch)
previousSearch.click(prevCitySearch)
// 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=3ff796ce952848366a2c9d57a6fa6042'