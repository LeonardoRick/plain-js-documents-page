import { daysFromToday } from './utils/date';

class UIUpdates {
    view = {
        'view-list': {
            inverted: 'view-grid',
            headerDisplay: 'flex',
        },
        'view-grid': {
            inverted: 'view-list',
            headerDisplay: 'none',
        },
    };
    sortDirection = {
        normal: {
            n1: 1,
            n2: -1,
        },
        inverted: {
            n1: -1,
            n2: 1,
        },
    };
    sortOptions = { title: 'normal', version: 'normal', createdAt: 'inverted' };

    updateNotificationNumber(number) {
        document.getElementById('notifications-container').style.visibility = 'visible';
        document.getElementById('notification-number').innerHTML = number > 100 ? ':)' : number;
    }

    changeDocumentsView(cls) {
        const documentList = document.getElementById('document-list');
        documentList.classList.remove(this.view[cls].inverted);
        documentList.classList.add(cls);

        document.getElementById(cls).classList.add('active');
        document.getElementById(this.view[cls].inverted).classList.remove('active');

        document.getElementById('table-header').style.display = this.view[cls].headerDisplay;
    }

    addDocumentsOnHtml(documents) {
        if (documents && documents.length) {
            document.getElementById('error').style.display = 'none';
            documents.forEach((doc) => {
                const docDiv = document.createElement('div');
                docDiv.classList.add('doc');
                docDiv.setAttribute('id', doc.ID);
                docDiv.setAttribute('title', doc.Title);
                docDiv.setAttribute('version', doc.Version);
                docDiv.setAttribute('createdAt', doc.CreatedAt);

                const metadataDiv = document.createElement('div');
                metadataDiv.classList.add('metadata');

                const title = document.createElement('span');
                title.classList.add('title');
                title.innerHTML = doc.Title;

                const version = document.createElement('span');
                version.classList.add('version');
                version.innerHTML = `Version ${doc.Version}`;

                const createdAt = document.createElement('span');
                createdAt.classList.add('createdAt');
                createdAt.innerHTML = `${daysFromToday(doc.CreatedAt)} days ago`;

                metadataDiv.appendChild(title);
                metadataDiv.appendChild(version);
                metadataDiv.appendChild(createdAt);

                const contributorsDiv = this.createDivList(doc.Contributors, 'contributors', 'Name');
                const attachmentsDiv = this.createDivList(doc.Attachments, 'attachments');

                docDiv.append(metadataDiv, contributorsDiv, attachmentsDiv);
                document.getElementById('document-list').prepend(docDiv);
            });
        }
    }

    addDocumentsError() {
        document.getElementById('document-list').innerHTML = '';
        document.getElementById('table-header').style.display = 'none';
        document.getElementById('actions').style.display = 'none';
        document.getElementById('error').style.display = 'flex';
    }

    createDivList(list, className, key = undefined) {
        const div = document.createElement('div');
        div.classList.add(className);
        list.forEach((item) => {
            const span = document.createElement('span');
            span.classList.add(`${className}-item`);
            span.innerHTML = key ? item[key] : item;
            div.appendChild(span);
        });
        return div;
    }

    sortDocuments(key) {
        if (Object.keys(this.sortOptions).includes(key)) {
            const documents = Array.from(document.getElementsByClassName('doc'));
            const parent = document.getElementById('document-list');
            const sortNumbers = this.sortDirection[this.sortOptions[key]];

            documents.sort((a, b) => (a.getAttribute(key) > b.getAttribute(key) ? sortNumbers.n1 : sortNumbers.n2));
            documents.forEach((doc) => {
                parent.removeChild(doc);
            });
            parent.prepend(...documents);
        }
    }
}

export default UIUpdates;
