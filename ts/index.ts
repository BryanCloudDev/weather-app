import moment from "moment";
import { Forecastday } from "./interfaces/Responses/IForecastWeather";
import { IRealTimeWeather } from "./interfaces/Responses/IRealTimeWeather";
import { GeoLocationService } from "./services/GeoLocationService";
import { HttpService } from "./services/HttpService";
import { WeatherApiService } from "./services/WeatherApiService";
import { convertDate, getDayName, showErrorMessage } from '../helpers/helpers';

let alertBox = document.getElementById("alert") as HTMLElement;
let condition = document.getElementById("condition") as HTMLElement;
let dataText = document.querySelector(".dataText") as HTMLElement;
let date = document.getElementById("date") as HTMLElement;
let dateCreated = document.getElementById("dateCreated") as HTMLElement;
let dayTimeColorBox = document.getElementById("dayTimeColor") as HTMLElement;
let forecastBox = document.getElementById("forecast") as HTMLElement;
let getWeatherButton = document.getElementById("getWeather") as HTMLElement;
let imgWeather = document.getElementById("imgWeather") as HTMLImageElement;
let inputLocation = document.getElementById("inputLocation") as HTMLInputElement;
let loadingIcon = document.querySelector(".spinner") as HTMLElement;
let search = document.getElementById("search") as HTMLElement;
let searchIcon = document.querySelector(".searchIcon") as HTMLElement;
let temperature = document.getElementById("temperature") as HTMLElement;
let weatherImg = document.querySelector(".weatherImg") as HTMLElement;

function getBackgroundColor(code: number) {
	let color1 = "#6ccbfc";
	let color2 = "#46c0ff";
	let color3 = "#3ca3f8";
	let color4 = "#2fcdf5";
	let color5 = "#7445b4";

	let backgroundColors = {
		1000: color2,
		1003: color3,
		1009: color3,
		1030: color3,
		1063: color3,
		1066: color1,
		1069: color1,
		1072: color1,
		1114: color1,
		1135: color4,
		1147: color4,
		1180: color3,
		1183: color3,
		1186: color3,
		1187: color5,
		1117: color1,
		1189: color3,
		1192: color5,
		1195: color5,
		1198: color3,
		1201: color3,
		1150: color1,
		1153: color1,
		1210: color1,
		1213: color1,
		1216: color1,
		1219: color1,
		1222: color1,
		1225: color1,
		1240: color3,
		1243: color5,
		1246: color5,
		1255: color1,
		1258: color1,
		1273: color5,
		1276: color5,
		1279: color1,
		1282: color1,
	}

	return backgroundColors[code] ? backgroundColors[code] : color2;
}

function setWeatherData(weatherResponse: IRealTimeWeather) {

	condition.innerHTML = weatherResponse.current.condition.text;
	date.innerHTML = convertDate(weatherResponse.location.localtime);
	temperature.innerHTML = Math.floor(weatherResponse.current.temp_c).toString();
	imgWeather.src = weatherResponse.current.condition.icon.replace("64x64","128x128");
	imgWeather.alt = weatherResponse.current.condition.text;
}

function setAnimationsToFields(weatherResponse: IRealTimeWeather) {
	forecastBox.classList.add('animate__animated', 'animate__backInUp');
	dayTimeColorBox.style.backgroundColor = getBackgroundColor(weatherResponse.current.condition.code);
	dataText.classList.add('animate__animated', 'animate__pulse');
	weatherImg.classList.add('animate__animated', 'animate__pulse');

	setTimeout(() => {
		forecastBox.classList.remove('animate__animated', 'animate__backInUp');
		dayTimeColorBox.style.backgroundColor = getBackgroundColor(weatherResponse.current.condition.code);
		dataText.classList.remove('animate__animated', 'animate__pulse');
		weatherImg.classList.remove('animate__animated', 'animate__pulse');
	}, 2000);
}

function toggleLoadingIcons() {
	searchIcon.classList.toggle('disabled');
	loadingIcon.classList.toggle('disabled');
}

async function makeSearchAndSetFields(searchQuery: string) {
	search.removeEventListener('click', searchCallback);
	toggleLoadingIcons();

	let weatherResponse = await weatherApiService.getForecastWeather(searchQuery, 3);

	if(weatherResponse.error){
		showErrorMessage(weatherResponse.error, alertBox);
		return;
	}

	setWeatherData(weatherResponse);

	let { forecast } = weatherResponse;
	
	forecast?.forecastday.forEach( day => {
		forecastBox.innerHTML += createForecastElement(day);
	})

	setAnimationsToFields(weatherResponse);
	search.addEventListener('click', searchCallback);

	toggleLoadingIcons();
}

async function searchCallback( e: Event ) {
	forecastBox.innerHTML = '';
	e.preventDefault();

	let cleanInputData = inputLocation.value.trim();
	let isDataValid = validateDataFromInput(cleanInputData);

	if (!cleanInputData || !isDataValid) {
		showErrorMessage("A valid location has to be entered.", alertBox);
		return;
	};
	makeSearchAndSetFields(cleanInputData);
}

function createForecastElement({ date, day, }: Forecastday) {
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
  </li>`
}

function validateDataFromInput( value: string ) {
	const regex = /^[a-zA-Z\sñáéíóúÑÁÉÍÓÚ]+$/;
	return regex.test(value);
}

const httpService = new HttpService();
const weatherApiService = new WeatherApiService(httpService);
const geolocationService = new GeoLocationService();

(() => {
	dateCreated.innerHTML = moment().format("YYYY");
})();

search.addEventListener('click', searchCallback);

getWeatherButton.addEventListener('click', async e => {
	e.preventDefault();

	let { latitude, longitude } = await geolocationService.getUserLocation();

	if(!latitude){
		showErrorMessage("No permission was given to get the weather on your area, you may type on the text box the desired location you want to check", alertBox);
		return;
	}
	makeSearchAndSetFields(`${latitude}, ${longitude}`);
})