# BMS-ui-web

This is a part of the final year project done by Tharun
Prabhu and Magesh J from the dept. of EEE, SASTRA Deemed to be
University. **Battery Management System with cloud sharing**. Node.js for the
backend and MongoDB for the database. 

The map integration is
accomplished using a well-known library - [Leaflet.js](https://leafletjs.com/). The battery
statistics are displayed as a well organized chart with the help of an
open source library - [Chart.js](https://www.chartjs.org/). The data from the mongoDB database is
fed to the front end using [mongoose](https://www.npmjs.com/package/mongoose) - an open source JS library.

<br>

We have given our utmost attention to the minute details of this project and if there is any flaw that we haven't attended, please let us know through the issues or pull requests. Any help from a fellow dev is much appreciated.

<br>

## Steps to run this on your local machine

- Clone this repo through GitHub or github's [CLI](https://github.com/cli/cli).	
- Run `npm install` command on both the root directory and the **server** folder. The server folder is for the backend.
- `npm start` to build the dist folder with parcel bundler.
- `npm run server` to run my own backend server - (advisable).
- It is also necessary that you have *nodemon* installed globally.
- If you don't, then run the following command --> `npm i -g nodemon`.
- `npm run build` to build the client side through parcel (not necessary tho).
- All the above commands to be run from the root directory through the CLI.
- **(after Sunday - April 18 commit)** The connection strings in the `server/server.js` file are taken from the .env file that is in the root directory. Obviously, it is not supposed to be uploaded into GitHub, so **create your own .env file with appropriate variable names.**