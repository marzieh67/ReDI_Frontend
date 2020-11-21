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
const windSpeedElement = document.querySelector(".wind p");
const PressureElement = document.querySelector(".pressure p");

const temMax0Element = document.querySelector(".temperature-Max-day0-value");
const temMax1Element = document.querySelector(".temperature-Max-day1-value");
const temMax2Element = document.querySelector(".temperature-Max-day2-value");
const temMax3Element = document.querySelector(".temperature-Max-day3-value");
const temMax4Element = document.querySelector(".temperature-Max-day4-value");
const temMax5Element = document.querySelector(".temperature-Max-day5-value");
const temMax6Element = document.querySelector(".temperature-Max-day6-value");

const temMin0Element = document.querySelector(".temperature-Min-day0-value");
const temMin1Element = document.querySelector(".temperature-Min-day1-value");
const temMin2Element = document.querySelector(".temperature-Min-day2-value");
const temMin3Element = document.querySelector(".temperature-Min-day3-value");
const temMin4Element = document.querySelector(".temperature-Min-day4-value");
const temMin5Element = document.querySelector(".temperature-Min-day5-value");
const temMin6Element = document.querySelector(".temperature-Min-day6-value");

const iconDay0Element = document.querySelector(".weather-day0-icon");
const iconDay1Element = document.querySelector(".weather-day1-icon");
const iconDay2Element = document.querySelector(".weather-day2-icon");
const iconDay3Element = document.querySelector(".weather-day3-icon");
const iconDay4Element = document.querySelector(".weather-day4-icon");
const iconDay5Element = document.querySelector(".weather-day5-icon");
const iconDay6Element = document.querySelector(".weather-day6-icon");

const day0Element = document.getElementById("day0");
const day1Element = document.getElementById("day1");
const day2Element = document.getElementById("day2");
const day3Element = document.getElementById("day3");
const day4Element = document.getElementById("day4");
const day5Element = document.getElementById("day5");
const day6Element = document.getElementById("day6");


//const tempPredMaxElement = document.querySelector(".tempPredMax");
//const tempPredMinElement = document.querySelector(".tempPredMin");
//const tempPredIconElement = document.querySelector(".weather-pred-icon");
//const dayElement = document.querySelector(".day");


//App data

const weather = {};
var coordinate = [];

//GET WEATHER FROM API Provider
const key = "c71eb334b9f16ce9ac215af9464c2b86";
document.getElementById("citySearch").addEventListener("click", getCoordinate);

