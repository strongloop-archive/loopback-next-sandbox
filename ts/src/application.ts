import {Application, Sequence, injectInvoke, injectSend} from '@loopback/core';
import {Todo} from './components/todo';
import {Authentication, injectUser, injectAuthenticate} from '@loopback/authentication';
import {Authorization, injectAuthorize} from '@loopback/authorization';
import {Rejection, injectReject} from '@loopback/rejection';

export function createApp(): Application {
  return new Application({
    components: [Todo, Authentication, Authorization, Rejection],
    sequence: [TodoSequence]
  });
};

class TodoSequence extends Sequence {
  constructor(
    public @injectAuthenticate() authenticate,
    public @injectAuthorize() authorize,
    public @injectInvoke() invoke,
    public @injectSend() send,
    public @injectReject() reject
  ) {}

  async run() {
    await this.authenticate();
    await this.authorize();
    this.send(await this.invoke());
  }
}
