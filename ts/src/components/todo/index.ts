import {TodoController} from './controllers/TodoController';
import {TodoRepo} from './repositories/TodoRepo';
import {UserRepo} from './repositories/UserRepo';
import {AuthStrategy} from './providers/AuthStrategy';
import {Role} from './providers/Role';
import {AUTHENTICATION_STRATEGY} from '@loopback/authentication';
import {AUTHORIZATION_ROLE} from '@loopback/authorization';

export class TodoComponent {
  controllers = [TodoController];
  repositories = [TodoRepo, UserRepo];
  providers = {
    [AUTHENTICATION_STRATEGY]: AuthStrategy,
    [AUTHORIZATION_ROLE]: Role
  }
}
