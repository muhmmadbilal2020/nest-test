import { Controller, Put, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(@Request() req, @Body() body) {
    console.log(req.user, body)
    return this.usersService.updateProfile(req.user.userId, body);
  }
}
