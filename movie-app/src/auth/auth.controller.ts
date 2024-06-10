import { Controller, Post, Body, Request, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { httpResponse } from 'src/common/resp';
import { UsersService } from 'src/users/users.service';
import { SignuUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() req): Promise<any> {
    if(req.email == undefined){
      return httpResponse(HttpStatus.BAD_REQUEST, "Email required.")  
    }
    
    if(req.password == undefined){
      return httpResponse(HttpStatus.BAD_REQUEST, "Password required.")  
    }

    let result = await this.authService.validateUser(req.email, req.password)
    // console.log(result)
    if(result == null){
      return httpResponse(HttpStatus.BAD_REQUEST, "Invalid Password.")  
    }

    return this.authService.login(req, result.id);
  }

  @Post('signup')
  async signup(@Body() req: SignuUpDto): Promise<any> {
    try {
      if(req.email == undefined){
        return httpResponse(HttpStatus.BAD_REQUEST, "Email required.")  
      }
      
      if(req.name == undefined){
        return httpResponse(HttpStatus.BAD_REQUEST, "Name required.")  
      }
      
      if(req.password == undefined){
        return httpResponse(HttpStatus.BAD_REQUEST, "Password required.")  
      }

      const user = await this.usersService.findByEmail(req.email);
      if (user) {
        return httpResponse(HttpStatus.BAD_REQUEST, "Email already exists.")
      }
      
      const data = await this.authService.signup(req);
      return httpResponse(HttpStatus.CREATED, "User registered successfully.", data)
    } catch (error) {
      console.log(error.name+": "+ error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req, @Body() body) {
      
    if(body.password == undefined){
      return httpResponse(HttpStatus.BAD_REQUEST, "Old Password required.")  
    }

    let result = await this.authService.validateUser(req.user.email, body.password)
    if(result == null){
      return httpResponse(HttpStatus.BAD_REQUEST, "Invalid Old Password.")  
    }
      
    if(body.newPassword == undefined){
      return httpResponse(HttpStatus.BAD_REQUEST, "New Password required.")  
    }

    return this.authService.changePassword(req.user.userId, body.newPassword);
  }
}
