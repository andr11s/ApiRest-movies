import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll() {
    return await this.userRepository.getUserAll();
  }

  async getUserById(id: MongooseSchema.Types.ObjectId) {
    return await this.userRepository.getUserById(id);
  }

  async createUser(createUser: CreateUserDto) {
    return await this.userRepository.createUser(createUser);
  }

  async updateUser(updateUser: UpdateUserDto) {
    return await this.userRepository.updateUser(updateUser);
  }
}
