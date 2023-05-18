import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as Mock from 'mockjs';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      const mockedUser = Mock.mock({
        id: i,
        name: '@name',
        email: '@email',
      });
      const user = plainToClass(User, mockedUser);
      this.users.push(user);
    }
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return Mock.mock({
      id: id,
      name: '@name',
      email: '@email',
    });
  }

  create(user: User) {
    this.users.push(user);
  }

  update(id: number, user: User) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      this.users[index] = user;
    }
  }

  delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }
}
