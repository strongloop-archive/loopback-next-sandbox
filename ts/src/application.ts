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
    public @injectAuthorizeResult() authorizeResult,
    public @injectInvoke() invoke,
    public @injectSendResponse() sendResponse,
    public @injectSendError() sendError
  ) {}

  async run(request, response) {
    try {
      // 1. Find the endpoint/route
      // Throws HttpErrors.NotFound when there is no route matching the request method and path
      const {controllerName, methodName, spec, pathParams} = this.findRoute(request);
      
      // 2. Authenticate and bind current user
      const user = await this.authenticate(request);

      // Anything produced / determined during the sequence
      // should be bound into the request context
      this.context.bind('authentication.user').to(user);
      
      // 4. Parse (and validate!) the arguments
      // Throws HttpErrors.UnprocessableEntity when some of 
      // the parameters are not valid.
      const args = parseArgs(spec, request, pathParams);

      // 3. Authorize the user should be able to invoke the operation
      // These access controls operate on controller names,
      // method names, user obj, and args
      await this.authorize(controllerName, methodName, user, args);
      
      // 5. Invoke the controller method
      const result = await this.invoke(controllerName, methodName, args);

      // 6. Authorize the result should be sent to the user
      // These access controls operate on normal access meta as well
      // as the result
      await this.authorizeResult(controllerName, methodName, user, args, result);

      // 7. Serialize the result (typically to JSON) and write HTTP response data
      await this.sendResponse(result);
    } catch(err) {
      // Any of the steps above can fail the request
      // by throwing an Error (returning a rejected promise)
      // The Sequence must decide how to handle that error.
      await this.sendError(err);
    }
  }
}
