import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { PageResDto } from "src/common/dto/page-res.dto";

export const ApiGetResponse = <T extends Type<any>>(model: T) => {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [
                    {
                        $ref: getSchemaPath(model)
                    }
                ]
            }
        })
    );
}

export const ApiPostResponse = <T extends Type<any>>(model: T) => {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [
                    {
                        $ref: getSchemaPath(model)
                    }
                ]
            }
        })
    );
}

export const ApiGetListReponse = <T extends Type<any>>(model: T) => {
    return applyDecorators(
        ApiOkResponse(
            {
                schema: {
                    allOf: [
                        { $ref: getSchemaPath(PageResDto) },
                        {
                            properties: {
                                items: {
                                    type: 'array',
                                    items: { $ref: getSchemaPath(model) },
                                },
                            },
                            required: ['items'],
                        }
                    ]
                }
            }
        )
    );
}