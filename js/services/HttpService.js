class HttpService {
    _onError = false;
    async makeHttpCall({ baseUrl, body, headers, path }, method = "GET") {
        let headersToSend = new Headers(headers);
        try {
            let request = await fetch(`${baseUrl}/${path}`, {
                body: body,
                headers: headersToSend,
                method: method
            });
            let data = await request.json();
            return data;
        }
        catch (error) {
            console.log(error.message);
            return this._onError;
        }
    }
    get({ baseUrl, headers, path }) {
        let response = this.makeHttpCall({ baseUrl, headers, path });
        return response;
    }
}
export { HttpService };
