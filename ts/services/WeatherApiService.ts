import config from "../config.js";
import { IRealTimeWeather } from "../interfaces/Responses/IRealTimeWeather";
import { HttpService } from "./HttpService.js";

class WeatherApiService {
  constructor(
    private httpService: HttpService
  ) { }

  private getData( path: string ) {
    let response = this.httpService.get({
      baseUrl: config.weatherBaseUrl,
      headers: {
        "X-RapidAPI-Key": config.weatherApiKey,
      },
      path: path
    })

    return response;
  }

  getRealTimeWeather(city: string): Promise<IRealTimeWeather> {
    return this.getData(`current.json?q=${ city }`);
  }

  getForecastWeather(city: string, days: number): Promise<IRealTimeWeather> {
    return this.getData(`forecast.json?q=${ city }&days=${ days }`);
  }
}

export { WeatherApiService };