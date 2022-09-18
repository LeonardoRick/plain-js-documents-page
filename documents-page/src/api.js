import environment from './environment';
class API {
    socket = new WebSocket(`${environment.websocketURl}/notifications`);

    listenToMessages(callback) {
        this.socket.addEventListener('message', (event) => {
            callback(JSON.parse(event.data));
        });
    }

    async getDocuments() {
        return fetch(`${environment.httpURl}/documents`).then((r) => r.json());
    }
}

export default API;
