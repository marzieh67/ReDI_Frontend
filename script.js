//SELECT ELEMENTS
///const Element= document.querySelector(".className");
const iconElement= document.querySelector(".weather-icon");
const tempElement= document.querySelector(".temperature-value p");
const descElement= document.querySelector(".temperature-description p");
const locationElement= document.querySelector(".location p");
const notificationElement= document.querySelector(".notification");

//App data

const weather = {};

//GET WEATHER FROM API Provider
const key = "c71eb334b9f16ce9ac215af9464c2b86";
const lat = "51.51";
const lon = "-0.13";
getWeather();

function getWeather (lat, lon){
    const api= `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${key}`;
    console.log(api);
    fetch(api).then(function(response){
       let data = response.json();
       return data;
    })
    .then(function(data){
        weather.temperature = Math.floor(data.main.temp);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    })
}
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature} &#176 <span> K</span>`;
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
