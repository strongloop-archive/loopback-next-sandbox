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
    public @injectFindRoute() findRoute,
    public @injectParseArgs() parseArgs,
    public @injectAuthenticate() authenticate,
    public @injectAuthorize() authorize,
    public @injectInvoke() invoke,
    public @injectSendResponse() sendResponse,
    public @injectSendError() sendError
  ) {}

  async run(request, response) {
    try {
      // 1. Find the endpoint/route
      // Throws HttpErrors.NotFound when there is no route matching the request method and path
      const {controllerName, methodName, spec, pathParams} = findRoute(request);
      
      // 2. Authenticate & authorize
      const user = await this.authenticate(request);
      
      // 3. Authorize the operation
      // TODO(bajtos) how to pass target model id for owner-based ACLs?
      await this.authorize(controllerName, methodName, user);
      
      // 4. Parse (and validate!) the arguments
      // Throws HttpErrors.UnprocessableEntity when some of 
      // the parameters are not valid.
      const args = parseArgs(spec, request, pathParams);
      
      // 5. Invoke the controller method
      // TODO(bajtos) how to pass the current user?
      // Especially when this Sequence.run() wants to change
      // the current user, in which case any bindings made by 
      // this.authenticate() are bound to a wrong value.
      // I would do the following:
      //    const result = await this.invoke(controllerName, methodName, args, user);
      const result = await this.invoke(controllerName, methodName, args);
      
      // 6. Serialize the result (typically to JSON) and write HTTP response data
      await this.sendResponse(result);
    } catch(err) {
      // Any of the steps above can fail the request
      // by throwing an Error (returning a rejected promise)
      // The Sequence must decide how to handle that error.
      await this.sendError(err);
    }
  }
}
