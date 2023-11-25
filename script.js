const key = "e4266d2a6b4c31917334c9fe29c0245b"

const searchBTN = document.getElementById("search-button")
const cityInput = document.getElementById("cityInput")
const currentWeather = document.querySelector(".currentWeather")
const weatherCards = document.querySelector(".weatherCards")
// data goes here
const placeInfo = (forcastInput) => {
    return `<li class="dayCard">
                <h4>` + forcastInput.dt_txt.split(" ")[0] + `</h4>
                <img src="https://openweathermap.org/img/wn/` + forcastInput.weather[0].icon + `@2x.png" alt="weather icon">
                <h6>Temp: ` + ((forcastInput.main.temp - 273.15) * 9/5 + 32).toFixed(2) + `°F</h6>
                <h6>Wind: ` + forcastInput.wind.speed + `m/s</h6>
                <h6>Humidity: ` + forcastInput.main.humidity + `%</h6> 
            </li>`;
}


searchBTN.addEventListener('click', searchCity)

function searchCity() {
    // user city
    var searchInfo = cityInput.value.trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchInfo + "&appid=" + key;
    // maybe clear input feild???
    if (!searchInfo) return;
    console.log(searchInfo)

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
            // currentWeather = ""
            weatherCards.innerHTML = "";

            // inputs the data from api
            console.log(fiveDay);
            fiveDay.forEach(forcastInput => {
                weatherCards.insertAdjacentHTML("beforeend", placeInfo(forcastInput));
                
            })

        }
        )
}
// recentCities()
