/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    moduleNameMapper: {
        // Setup .css files to point to empty-module during tests,
        '\\.(css)$': '<rootDir>/tests/__mocks__/empty-module.js',
    },
};
