import { daysFromToday } from '../src/utils/date';

describe('date utils', () => {
    it('should return the amount of days between two dates', () => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        expect(daysFromToday(yesterday.toDateString())).toEqual(1);
    });
});
