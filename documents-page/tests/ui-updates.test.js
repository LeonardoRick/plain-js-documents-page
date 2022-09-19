import UIUpdates from '../src/ui-updates';
import fs from 'fs';
import path from 'path';
const html = fs.readFileSync(path.resolve(__dirname, '..', 'src/index.html'), 'utf8');

describe('UIUpdates', () => {
    let uiUpdates;

    beforeEach(async () => {
        document.body.innerHTML = html;
        uiUpdates = new UIUpdates();
    });

    it('should create', () => {
        expect(uiUpdates).toBeTruthy();
    });

    it('should update notification number on html', () => {
        uiUpdates.updateNotificationNumber(10);
        expect(document.getElementById('notification-number').innerHTML).toEqual('10');
    });

    it('should show view-list and table-header when calling changeDocumentsView with view-list', () => {
        uiUpdates.changeDocumentsView('view-list');
        const documentList = document.getElementById('document-list');
        expect(documentList.classList).toContain('view-list');
        expect(documentList.classList).not.toContain('view-grid');

        expect(document.getElementById('view-list').classList).toContain('active');
        expect(document.getElementById('view-grid').classList).not.toContain('active');

        expect(document.getElementById('table-header').style.display).toEqual('flex');
    });

    it('should show view-grid when calling changeDocumentsView with view-grid', () => {
        uiUpdates.changeDocumentsView('view-grid');

        const documentList = document.getElementById('document-list');
        expect(documentList.classList).toContain('view-grid');
        expect(documentList.classList).not.toContain('view-list');

        expect(document.getElementById('view-grid').classList).toContain('active');
        expect(document.getElementById('view-list').classList).not.toContain('active');

        expect(document.getElementById('table-header').style.display).toEqual('none');
    });

    it('should do nothing when calling addDocumentsOnHtml without a documents list', () => {
        uiUpdates.addDocumentsOnHtml([]);
        expect(document.getElementsByClassName('doc').length).toEqual(0);
    });

    it('should add document on documents-list when calling addDocuments with a value', () => {
        uiUpdates.addDocumentsOnHtml([
            {
                ID: '9e80f868-4638-4e9d-95fe-74d5a4e4584c',
                CreatedAt: '1947-06-02T02:50:26.000539171Z',
                UpdatedAt: '1920-10-31T01:40:20.770402828Z',
                Title: '90 Minute IPA',
                Attachments: ['Smoke-flavored', 'Light Hybrid Beer', 'Belgian Strong Ale', 'Belgian Strong Ale', 'Porter'],
                Contributors: [
                    {
                        ID: '7d34f0cc-80ad-45b5-b966-dd12eed1526c',
                        Name: 'Enos Wehner',
                    },
                    {
                        ID: '7be44283-420b-4757-9590-ab9c9f648dcd',
                        Name: 'Daphnee Pollich',
                    },
                    {
                        ID: 'dc7c986a-7f69-4a1b-b749-1abd7e46487b',
                        Name: 'Caden Kautzer',
                    },
                ],
                Version: '4.9.17',
            },
        ]);
        expect(document.getElementsByClassName('doc').length).toEqual(1);
        expect(document.getElementById('9e80f868-4638-4e9d-95fe-74d5a4e4584c').parentElement.id).toEqual('document-list');
    });

    it('should show cached div when calling toggleCachedMessage with true and hide when calling with false', () => {
        uiUpdates.toggleCachedMessage(false);
        expect(document.getElementById('cached-container').style.display).toEqual('none');
        uiUpdates.toggleCachedMessage(true);
        expect(document.getElementById('cached-container').style.display).toEqual('flex');
    });

    it('should show error div when calling addDocumentsError', () => {
        uiUpdates.addDocumentsError();
        expect(document.getElementById('document-list').innerHTML).toEqual('');
        expect(document.getElementById('table-header').style.display).toEqual('none');
        expect(document.getElementById('actions').style.display).toEqual('none');
        expect(document.getElementById('error').style.display).toEqual('flex');
    });

    it('should show documents sorted by specific key when calling sortDocuments', () => {
        uiUpdates.addDocumentsOnHtml([
            {
                ID: '7c8dae1c-e580-448e-966c-f3aae2013b39',
                CreatedAt: '2022-12-17T17:57:59.541961892Z',
                UpdatedAt: '2010-09-25T13:25:33.401550175Z',
                Title: 'Two Hearted Ale',
                Attachments: ['Light Hybrid Beer', 'European Amber Lager'],
                Contributors: [
                    {
                        ID: 'ae310354-a202-4fe2-8ceb-f415749109ba',
                        Name: 'Carmella Yundt',
                    },
                    {
                        ID: 'ac9fe191-d00d-4215-b6cf-2ca7ef8e2ce3',
                        Name: 'Harmon Tillman',
                    },
                    {
                        ID: 'f5bd9385-1bdb-42ae-9e73-3df691123efa',
                        Name: 'Laron Champlin',
                    },
                ],
                Version: '2.12.20',
            },
            {
                ID: '9e80f868-4638-4e9d-95fe-74d5a4e4584c',
                CreatedAt: '1947-06-02T02:50:26.000539171Z',
                UpdatedAt: '1920-10-31T01:40:20.770402828Z',
                Title: '90 Minute IPA',
                Attachments: ['Smoke-flavored', 'Light Hybrid Beer', 'Belgian Strong Ale', 'Belgian Strong Ale', 'Porter'],
                Contributors: [
                    {
                        ID: '7d34f0cc-80ad-45b5-b966-dd12eed1526c',
                        Name: 'Enos Wehner',
                    },
                    {
                        ID: '7be44283-420b-4757-9590-ab9c9f648dcd',
                        Name: 'Daphnee Pollich',
                    },
                    {
                        ID: 'dc7c986a-7f69-4a1b-b749-1abd7e46487b',
                        Name: 'Caden Kautzer',
                    },
                ],
                Version: '4.9.17',
            },
        ]);
        uiUpdates.sortDocuments('createdAt');
        expect(document.getElementsByClassName('doc')[0].title).toEqual('Two Hearted Ale');
        uiUpdates.sortDocuments('title');
        expect(document.getElementsByClassName('doc')[0].title).toEqual('90 Minute IPA');
    });
});
