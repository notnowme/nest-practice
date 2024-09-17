import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiSuccessResCommon } from 'src/decorators/response.dto.decorator';
import { SingupUserResponseDto } from './responsedto/signup-user-res.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getUsers() {
        return this.userService.getUser();
    }

    @Post()
    @ApiSuccessResCommon(SingupUserResponseDto)
    signup(
        @Body(new ValidationPipe()) data: SignupUserDto
    ) {
        return this.userService.signUp(data);
    }

    @Post('login')
    login(
        @Body(new ValidationPipe()) data: LoginUserDto,
    ) {
        return this.userService.login(data);
    }

}
