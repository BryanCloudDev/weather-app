import { HttpService } from "./services/HttpService.js";
import { WeatherApiService } from "./services/WeatherApiService.js";
const httpService = new HttpService();
const weatherApiService = new WeatherApiService(httpService);
let data = await weatherApiService.getForecastWeather("Santa Tecla", 2);
console.log({ data });
