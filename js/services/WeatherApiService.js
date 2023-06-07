import config from "../config.js";
class WeatherApiService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    getData(path) {
        let response = this.httpService.get({
            endpoint: config.weatherBaseUrl,
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
    getForeCastWeather(city, days) {
        return this.getData(`current.json?q=${city}`);
    }
}
export { WeatherApiService };
