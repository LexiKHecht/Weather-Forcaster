const key = "e4266d2a6b4c31917334c9fe29c0245b"

var searchBTN = document.getElementById("search-button")


var city;
var lat = data.coord.lat;

var lon;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
var oneCallURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + key;

searchBTN.addEventListener('click', searchCity)

function searchCity() {
    var searchInfo = document.querySelector(".form-control").value
console.log(searchInfo)
// maybe clear input feild
pullweather()
}


function pullweather(city) {
fetch(queryURL)
    .then (function(response) {
        localStorage.setItem("recentSearch", response.name);
        oneCall()
    });
}

function oneCall(r) {
fetch(oneCallURL)
    .then(function(response) {
console.log(latData)
    }
)}
// recentCities()
