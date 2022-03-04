// interceptor는 마지막에 데이터를 한번 더 가공해주는 역할로 사용할 수 있다.

import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";

export class UndefinedToNullInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        // controller에 가기 전 부분을 작성하는 곳 (이 부분은 잘 활용하진 않지만 로깅하는 것으로 사용할 수 있다.)
        return next
            .handle()
            .pipe(map((data) => data === undefined ? null : data)); // data는 controller에서 return해주는 데이터
        // data에 undefined가 있으면 다 null로 바꾸는 이유가 json은 undefined를 모르기 때문에 에러가 나기 때문이다.
    }
}