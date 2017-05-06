import {authenticate, authenticatedUser} from '@loopback/authentication';
import {role} from '@loopback/authorization';
import {todoRepo} from '../providers/TodoRepo';
import {get} from '@loopback/core';

export class TodoController {
  constructor(
    private @authenticatedUser() user,
    private @todoRepo() todos
  ) {
  }

  @authenticate()
  @get('/my/todos')
  getMyTodos() { // add return type -- : Todos[]?
    return this.todos.find({
      where: {
        owner: this.user.id
      }
    });
  }

  @role('admin')
  @get('/all/todos')
  getAllTodos() { // add return type -- : Todo[]?
    return this.todos.find();
  }
}