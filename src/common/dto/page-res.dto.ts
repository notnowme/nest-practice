import { ApiProperty } from "@nestjs/swagger";

export class PageResDto {
    @ApiProperty({
        description: '페이지 번호',
        example: 1,
    })
    page?: number = 1;
    
    @ApiProperty({
        description: '아이템 수',
        example: 10,
    })
    size?: number = 10;
}