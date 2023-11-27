const key = "e4266d2a6b4c31917334c9fe29c0245b"

const searchBTN = document.getElementById("search-button")
const reloadBTN = document.querySelector("prev-city")
const cityInput = document.getElementById("cityInput")
const currentWeather = document.querySelector(".currentWeather")
const weatherCards = document.querySelector(".weatherCards")


// data goes in here
const placeInfo = (searchInfo, forcastInput, index) => {
    if (index === 0) {
        return `<div class="currentData">
                    <h2>` + searchInfo + ` ` + forcastInput.dt_txt.split(" ")[0] + `</h2>
                    <h6>Temp: ` + ((forcastInput.main.temp - 273.15) * 9 / 5 + 32).toFixed(2) + `°F</h6>
                    <h6>Wind: ` + forcastInput.wind.speed + `m/s</h6>
                    <h6>Humidity: ` + forcastInput.main.humidity + `%</h6> 
                </div>
                <div class="cute">
                <img src="https://openweathermap.org/img/wn/` + forcastInput.weather[0].icon + `@2x.png" alt="weather icon">
                    <h6>` + forcastInput.weather[0].description + `</h6>
                </div>`;
    } else {
        return `<li class="dayCard">
                    <h4>` + forcastInput.dt_txt.split(" ")[0] + `</h4>
                    <img src="https://openweathermap.org/img/wn/` + forcastInput.weather[0].icon + `@2x.png" alt="weather icon">
                    <h6>Temp: ` + ((forcastInput.main.temp - 273.15) * 9 / 5 + 32).toFixed(2) + `°F</h6>
                    <h6>Wind: ` + forcastInput.wind.speed + `m/s</h6>
                    <h6>Humidity: ` + forcastInput.main.humidity + `%</h6> 
                </li>`;
    }
}

$(document).ready(function (){
    localStorage.clear();
    // getting prev search history from local storage upon page loading
    var localCities = JSON.parse(localStorage.getItem("city")) || []
    var cities = [];

    function cityAllStorage (){

        for (i=0; i<localCities.length; i++){

            $(".list").prepend("<button type='button' class='btn btn-light prev-city'>"+ cities[i]+ "</button>");
        }
        
    }
    console.log(localStorage.getItem("city"));
    cityAllStorage();
});


searchBTN.addEventListener('click', searchCity)
// reloadBTN.addEventListener('click', searchCity)

function searchCity() {

    // user city
    var localCities = JSON.parse(localStorage.getItem("city")) || []
    var cities = [];
    var searchInfo = cityInput.value.trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchInfo + "&appid=" + key;
    // maybe clear input feild???
    if (!searchInfo) return;
    console.log(searchInfo)

    localCities = searchInfo.split(",");
    console.log(cities)
    cities.push(localCities)

    // saving and retreiving from local storage
    localStorage.setItem("city", JSON.stringify(searchInfo));
    $(".list").append("<button class='btn btn-light prev-city'>"+ cities + "</button>")

    

    // get city info
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            const { name, coord } = data;
            console.log(data);
            getForcast(name, coord.lat, coord.lon);


        });

}




// 5 day forcast
function getForcast(searchInfo, lat, lon) {
    const forcastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + key;
    var forcastDays = [];
    // get forcast data
    fetch(forcastURL)
        .then(responce => responce.json())
        .then(data => {

            // one forcast a day
            var fiveDay = data.list.filter(weather => {
                var date = new Date(weather.dt_txt).getDate();
                if (!forcastDays.includes(date)) {
                    return forcastDays.push(date);
                }
            });

            // clean slate
            cityInput.value = "";
            currentWeather.innerHTML = "";
            weatherCards.innerHTML = "";

            // inputs the data from api
            console.log(fiveDay);
            fiveDay.forEach((forcastInput, index) => {
                if (index === 0) {
                    currentWeather.insertAdjacentHTML("beforeend", placeInfo(searchInfo, forcastInput, index));
                } else {
                    weatherCards.insertAdjacentHTML("beforeend", placeInfo(searchInfo, forcastInput, index));
                }


            })

        }
        )
}

