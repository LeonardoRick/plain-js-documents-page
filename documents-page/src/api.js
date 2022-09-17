const socket = new WebSocket('ws://localhost:8080/notifications');

class API {
    constructor() {
        this.openConnection();
    }
    openConnection = () => {
        socket.addEventListener('open', (event) => {
            console.log('connection opened!', event);
        });
    };

    listenToMessages = (callback) => {
        socket.addEventListener('message', (event) => {
            callback(JSON.parse(event.data));
        });
    };

    getDocuments = async () => {
        return fetch('http://localhost:8080/documents');
    };
}

export default API;
