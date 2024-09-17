import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { CreateBoardDto } from "./create-board.dto";

export class UpdateBoardDto {
    
    @IsNotEmpty()
    @ApiProperty({
        description: '내용',
        required: true,
        example: 'content'
    })
    content: string;
}

// 외부에서 가져와서 하는 경우에는
// validate도 같이 적용된다
// export class UpdateBoardDto extends PartialType(CreateBoardDto) {};
// PickType, OmitType도 있다 (TS와 동일)