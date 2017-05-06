import {TodoController} from './controllers/TodoController';
import {TodoRepo} from './providers/TodoRepo';
import {UserRepo} from './providers/UserRepo';
import {AuthStrategy} from './providers/AuthStrategy';
import {Role} from './providers/Role';

export class Todo {
  controllers = [TodoController];
  providers = [TodoRepo, UserRepo, AuthStrategy, Role];
}