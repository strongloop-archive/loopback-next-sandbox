import {authenticatedUser} from '@loopback/authentication';
import {AUTHORIZATION_ROLE} from '@loopback/authorization';

export class Role {
  static key = AUTHORIZATION_ROLE; // 'authorization.role'

  constructor(private @authenticatedUser() user) {
  }

  value(): string {
    return this.user.isAdmin ? 'admin' : 'default';
  }
}