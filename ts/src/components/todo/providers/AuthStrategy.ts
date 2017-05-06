import {AUTHENTICATION_STRATEGY} from '@loopback/authentication';
import {BasicStrategy} from 'passport-stragegy-basic'; // confirm
import {userRepo} from './UserRepo';

export class AuthStrategy {
  static key =  AUTHENTICATION_STRATEGY; // 'authentication.strategy'

  constructor(private @userRepo() users) {
  }

  value(): User {
    return new BasicStrategy(async (username, password) => {
      const user = await this.users.findById(username);
      if (user.password === password) {
        return user;
      }
    });
  }
}

interface User {
  usernmae: string,
  password: string
}