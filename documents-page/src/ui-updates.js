class UIUpdates {
    invertedView = {
        'view-list': 'view-grid',
        'view-grid': 'view-list',
    };
    constructor() {}

    updateNotificationNumber = (number) => {
        document.getElementById('notification-number').innerHTML = number;
    };

    changeDocumentsView = (cls) => {
        console.log(cls);
        document.getElementById('document-list').classList.remove(this.invertedView[cls]);
        document.getElementById('document-list').classList.add(cls);
    };

    addDocumentsOnHtml = (documents) => {
        console.log(documents);
        if (documents) {
            documents.forEach((doc) => {
                const docDiv = document.createElement('div');
                docDiv.classList.add('doc');

                const metadataDiv = document.createElement('div');
                const title = document.createElement('span');
                const version = document.createElement('span');
                title.classList.add('title');
                version.classList.add('version');
                title.innerHTML = doc.Title;
                version.innerHTML = doc.Version;
                metadataDiv.appendChild(title);
                metadataDiv.appendChild(version);

                const contributorsDiv = this.createDivList(doc.Contributors, 'contributors', 'Name');
                const attachmentsDiv = this.createDivList(doc.Attachments, 'attachments');

                docDiv.append(metadataDiv, contributorsDiv, attachmentsDiv);
                document.getElementById('document-list').appendChild(docDiv);
            });
        }
    };

    createDivList = (list, className, key = undefined) => {
        const div = document.createElement('div');
        div.classList.add(className);
        list.forEach((item) => {
            const span = document.createElement('span');
            span.classList.add(`${className}-item`);
            span.innerHTML = key ? item[key] : item;
            div.appendChild(span);
        });
        return div;
    };
}

export default UIUpdates;
