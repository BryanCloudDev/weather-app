import config from "../config.js";
import { HttpService } from "./HttpService.js";

class WeatherApiService {
  constructor(
    private httpService: HttpService
  ) { }

  private getData( path: string ) {
    let response = this.httpService.get({
      endpoint: config.weatherBaseUrl,
      headers: {
        "X-RapidAPI-Key": config.weatherApiKey,
      },
      path: path
    })

    return response;
  }

  getRealTimeWeather(city: string): Promise<IRealTimeWeather> {
    return this.getData(`current.json?q=${city}`);
  }

  getForeCastWeather( city: string, days: number ) {
    return this.getData(`current.json?q=${city}`);
  }
}

export { WeatherApiService };