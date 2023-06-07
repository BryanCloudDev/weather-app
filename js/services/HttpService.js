class HttpService {
    _onError = false;
    async makeHttpCall({ body, endpoint, headers, path }, method = "GET") {
        let headersToSend = new Headers(headers);
        try {
            let request = await fetch(`${endpoint}/${path}`, {
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
    get({ endpoint, headers, path }) {
        let response = this.makeHttpCall({ endpoint, headers, path });
        return response;
    }
}
export { HttpService };
