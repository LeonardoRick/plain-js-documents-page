// this file replaces style.css during tests, since jest can't parse .css files
// and it thinks import 'styles.css' is a js import when trying to import index.js.
// This setup is done in jest.config.js moduleNameMapper
module.exports = {};
