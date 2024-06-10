import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: any) {
    return this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async updatePassword(userId: any, newPassword: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      user.password = newPassword;
      await this.userRepository.save(user);
    }
    return user;
  }

  async updateProfile(userId: any, profile: any) {
    const updateData = {};
    if (profile.name !== undefined) updateData['name'] = profile.name;
    if (profile.dob !== undefined) updateData['dob'] = profile.dob;
    if (profile.address !== undefined) updateData['address'] = profile.address;

    await this.userRepository.update(userId, updateData);
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
