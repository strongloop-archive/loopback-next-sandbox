import {Repository} from '@loopback/data';
import {inject} from '@loopback/core';

export const TODO_REPO = 'repositories.todo';

export class TodoRepo {
  static key = TODO_REPO;

  value(): Repository {
    return new Repository();
  }
}

export const todoRepo = () => {
  return inject(TODO_REPO);
}