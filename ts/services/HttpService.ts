import IHttpProperties from "../interfaces/IHttpProperties";

class HttpService {
  private _onError = false;

  private async makeHttpCall({ body, endpoint, headers, path }: IHttpProperties, method: string = "GET") {
    let headersToSend = new Headers(headers);
    try {
      let request = await fetch(`${endpoint}/${path}`, {
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

  public get({ endpoint, headers, path }: IHttpProperties) {
    let response = this.makeHttpCall({ endpoint, headers, path });
    return response;
  }
}

export { HttpService };
