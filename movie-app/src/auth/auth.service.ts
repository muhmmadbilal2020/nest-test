import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password == pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, userId: any) {
    const payload = { email: user.email, sub: userId };
    // console.log(user)

    return {
      userId: userId,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: any) {

    // return this.usersService.create(user);
    const createdUser = await this.usersService.create(user);
    const payload = { email: user.email, sub: createdUser.id };
    const token = this.jwtService.sign(payload);

    return {
      userId: createdUser.id,
      email: user.email,
      access_token: token,
    };  
  }

  async changePassword(userId: string, newPassword: string) {
    return this.usersService.updatePassword(userId, newPassword);
  }
}
