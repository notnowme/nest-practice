import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// 커스텀 데코레이터

/**
 * Ip 반환
 */
export const Ip = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    return req.ip;
});