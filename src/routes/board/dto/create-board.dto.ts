import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";


// 데이터 타입을 명시함
// validator 데코레이터를 통해서 검증할 수 있음
// swagger 문서 설명을 작성할 수 있음
export class CreateBoardDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: '작성자 아이디',
        required: true,
        example: '1'
    })
    userId: string;

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    @ApiProperty({
        description: '제목',
        required: true,
        example: 'title'
    })
    title: string;

    @IsNotEmpty()
    @ApiProperty({
        description: '내용',
        required: true,
        example: 'content'
    })
    content: string;
}