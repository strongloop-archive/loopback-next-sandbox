"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
class Bootstrapper {
    static bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = new application_1.SandboxApplication();
            try {
                yield app.start();
                console.log('Application Info:', app.info());
            }
            catch (err) {
                console.log('Cannot start the app.', err);
                process.exit(1);
            }
        });
    }
}
Bootstrapper.bootstrap();
//# sourceMappingURL=index.js.map