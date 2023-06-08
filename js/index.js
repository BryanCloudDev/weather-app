import { GeoLocationService } from "./services/GeoLocationService.js";
import { HttpService } from "./services/HttpService.js";
import { WeatherApiService } from "./services/WeatherApiService.js";
const httpService = new HttpService();
const weatherApiService = new WeatherApiService(httpService);
const geolocationService = new GeoLocationService();
let condition = document.getElementById("condition");
let date = document.getElementById("date");
let inputLocation = document.getElementById("inputLocation");
let temperature = document.getElementById("temperature");
let search = document.getElementById("search");
let imgWeather = document.getElementById("imgWeather");
let forecastBox = document.getElementById("forecast");
function convertDate(fecha) {
    console.log(moment(fecha));
    return moment(fecha).format('DD/MM HH:mm');
}
function setWeatherData(weatherResponse) {
    condition.innerHTML = weatherResponse.current.condition.text;
    date.innerHTML = convertDate(weatherResponse.location.localtime);
    temperature.innerHTML = Math.floor(weatherResponse.current.temp_c).toString();
    imgWeather.src = weatherResponse.current.condition.icon.replace("64x64", "128x128");
    imgWeather.alt = weatherResponse.current.condition.text;
}
async function makeSearchAndSetFields(search) {
    let weatherResponse = await weatherApiService.getForecastWeather(search, 3);
    setWeatherData(weatherResponse);
    let { forecast } = weatherResponse;
    console.log(weatherResponse);
    forecast?.forecastday.forEach(day => {
        forecastBox.innerHTML += createForecastElement(day);
    });
}
function getDayName(forecastDate) {
    let dateForecast = moment(forecastDate);
    let dayForecast = dateForecast.day();
    let todayDate = moment();
    let todayDay = todayDate.day();
    let days = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday"
    };
    return todayDay === dayForecast ? "Today" : days[dayForecast];
}
// (async () => {
// 	let { latitude, longitude } = await geolocationService.getUserLocation();
// 	makeSearchAndSetFields(`${latitude}, ${longitude}`)
// })();
search.addEventListener('click', async (e) => {
    e.preventDefault();
    let cleanInputData = inputLocation.value.trim();
    if (cleanInputData) {
        makeSearchAndSetFields(cleanInputData);
    }
});
function createForecastElement({ date, day, }) {
    let { maxtemp_c, mintemp_c, condition } = day;
    return `
	<li class="forecastElement">
    <div class="leftContent">
      <img src="${condition.icon}" alt="${condition.text}">
      <p>${getDayName(date)}</p>
    </div>
    <div class="rightContent">
			<p>
        <span>${Math.floor(maxtemp_c)}</span>°/<span>${Math.floor(mintemp_c)}</span>°
      </p>
    </div>
  </li>`;
}
