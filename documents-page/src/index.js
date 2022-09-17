import './styles.css';
import API from './api';
import UIUpdates from './ui-updates';
import DocumentEvents from './document-events';
const api = new API();

class Main {
    events = new DocumentEvents();
    uiUpdates = new UIUpdates();

    init = () => {
        let notificationsCount = 0;
        this.fetchDocuments();
        this.setEventListeners();

        api.listenToMessages((_data) => {
            notificationsCount++;
            this.uiUpdates.updateNotificationNumber(notificationsCount);
        });
    };

    fetchDocuments = () => {
        (async () => {
            const r = await api.getDocuments();
            this.uiUpdates.addDocumentsOnHtml(await r.json());
        })();
    };

    setEventListeners = () => {
        this.events.listenEvent(DocumentEvents.EVENTS.SELECT_CHANGE, (event) => {
            // uiUpdates.changeDocumentsView(event.detail);
            console.log('todo: sort - ', event.detail);
        });

        this.events.listenEvent(DocumentEvents.EVENTS.CHANGE_VIEW, (event) => {
            this.uiUpdates.changeDocumentsView(event.detail);
        });
    };
}
const main = new Main();
main.init();
