import config from "../config.js";
class WeatherApiService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    getData(path) {
        let response = this.httpService.get({
            baseUrl: config.weatherBaseUrl,
            headers: {
                "X-RapidAPI-Key": config.weatherApiKey,
            },
            path: path
        });
        return response;
    }
    getRealTimeWeather(city) {
        return this.getData(`current.json?q=${city}`);
    }
    getForecastWeather(city, days) {
        return this.getData(`forecast.json?q=${city}&days=${days}`);
    }
}
export { WeatherApiService };
