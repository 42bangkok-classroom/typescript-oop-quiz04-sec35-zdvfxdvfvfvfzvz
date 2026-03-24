import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  private getFilePath(): string {
    return path.join(process.cwd(), 'data', 'users.json');
  }

  private readUsers(): IUser[] {
    const data = fs.readFileSync(this.getFilePath(), 'utf-8');
    return JSON.parse(data);
  }

  private writeUsers(users: IUser[]): void {
    fs.writeFileSync(this.getFilePath(), JSON.stringify(users, null, 2));
  }

  test(): string[] {
    return [];
  }

  findAll(): IUser[] {
    return this.readUsers();
  }

  findOne(id: string, fields?: string[]): Partial<IUser> {
    const users = this.readUsers();
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!fields || fields.length === 0) {
      return user;
    }
    const result: Partial<IUser> = {};
    for (const field of fields) {
      if (field in user) {
        (result as any)[field] = (user as any)[field];
      }
    }
    return result;
  }

  create(dto: CreateUserDto): IUser {
    const users = this.readUsers();
    const lastId = users.length > 0 ? parseInt(users[users.length - 1].id) : 0;
    const newUser: IUser = {
      id: String(lastId + 1),
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      username: dto.username,
    };
    users.push(newUser);
    this.writeUsers(users);
    return newUser;
  }
}
