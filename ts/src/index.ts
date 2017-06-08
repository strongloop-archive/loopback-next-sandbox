import {createApp} from './application'
import http from 'http'
import https from 'https'

const app = createApp();
http.createServer(app.handleHttp({httpsRedirect: true})).listen(80);
https.createServer(app.handleHttps()).listen(443);
