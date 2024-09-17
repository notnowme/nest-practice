import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiSuccessResCommon = (resDto: any) => {
    return applyDecorators(
        ApiResponse({ status: 200, description: '성공', type: resDto})
    );
}

export const ApiBadRequestRes = (resDto: any) => {
    return applyDecorators(
        ApiResponse({status:400, description: '실패', type: resDto})
    )
}