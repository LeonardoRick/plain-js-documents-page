import './styles.css';
import './utils/storage';
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
        let cached = false;
        try {
            this.documents = await this.api.getDocuments();
            localStorage.setObject('documents', this.documents);
            this.uiUpdates.addDocumentsOnHtml(this.documents);
            this.uiUpdates.sortDocuments('createdAt');
        } catch (e) {
            const cachedDocuments = localStorage.getObject('documents');
            if (cachedDocuments && Object.keys(cachedDocuments).length > 0) {
                cached = true;
                this.uiUpdates.addDocumentsOnHtml(cachedDocuments);
                this.uiUpdates.sortDocuments('createdAt');
            } else {
                this.uiUpdates.addDocumentsError();
            }
            console.error(e);
        }

        this.uiUpdates.toggleCachedMessage(cached);
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
