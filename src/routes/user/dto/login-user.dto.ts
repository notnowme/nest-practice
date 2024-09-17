import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'user01'
    })
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '****'
    })
    password: string;
}