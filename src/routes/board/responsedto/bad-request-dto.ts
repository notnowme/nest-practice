import { ApiProperty } from "@nestjs/swagger";


export class BadRequestResponseDto {

    @ApiProperty({
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        example: '2024-09-17T08:46:09.090Z',
    })
    timeStampe: Date;

    @ApiProperty({
        example: '/board',
    })
    path: string;

    @ApiProperty({
        example: 'Bad Request Exception',
    })
    message: string;

}