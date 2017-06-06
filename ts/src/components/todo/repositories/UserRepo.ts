import {Repository} from '@loopback/data';

export class UserRepo extends Repository {
  constructor(private @inject('models.user') model, private @inject('datasources.db') db) {
    super(model, db)
  }
}