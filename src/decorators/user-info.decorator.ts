import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})