import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response, Request } from 'express';


// Http 오류를 잡아서, 가공하는 듯...?
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const req = ctx.getRequest<Request>();

        res.status(status).json({
            statusCode: status,
            timeStamp: new Date().toISOString(),
            path: req.url,
            message: exception.message
        });
    }
}