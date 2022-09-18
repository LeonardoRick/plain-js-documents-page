import DocumentEvents from '../src/document-events';

describe('DocumentEvents', () => {
    let documentEvents;

    it('should create', () => {
        const addEventListener = jest.spyOn(document, 'addEventListener');
        documentEvents = new DocumentEvents();
        expect(addEventListener).toHaveBeenCalledTimes(2);
        expect(documentEvents).toBeTruthy();
    });
});