function getCoordinate() {
    let cityName = document.getElementById("searchBar").value;
    console.log(cityName);
    const apiLoc = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;

    console.log(apiLoc);
    fetch(apiLoc)
        .then(function (response) {
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
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature = Math.floor(data.current.temp);
            weather.temperature_FeelsLike = Math.floor(data.current.feels_like);
            weather.humidity = data.current.humidity;
            weather.description = data.current.weather[0].description;
            weather.iconId = data.current.weather[0].icon;
            weather.windSpeed = data.current.wind_speed;
            weather.pressure = data.current.pressure;

            weather.iconIdDay0 = data.daily[0].weather[0].icon;
            weather.iconIdDay1 = data.daily[1].weather[0].icon;
            weather.iconIdDay2 = data.daily[2].weather[0].icon;
            weather.iconIdDay3 = data.daily[3].weather[0].icon;
            weather.iconIdDay4 = data.daily[4].weather[0].icon;
            weather.iconIdDay5 = data.daily[5].weather[0].icon;
            weather.iconIdDay6 = data.daily[6].weather[0].icon;
            dailyTemperature = [];


            // dailyTemperature[i].className = "card-content";
            //dailyTemperature[i].id = "tempPredValue";
            //tempPredValueElement.appendChild(dailyTemperature[i]);
            //weather.tempDay = data.daily[i].temp.day;
            // console.log(weather.tempDay);
            //tempPredValueElement.innerHTML = `${weather.tempDay}&#176 <span> C</span>`;


            weather.temMaxDay0 = Math.floor(data.daily[0].temp.max);
            weather.temMaxDay1 = Math.floor(data.daily[1].temp.max);
            weather.temMaxDay2 = Math.floor(data.daily[2].temp.max);
            weather.temMaxDay3 = Math.floor(data.daily[3].temp.max);
            weather.temMaxDay4 = Math.floor(data.daily[4].temp.max);
            weather.temMaxDay5 = Math.floor(data.daily[5].temp.max);
            weather.temMaxDay6 = Math.floor(data.daily[6].temp.max);


            weather.temMinDay0 = Math.floor(data.daily[0].temp.min);
            weather.temMinDay1 = Math.floor(data.daily[1].temp.min);
            weather.temMinDay2 = Math.floor(data.daily[2].temp.min);
            weather.temMinDay3 = Math.floor(data.daily[3].temp.min);
            weather.temMinDay4 = Math.floor(data.daily[4].temp.min);
            weather.temMinDay5 = Math.floor(data.daily[5].temp.min);
            weather.temMinDay6 = Math.floor(data.daily[6].temp.min);

            const unixTimestamp = data.current.dt;
            const timezoneOffset = data.timezone_offset;
            const milliseconds = (unixTimestamp + timezoneOffset) * 1000;
            const currentDateObject = new Date(milliseconds);
            weather.currentDate = currentDateObject.toLocaleString("en-GB", {
                timeZone: "UTC",
            });
            var today = getDaysOfWeek(currentDateObject.getDay());
            weather.dayOfWeek = today;

            weather.day0OfWeekPred = getDaysOfWeek(((currentDateObject.getDay()) + 0 + 1) % 7);
            weather.day1OfWeekPred = getDaysOfWeek(((currentDateObject.getDay()) + 1 + 1) % 7);
            weather.day2OfWeekPred = getDaysOfWeek(((currentDateObject.getDay()) + 2 + 1) % 7);
            weather.day3OfWeekPred = getDaysOfWeek(((currentDateObject.getDay()) + 3 + 1) % 7);
            weather.day4OfWeekPred = getDaysOfWeek(((currentDateObject.getDay()) + 4 + 1) % 7);
            weather.day5OfWeekPred = getDaysOfWeek(((currentDateObject.getDay()) + 5 + 1) % 7);
            weather.day6OfWeekPred = getDaysOfWeek(((currentDateObject.getDay()) + 6 + 1) % 7);
    

            /*

            for (var records = 0; records < data.daily.length; records++) {
                var iconContainer = document.getElementById("predIcon");
                var divIcon = document.createElement('div');
                divIcon.classList.add("item");
                weather.predIconId = data.daily[records].weather[0].icon;
                divIcon.innerHTML = `<img src="images/icons/${weather.predIconId}.svg"/>`;
                iconContainer.appendChild(document.createElement('p'));
                iconContainer.appendChild(divIcon);


                var tempMaxContainer = document.getElementById("predMaxTemp");
                var divMaxTemp = document.createElement('div');
                weather.predTempMax = Math.floor(data.daily[records].temp.max);
                divMaxTemp.innerHTML = `${weather.predTempMax}&#176 <span> C &#8673</span>`;
                tempMaxContainer.appendChild(document.createElement('p'));
                tempMaxContainer.appendChild(divMaxTemp);

                var tempMinContainer = document.getElementById("predMinTemp");
                var divMinTemp = document.createElement('div');
                weather.predTempMin = Math.floor(data.daily[records].temp.min);
                divMinTemp.innerHTML = `${weather.predTempMin}&#176 <span> C &#8675</span>`;
                tempMinContainer.appendChild(document.createElement('p'));
                tempMinContainer.appendChild(divMinTemp);

                var dayContainer = document.getElementById("predDay");
                var divDay = document.createElement('div');
                weather.dayOfWeekPred = getDaysOfWeek(((currentDateObject.getDay()) + records + 1) % 7);
                console.log(getDaysOfWeek((currentDateObject.getDay() + records) % 7));
                divDay.innerHTML = `${weather.dayOfWeekPred}`;
                dayContainer.appendChild(document.createElement('p'));
                dayContainer.appendChild(divDay);
                 // let predictedElement = document.getElementById("predictionElement");
                //predictedElement.appendChild(document.createElement('p'));
                //predictedElement.appendChild(divIcon);
                predictedElement.innerHTML = `${weather.dayOfWeekPred}
                                              <img src="icons/${weather.predIconId}.svg"/>
                                              ${weather.predTempMax}&#176 <span> C &#8673</span>
                                              ${weather.predTempMin}&#176 <span> C &#8675</span>`;
                                             

            } */

        })
        .then(function () {
            displayWeather();
        });
}

