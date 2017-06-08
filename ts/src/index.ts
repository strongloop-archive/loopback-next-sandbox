import {createApp} from './application';
import http from 'http';
import https from 'https';

const app = createApp();
http.createServer(app.httpHandler({httpsRedirect: true})).listen(80);
https.createServer(app.httpsHandler()).listen(443);
