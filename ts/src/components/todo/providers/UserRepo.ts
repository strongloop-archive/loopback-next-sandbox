import {Repository} from '@loopback/data';
import {inject} from '@loopback/core';

export const USER_REPO = 'repositories.userRepo';

export class UserRepo {
  static key = USER_REPO;

  value(): Repository {
    return new Repository();
  }
}

export const userRepo = () => {
  return inject(USER_REPO);
}