import Main from '../src/main';

jest.mock('../src/api.js');
jest.mock('../src/ui-updates.js');
describe('Main', () => {
    let main;

    beforeEach(() => {
        main = new Main();
    });

    it('should create', () => {
        expect(main).toBeTruthy();
    });

    it('should init', () => {
        const fetchDocuments = jest.spyOn(main, 'fetchDocuments');
        const setEventListeners = jest.spyOn(main, 'setEventListeners');
        const setNotifications = jest.spyOn(main, 'setNotifications');
        main.init();
        expect(fetchDocuments).toHaveBeenCalled();
        expect(setEventListeners).toHaveBeenCalled();
        expect(setNotifications).toHaveBeenCalled();
    });

    it('should call sortDocuments() when SELECT_CHANGE is emmited', () => {
        const sortDocuments = jest.spyOn(main.uiUpdates, 'sortDocuments');
        main.setEventListeners();
        dispatchEvent(
            new CustomEvent('select-change', {
                detail: 'title',
            })
        );
        expect(sortDocuments).toHaveBeenCalled();
    });

    it('should call changeDocumentsView() when CHANGE_VIEW is emmited', () => {
        const changeDocumentsView = jest.spyOn(main.uiUpdates, 'changeDocumentsView').mockImplementation();
        main.setEventListeners();
        dispatchEvent(
            new CustomEvent('change-view', {
                detail: 'view-list',
            })
        );
        expect(changeDocumentsView).toHaveBeenCalled();
    });

    it('should call addDocumentsError when a error happens during documents fetch', async () => {
        jest.spyOn(console, 'error').mockImplementation();
        jest.spyOn(main.api, 'getDocuments').mockImplementation(() => Promise.reject('something went wrong'));
        const addDocumentsError = jest.spyOn(main.uiUpdates, 'addDocumentsError');
        await main.fetchDocuments();
        expect(addDocumentsError).toHaveBeenCalled();
    });
});
