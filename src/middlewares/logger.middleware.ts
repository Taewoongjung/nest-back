import {Injectable, Logger, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";

@Injectable() // nest/morgan 흉내내보기
export class LoggerMiddleware implements NestMiddleware { // 1. 해당 미들웨어는 라우터 보다 더 먼저 실행된다.
    private logger = new Logger('HTTP'); // HTTP 관련된 요청들은 로그가 남는다.

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl} = request; // 2. request에 대한 것을 기록 하고, 라우터 시작할 때 이 줄과 다음 줄에 해당 하는 것을 기록 하고
        const userAgent = request.get('user-agent') || ''; // header에 'user-agent'가 없으면 빈칸

        response.on('finish', () => { // 4. 라우터 끝나고 나서 기록한다.
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
        });

    next(); // 3. 라우터로 간 다음에
    }
}