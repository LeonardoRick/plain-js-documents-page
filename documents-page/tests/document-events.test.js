import DocumentEvents from '../src/document-events';

describe('DocumentEvents', () => {
    let documentEvents;
    let div;

    beforeEach(() => {
        documentEvents = new DocumentEvents();
        div = document.createElement('div');
        document.body.appendChild(div);
    });

    it('should create', () => {
        const addEventListener = jest.spyOn(document, 'addEventListener');
        documentEvents = new DocumentEvents();
        expect(addEventListener).toHaveBeenCalledTimes(2);
        expect(documentEvents).toBeTruthy();
    });

    it('shold', () => {
        const dp = jest.spyOn(window, 'dispatchEvent');
        const input = document.createElement('input');
        input.setAttribute('id', 'sortSelect');
        document.body.appendChild(input);
        input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        expect(dp).toHaveBeenCalled();
    });

    it('should call dispatchEvent when element with id "view-list" is clicked', () => {
        const dp = jest.spyOn(window, 'dispatchEvent');
        div.setAttribute('id', 'view-list');
        div.click();
        expect(dp).toHaveBeenCalled();
    });

    it('should call dispatchEvent when elemtn with id "view-grid" is clicked', () => {
        const dp = jest.spyOn(window, 'dispatchEvent');
        div.setAttribute('id', 'view-grid');
        div.click();
        expect(dp).toHaveBeenCalled();
    });
});
