//SELECT ELEMENTS
///const Element= document.querySelector(".className");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const tempFeelsElement = document.querySelector(".temperature-feels-value p");
const tempMinElement = document.querySelector(".temperature-min-value p");
const tempMaxElement = document.querySelector(".temperature-max-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const currentDateElement = document.querySelector(".currentDate p");
const humidityElement = document.querySelector(".humidity p");
const temDay0Element = document.querySelector(".temperature-day0-value");
const temDay1Element = document.querySelector(".temperature-day1-value");
const temDay2Element = document.querySelector(".temperature-day2-value");
const temDay3Element = document.querySelector(".temperature-day3-value");
const temDay4Element = document.querySelector(".temperature-day4-value");
const temDay5Element = document.querySelector(".temperature-day5-value");
const temDay6Element = document.querySelector(".temperature-day6-value");
const iconDay0Element = document.querySelector(".weather-day0-icon");
const iconDay1Element = document.querySelector(".weather-day1-icon");
const iconDay2Element = document.querySelector(".weather-day2-icon");
const iconDay3Element = document.querySelector(".weather-day3-icon");
const iconDay4Element = document.querySelector(".weather-day4-icon");
const iconDay5Element = document.querySelector(".weather-day5-icon");
const iconDay6Element = document.querySelector(".weather-day6-icon");

//App data

const weather = {};
var coordinate = [];


//GET WEATHER FROM API Provider
const key = "c71eb334b9f16ce9ac215af9464c2b86";
document.getElementById('citySearch').addEventListener('click', getCoordinate);

function getCoordinate() {
    let cityName = document.getElementById("searchBar").value;
    console.log(cityName);
    const apiLoc = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;

    console.log(apiLoc);
    fetch(apiLoc).then(function (response) {
        let dataLoc = response.json();
        return dataLoc;
    })
        .then(function (dataLoc) {

            var lon = dataLoc.coord.lon;
            var lat = dataLoc.coord.lat;
            weather.city = dataLoc.name;
            weather.country = dataLoc.sys.country;
            weather.temperatureMin = Math.floor(dataLoc.main.temp_min);
            weather.temperatureMax = Math.floor(dataLoc.main.temp_max);
            var geocoordinate = [lon, lat];
            return geocoordinate;
        })
        .then(function (geocoordinate) {
            getWeather(geocoordinate);
        });

}

function getWeather(geocoordinate) {
    lon = geocoordinate[0];
    lat = geocoordinate[1];

    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${key}&units=metric`;
    console.log(api);
    fetch(api).then(function (response) {
        let data = response.json();
        return data;
    })
        .then(function (data) {
            weather.temperature = Math.floor(data.current.temp);
            weather.temperature_FeelsLike = Math.floor(data.current.feels_like);
            weather.humidity = data.current.humidity;
            weather.description = data.current.weather[0].description;
            weather.iconId = data.current.weather[0].icon;
            weather.iconIdDay0 = data.daily[0].weather[0].icon;
            weather.iconIdDay1 = data.daily[1].weather[0].icon;
            weather.iconIdDay2 = data.daily[2].weather[0].icon;
            weather.iconIdDay3 = data.daily[3].weather[0].icon;
            weather.iconIdDay4 = data.daily[4].weather[0].icon;
            weather.iconIdDay5 = data.daily[5].weather[0].icon;
            weather.iconIdDay6 = data.daily[6].weather[0].icon;
            weather.temDay0 = Math.floor(data.daily[0].temp.day);
            weather.temDay1 = Math.floor(data.daily[1].temp.day);
            weather.temDay2 = Math.floor(data.daily[2].temp.day);
            weather.temDay3 = Math.floor(data.daily[3].temp.day);
            weather.temDay4 = Math.floor(data.daily[4].temp.day);
            weather.temDay5 = Math.floor(data.daily[5].temp.day);
            weather.temDay6 = Math.floor(data.daily[6].temp.day);
            const unixTimestamp = data.current.dt;
            const timezoneOffset = data.timezone_offset;
            const milliseconds = (unixTimestamp + timezoneOffset) * 1000;
            const dateObject = new Date(milliseconds)
            weather.currentDate = dateObject.toLocaleString('en-GB', { timeZone: 'UTC' });
            console.log(dateObject.getDay());
            var day = "";
            switch (dateObject.getDay()) {
                case 0:
                    day = "Sunday";
                    break;
                case 1:
                    day = "Monday";
                    break;
                case 2:
                    day = "Tuesday";
                    break;
                case 3:
                    day = "Wednesday";
                    break;
                case 4:
                    day = "Thursday";
                    break;
                case 5:
                    day = "Friday";
                    break;
                case 6:
                    day = "Saturday";
            };

            weather.dayOfWeek = day;
            console.log(weather.dayOfWeek);
        })
        .then(function () {
            displayWeather();
        });

}
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature} &#176 <span> C</span>`;
    tempFeelsElement.innerHTML = `${weather.temperature_FeelsLike} &#176 <span> C</span>`;
    tempMinElement.innerHTML = `${weather.temperatureMin} &#176 <span> C</span>`;
    tempMaxElement.innerHTML = `${weather.temperatureMax} &#176 <span> C</span>`;
    humidityElement.innerHTML = `${weather.humidity} <span>&#37</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    currentDateElement.innerHTML = `${weather.dayOfWeek}, ${weather.currentDate}`;
    temDay0Element.innerHTML = `${weather.temDay0} &#176 <span> C</span>`;
    temDay1Element.innerHTML = `${weather.temDay1} &#176 <span> C</span>`;
    temDay2Element.innerHTML = `${weather.temDay2} &#176 <span> C</span>`;
    temDay3Element.innerHTML = `${weather.temDay3} &#176 <span> C</span>`;
    temDay4Element.innerHTML = `${weather.temDay4} &#176 <span> C</span>`;
    temDay5Element.innerHTML = `${weather.temDay5} &#176 <span> C</span>`;
    temDay6Element.innerHTML = `${weather.temDay6} &#176 <span> C</span>`;
    iconDay0Element.innerHTML = `<img src="icons/${weather.iconIdDay0}.png"/>`;
    iconDay1Element.innerHTML = `<img src="icons/${weather.iconIdDay1}.png"/>`;
    iconDay2Element.innerHTML = `<img src="icons/${weather.iconIdDay2}.png"/>`;
    iconDay3Element.innerHTML = `<img src="icons/${weather.iconIdDay3}.png"/>`;
    iconDay4Element.innerHTML = `<img src="icons/${weather.iconIdDay4}.png"/>`;
    iconDay5Element.innerHTML = `<img src="icons/${weather.iconIdDay5}.png"/>`;
    iconDay6Element.innerHTML = `<img src="icons/${weather.iconIdDay6}.png"/>`;
}

