import {handleHttp, handleHttps} from '@loopback/handlers'
import http from 'http'
import https from 'https'
import {createApp} from './application'

const app = createApp()

http.createServer(handleHttp(app, {httpsRedirect: true})).listen(80);
https.createServer(handleHttps(app)).listen(443);
