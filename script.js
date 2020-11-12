//SELECT ELEMENTS
///const Element= document.querySelector(".className");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const tempFeelsElement = document.querySelector(".temperature-feels-value p");
const tempMinElement = document.querySelector(".temperature-min-value p");
const tempMaxElement = document.querySelector(".temperature-max-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const humidityElement = document.querySelector(".humidity p");

//App data

const weather = {};

//GET WEATHER FROM API Provider
const key = "c71eb334b9f16ce9ac215af9464c2b86";
document.getElementById('citySearch').addEventListener('click', getWeather);

function getWeather() {
    let cityName = document.getElementById("searchBar").value;
    console.log(cityName);
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
    console.log(api);
    fetch(api).then(function (response) {
        let data = response.json();
        return data;
        console.log(data);
    })
        .then(function (data) {
            weather.temperature = Math.floor(data.main.temp);
            weather.temperature_FeelsLike = Math.floor(data.main.feels_like);
            weather.temperatureMin = Math.floor(data.main.temp_min);
            weather.temperatureMax = Math.floor(data.main.temp_max);
            weather.humidity = data.main.humidity;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            console.log(weather.humidity);
            console.log(weather.description);
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
}






















//const api_url= 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=c71eb334b9f16ce9ac215af9464c2b86';






/*
async function getTepm(){
    const response=await fetch(api_url);
    const data = await response.json();
    console.log(data);
}
getTepm();
 */




/*


*/
