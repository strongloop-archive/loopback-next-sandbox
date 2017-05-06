import {Bootstrapper} from '@loopback/core';
import {createApp} from './application';

const bootstrapper = new Bootstrapper(createApp);
try {
  bootstrapper.boot();
} catch(err) {
  bootstrapper.error(err);
}