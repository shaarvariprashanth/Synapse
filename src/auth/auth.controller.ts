import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Register a new user' })
  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }

  @ApiOperation({ summary: 'Login to the application' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the profile of the logged-in user' })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Request()
    req: {
      user: {
        userId: number;
        email: string;
      };
    },
  ) {
    return req.user;
  }
}
