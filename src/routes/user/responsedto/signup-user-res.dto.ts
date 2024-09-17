import { ApiProperty } from "@nestjs/swagger";

export class SingupUserResponseDto {
    @ApiProperty({
        example: 1,
    })
    id: number;
    
    @ApiProperty({
        example: 'user01',
    })
    username: string;

    @ApiProperty({
        example: '유저 01',
    })
    name: string;

}