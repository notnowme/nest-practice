import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsPhoneNumber, MaxLength, MinLength } from "class-validator";

export class SignupUserDto {

    @MinLength(4)
    @MaxLength(12)
    @IsNotEmpty()
    @ApiProperty({
        example: 'user01',
        description: '유저 아이디'
    })
    username: string;

    @MinLength(4)
    @IsNotEmpty()
    @ApiProperty({
        example: '****',
        description: '비밀번호'
    })
    password: string;

    @MinLength(4)
    @MaxLength(12)
    @IsNotEmpty()
    @ApiProperty({
        example: '유저 01',
        description: '유저 이름'
    })
    name: string;

    // @IsIn(['F', 'M'])
    // gender: string;

    // @IsEmail()
    // email: string;

    // @IsPhoneNumber('KR')
    // phoneNumber: string;
}