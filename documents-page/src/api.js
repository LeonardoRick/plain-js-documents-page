import environment from './environment';
class API {
    socket;

    constructor() {
        try {
            this.socket = new WebSocket(`${environment.websocketURl}/notifications`);
        } catch (e) {
            console.error(e);
        }
    }

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
