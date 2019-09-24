import express from 'express';
import path from 'path';

import https from 'https';
import fs from 'fs';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY

import api from './routes/api';

import session from "express-session";
var MySQLStore = require("express-mysql-session")(session);

import conn from "./db/mysql.js";

const option = {
  key: fs.readFileSync('server/keys/private.pem'),
  cert: fs.readFileSync('server/keys/mycommoncrt.pem')
};

const app = express();
const port = 3000;
const devPort = 4000;

var options = {
    host: 'localhost',
    port: 3306,
    user: 'yj',
    password: 'GKSdbswls1!',
    database: 'hyj'
};

const sessionStore = new MySQLStore(options);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(session({
    key: 'GKSdbswls1!',
    secret: 'gksdbswls1!',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use('/', express.static(path.join(__dirname, './../public')));

/* setup routers & static directory */
app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


https.createServer(option, app).listen(port, () => {
    console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
