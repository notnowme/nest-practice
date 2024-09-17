import { Controller, Get, HttpException, HttpStatus, Ip, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

// 앤드포인트 역할을 하는 것 같음
// 이 주소로 들어오면
// 설정해준 서비스를 통해서 로직 처리 후
// 결과를 반환해줌
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(
    @Ip() ip: string
  ): string {
    // console.log(ip);
    // return this.appService.getHello();
    console.log(this.configService.get<string>('ENVIRONMENT'));
    throw new HttpException('404', HttpStatus.NOT_FOUND);
  }

  @Get('name')
  getName(): string {
    return `$hello!`;
  }

  @Get('name/:name')
  getNameWithparam(@Param('name') name: string): string {
    return `${name} hello!`;
  }

  @Get('user')
  getNameWithQuery(@Query('name') name: string): string {
    return `${name} hel!lo!`;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}
