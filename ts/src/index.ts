import {SandboxApplication} from './application';

class Bootstrapper {
  static async bootstrap() {
    const app = new SandboxApplication();
    try {
      await app.start();
      console.log('Application Info:', app.info());
    } catch(err) {
      console.log('Cannot start the app.', err);
      process.exit(1);
    }
  }
}

Bootstrapper.bootstrap();