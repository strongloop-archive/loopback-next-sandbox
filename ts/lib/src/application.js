"use strict";
// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@loopback/core");
class SandboxApplication extends core_1.Application {
    constructor() {
        super();
        const app = this;
        app.bind('userId').to(42);
        app.bind('app.info').toDynamicValue(() => this.info());
        app.bind('servers.http.enabled').to(true);
        app.bind('servers.http.port').to(3000);
        app.bind('servers.https.enabled').to(true);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this._startTime = new Date();
            const httpPort = yield this.get('servers.http.port');
            const server = new core_1.Server({ port: httpPort });
            this.bind('servers.http.server').to(server);
            server.bind('applications.sandbox').to(this);
            return server.start();
        });
    }
    info() {
        return __awaiter(this, void 0, void 0, function* () {
            const server = yield this.get('servers.http.server');
            const port = server.config.port;
            return {
                uptime: Date.now() - this._startTime.getTime(),
                url: 'http://127.0.0.1:' + port,
            };
        });
    }
}
exports.SandboxApplication = SandboxApplication;
//# sourceMappingURL=application.js.map