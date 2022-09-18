import './styles.css';
import API from './api';
import UIUpdates from './ui-updates';
import DocumentEvents from './document-events';

class Main {
    documents;
    api = new API();
    events = new DocumentEvents();
    uiUpdates = new UIUpdates();

    init() {
        this.fetchDocuments();
        this.setEventListeners();
        this.setNotifications();
    }

    async fetchDocuments() {
        try {
            this.documents = await this.api.getDocuments();
            this.uiUpdates.addDocumentsOnHtml(this.documents);
            this.uiUpdates.sortDocuments('createdAt');
        } catch (e) {
            this.uiUpdates.addDocumentsError();
        }
    }

    setEventListeners() {
        window.addEventListener(DocumentEvents.EVENTS.SELECT_CHANGE, (event) => {
            this.uiUpdates.sortDocuments(event.detail);
        });

        window.addEventListener(DocumentEvents.EVENTS.CHANGE_VIEW, (event) => {
            this.uiUpdates.changeDocumentsView(event.detail);
        });
    }

    setNotifications() {
        let notificationsCount = 0;
        this.api.listenToMessages((_data) => {
            notificationsCount++;
            this.uiUpdates.updateNotificationNumber(notificationsCount);
        });
    }
}
export default Main;
