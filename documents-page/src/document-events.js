class DocumentEvents {
    static EVENTS = {
        SELECT_CHANGE: 'select-change',
        CHANGE_VIEW: 'change-view',
    };
    constructor() {
        document.addEventListener('input', (event) => {
            if (event.target.id === 'sortSelect') {
                dispatchEvent(
                    new CustomEvent(DocumentEvents.EVENTS.SELECT_CHANGE, {
                        detail: event.target.value,
                    })
                );
            }
        });

        document.addEventListener('click', (event) => {
            if (event.target.id === 'view-list' || event.target.id === 'view-grid') {
                dispatchEvent(
                    new CustomEvent(DocumentEvents.EVENTS.CHANGE_VIEW, {
                        detail: event.target.id,
                    })
                );
            }
        });
    }
}

export default DocumentEvents;