function getDaysOfWeek(x) {
    switch (x) {
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
    }
    return day;
}



function displayWeather() {
    iconElement.innerHTML = `<img src="images/icons/${weather.iconId}.svg"/>`;
    tempElement.innerHTML = `${weather.temperature} &#176 <span> C</span>`;
    tempFeelsElement.innerHTML = `${weather.temperature_FeelsLike} &#176 <span> C</span>`;
    tempMinElement.innerHTML = `${weather.temperatureMin} &#176 <span> C</span>`;
    tempMaxElement.innerHTML = `${weather.temperatureMax} &#176 <span> C</span>`;
    humidityElement.innerHTML = `${weather.humidity} <span>&#37</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    currentDateElement.innerHTML = `${weather.dayOfWeek}, ${weather.currentDate}`;

    temMax0Element.innerHTML = `${weather.temMaxDay0} &#176 <span> C &#8673</span>`;
    temMax1Element.innerHTML = `${weather.temMaxDay1} &#176 <span> C &#8673</span>`;
    temMax2Element.innerHTML = `${weather.temMaxDay2} &#176 <span> C &#8673</span>`;
    temMax3Element.innerHTML = `${weather.temMaxDay3} &#176 <span> C &#8673</span>`;
    temMax4Element.innerHTML = `${weather.temMaxDay4} &#176 <span> C &#8673</span>`;
    temMax5Element.innerHTML = `${weather.temMaxDay5} &#176 <span> C &#8673</span>`;
    temMax6Element.innerHTML = `${weather.temMaxDay6} &#176 <span> C &#8673</span>`;

    temMin0Element.innerHTML = `${weather.temMinDay0} &#176 <span> C &#8675</span>`;
    temMin1Element.innerHTML = `${weather.temMinDay1} &#176 <span> C &#8675</span>`;
    temMin2Element.innerHTML = `${weather.temMinDay2} &#176 <span> C &#8675</span>`;
    temMin3Element.innerHTML = `${weather.temMinDay3} &#176 <span> C &#8675</span>`;
    temMin4Element.innerHTML = `${weather.temMinDay4} &#176 <span> C &#8675</span>`;
    temMin5Element.innerHTML = `${weather.temMinDay5} &#176 <span> C &#8675</span>`;
    temMin6Element.innerHTML = `${weather.temMinDay6} &#176 <span> C &#8675</span>`;


    iconDay0Element.innerHTML = `<img src="images/icons/${weather.iconIdDay0}.svg"/>`;
    iconDay1Element.innerHTML = `<img src="images/icons/${weather.iconIdDay1}.svg"/>`;
    iconDay2Element.innerHTML = `<img src="images/icons/${weather.iconIdDay2}.svg"/>`;
    iconDay3Element.innerHTML = `<img src="images/icons/${weather.iconIdDay3}.svg"/>`;
    iconDay4Element.innerHTML = `<img src="images/icons/${weather.iconIdDay4}.svg"/>`;
    iconDay5Element.innerHTML = `<img src="images/icons/${weather.iconIdDay5}.svg"/>`;
    iconDay6Element.innerHTML = `<img src="images/icons/${weather.iconIdDay6}.svg"/>`;
    
    day0Element.innerHTML = `${weather.day0OfWeekPred}`;
    day1Element.innerHTML = `${weather.day1OfWeekPred}`;
    day2Element.innerHTML = `${weather.day2OfWeekPred}`;
    day3Element.innerHTML = `${weather.day3OfWeekPred}`;
    day4Element.innerHTML = `${weather.day4OfWeekPred}`;
    day5Element.innerHTML = `${weather.day5OfWeekPred}`;
    day6Element.innerHTML = `${weather.day6OfWeekPred}`;
    windSpeedElement.innerHTML = `${weather.windSpeed} <span> m/s </span>`;
    PressureElement.innerHTML = `${weather.pressure} <span> Pa </span>`


    //tempPredValue.innerHTML = weather.predTempDay;

}

