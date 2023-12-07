import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/singUp.dto';
import { LoginDto } from './dto/login.dto';

///Authentication endpoints

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup') //SIGN UP
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    //Getting the data from the body
    return this.authService.signUp(signUpDto);
  }

  @Get('/login') //LOGIN
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    //Getting the data from the body
    return this.authService.login(loginDto);
  }
}
