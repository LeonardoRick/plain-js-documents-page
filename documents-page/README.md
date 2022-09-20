
# Holded Documents Page

This project is a implementation of the [Frontend Engineer Challange](https://github.com/holdedhub/careers/tree/main/challenges/frontend) created by Holded

| Documents List View | Documents Grid View |
|---------------------|---------------------|
|![Main page of the application with the list view option selected](./src/assets/documents-view-list.png 'Documents List View')|![Main page of the application with the grid view option selected](./src/assets/documents-view-grid.png 'Documents Grid View')|

## Commands

- `npm install` - Install the needed dev dependencies
- `npm run test` - Run tests and generate coverage inside `coverage/`
- `npm run build` - Builds the application in `production mode`
- `npm start` - Run the application in `development mode` with hot-reload

## Application Overview

The application setup is done using `webpack` to wrap the final `js bundle` and make the development process smoother.

The application also uses `babel` to allow coding with latest `ECMAScript` features.

The `src/` folder holds all the application logic, including the `environment` folder, that is currently used on `api.js` to setup the backend endpoint. Be aware that `npm run build` will not work properly because first you need to set valid `urls` inside `environment/prod.js`, since webpack replaces `environment/index.js` with this file during production build.

The `utils/` folder holds some useful functions used to implement date formating (`date.js`) and helper prototype functions to write and read objects on localStorage (`storage.js`)

The `tests/` folder holds everything related to testing the application, including a `__mocks__` folder that can be used to store all mocks needed.

## File by File

- `index.html`
  - Application template
  - Loads google `Raleway` font for styling purposes

- `index.js`
  - Is the entrypoint of the application (defined both on `package.json` and `webpack.config.js`)

- `main.js`
  - Holds all the application logic. It instantiates all other classes to be able to:
    - Fetch the list of documents;
    - Connect with the websocket server;
    - Listen to custom events dispatched by `document-events.js`
    - Update the UI

- `document-events.js`
  - Set the native document listeners on `input` and `click` events
  - Dispatch a `CustomEvent` with a specific key related to the event we want to listen to

- `ui-updates.js`
  - Handle every DOM update, such as:
    - Adding the documents as list of divs
    - Updating the number of received new documents on the notification icon;

- `api.js`
  - communicate with the server

### Final Notes

It was decided to not add `Typescript` to focus the coding more on `vanillaJS` features. Since the business model does not hold more than one type (the document itself), adding it does not seemed to be something useful. At this point it can still be easily added if needed.

It was one of the coolest coding challenges I've ever done. It's nice to get in touch with plain javascript now and then. Keep doing the great job :)
