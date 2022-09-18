import API from '../src/api';
import Main from '../src/main';

jest.mock('../src/api.js');
// jest.mock;

describe('Main', () => {
    let main;
    it('should create', () => {
        main = new Main();
        expect(main).toBeTruthy();
    });
});
