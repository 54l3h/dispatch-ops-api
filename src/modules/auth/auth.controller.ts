import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import type { RequestUser } from 'src/common/types/RequestUser.type';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RegisterCompanyDto } from 'src/modules/auth/dto/register-company.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login dispatcher, technician, admin, or customer - returns JWT + refresh token
  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('register/company')
  registerCompany(@Body() dto: RegisterCompanyDto) {
    return this.authService.registerCompany(dto);
  }

  // @Public()
  // @Post('refresh')
  // @HttpCode(HttpStatus.ACCEPTED)
  // refresh() {
  //   return this.authService.refresh();
  // }

  @Post('logout')
  @HttpCode(HttpStatus.ACCEPTED)
  logout() {
    // return this.authService.logout(dto);
  }

  @Get('me')
  getProfile(@CurrentUser() user: RequestUser) {
    console.log(user);

    return this.authService.getProfile(user);
  }
}
