import IHttpProperties from "../interfaces/IHttpProperties";

class HttpService {
  private _onError = false;

  private async makeHttpCall({ baseUrl, body, headers, path }: IHttpProperties, method: string = "GET") {
    let headersToSend = new Headers(headers);
    try {
      let request = await fetch(`${baseUrl}/${path}`, {
        body: body,
        headers: headersToSend,
        method: method
      });

      let data = await request.json();

      return data;

    } catch (error) {
      console.log(error.message);
      return this._onError;
    }
  }

  public get({ baseUrl, headers, path }: IHttpProperties) {
    let response = this.makeHttpCall({ baseUrl, headers, path });
    return response;
  }
}

export { HttpService };
