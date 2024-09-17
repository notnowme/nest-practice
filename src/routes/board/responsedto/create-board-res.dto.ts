import { ApiProperty } from "@nestjs/swagger";

export class CreateBoardResponseDto {

    @ApiProperty({
        example: 1,
    })
    userId: number;

    @ApiProperty({
        example: 1,
    })
    id: number;

    @ApiProperty({
        example: '제목 입력'
    })
    title: string;

    @ApiProperty({
        example: '내용'
    })
    content: string;

    @ApiProperty({
        example: '2024-09-17T08:24:08.728Z'
    })
    createAt: Date;
    
    @ApiProperty({
        example: '2024-09-17T08:24:08.728Z'
    })
    updateAt: Date;

}