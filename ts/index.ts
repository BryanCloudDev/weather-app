import { IRealTimeWeather } from "./interfaces/Responses/IRealTimeWeather.js";
import { GeoLocationService } from "./services/GeoLocationService.js";
import { HttpService } from "./services/HttpService.js";
import { WeatherApiService } from "./services/WeatherApiService.js";

const httpService = new HttpService();
const weatherApiService = new WeatherApiService(httpService);
const geolocationService = new GeoLocationService();

let condition = document.getElementById("condition") as HTMLElement;
let date = document.getElementById("date") as HTMLElement;
let inputLocation = document.getElementById("inputLocation") as HTMLInputElement;
let temperature = document.getElementById("temperature") as HTMLElement;
let search = document.getElementById("search") as HTMLElement;
let imgWeather = document.getElementById("imgWeather") as HTMLImageElement;

function convertDate(fecha: string): string {
	const date = new Date(fecha);
	const dia = date.getDate().toString().padStart(2, '0');
	const mes = (date.getMonth() + 1).toString().padStart(2, '0');
	const hora = date.getHours().toString().padStart(2, '0');
	const minutos = date.getMinutes().toString().padStart(2, '0');

	return `${dia}/${mes} ${hora}:${minutos}`;
}

function setWeatherData(weatherResponse: IRealTimeWeather) {
	condition.innerHTML = weatherResponse.current.condition.text;
	date.innerHTML = convertDate(weatherResponse.location.localtime);
	temperature.innerHTML = Math.floor(weatherResponse.current.temp_c).toString();
	imgWeather.src = weatherResponse.current.condition.icon.replace("64x64","128x128");
	imgWeather.alt = weatherResponse.current.condition.text;
}

async function makeSearchAndSetFields(search: string) {
	let weatherResponse = await weatherApiService.getRealTimeWeather(search);
	setWeatherData(weatherResponse);
}

// (async () => {
// 	let { latitude, longitude } = await geolocationService.getUserLocation();
// 	makeSearchAndSetFields(`${latitude}, ${longitude}`)
// })();

search.addEventListener('click', async (e) => {
	e.preventDefault();
	let cleanInputData = inputLocation.value.trim();
	if (cleanInputData){
		makeSearchAndSetFields(cleanInputData);
	}
})




