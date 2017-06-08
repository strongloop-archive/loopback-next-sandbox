import {createApp} from './application';
import * as http from 'http';
import * as https from 'https';

const app = createApp();
http.createServer(app.httpHandler({httpsRedirect: true})).listen(80);
https.createServer(app.httpsHandler()).listen(443);
