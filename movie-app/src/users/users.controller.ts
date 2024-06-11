import { Controller, Put, Body, Request, UseGuards, Req, NotFoundException, Get, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { httpResponse } from 'src/common/resp';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(@Request() req, @Body() body) {
    console.log(req.user, body)
    return this.usersService.updateProfile(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    // Access user info from the request object
    const user = req.user;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Get profile data using the user's ID
    const profile = await this.usersService.getUserProfile(user.userId);
    if (!profile) {
      throw new NotFoundException('User profile not found');
    }

    return httpResponse(HttpStatus.ACCEPTED, "Profile.", profile)
  }

}
