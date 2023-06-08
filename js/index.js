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
function convertDate(fecha) {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const hora = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes} ${hora}:${minutos}`;
}
function setWeatherData(weatherResponse) {
    condition.innerHTML = weatherResponse.current.condition.text;
    date.innerHTML = convertDate(weatherResponse.location.localtime);
    // inputLocation.value = weatherResponse.location.name;
    temperature.innerHTML = Math.floor(weatherResponse.current.temp_c).toString();
}
// ( async () => {
// 	let { latitude, longitude } = await geolocationService.getUserLocation();
// 	let weatherResponse = await weatherApiService.getRealTimeWeather(`${latitude}, ${longitude}`);
// 	setWeatherData(weatherResponse);
// })();
search.addEventListener('click', async (e) => {
    e.preventDefault();
    let cleanInputData = inputLocation.value.trim();
    let weatherResponse = await weatherApiService.getRealTimeWeather(cleanInputData);
    setWeatherData(weatherResponse);
});
