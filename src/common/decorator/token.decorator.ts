import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getResponse();
        return request.locals.jwt;
    },
);

// 위 데코레이터를 사용하면
// jwt를 사용할 때
// @Token() token 이렇게 사용할 수 있다.