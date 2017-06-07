import {BasicStrategy} from 'passport-strategy-basic'; // confirm
import {userRepo} from './UserRepo';

export class AuthStrategy implements Provider {
  constructor(private @userRepo() users) {
  }

  value(): BasicStrategy {
    return new BasicStrategy(async (username, password) => {
      const user = await this.users.findById(username);
      if (user.password === password) {
        return user;
      }
    });
  }
}