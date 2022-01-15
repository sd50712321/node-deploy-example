import { ValidationError } from '@hapi/joi';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpAdapterHost,
  HttpStatus,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HttpExceptionFilter', { timestamp: true });
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.log('exception in http', exception);
    response.status(status).json({
      result: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private logger = new Logger('NotFoundExceptionFilter', { timestamp: true });
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.log('exception in notfound ', exception);

    const message = exception.message;
    this.logger.log('message', message);
    response.status(status).json({
      result: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

@Catch(BadRequestException)
export class ValidationExceptionFilter
  implements ExceptionFilter<BadRequestException>
{
  private logger = new Logger('ValidationExceptionFilter', { timestamp: true });
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.UNPROCESSABLE_ENTITY;
    this.logger.log('exception in validation', exception);

    response.status(status).json({
      result: false,
      statusCode: status,
      error: `Unprocessable Entity`,
      message: exception.response.message.map((data) => data.constraints),
    });
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger('AllExceptionsFilter', { timestamp: true });
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error =
      exception instanceof HttpException
        ? exception.message
        : exception instanceof QueryFailedError
        ? 'Internal Server Error'
        : 'Internal Server Error';

    // if (error instanceof ValidationError) {
    //   this.logger.log('exception in validation ', error);
    // }

    // if (error instanceof QueryFailedError) {
    //   this.logger.log('exception in query ', error);
    // }

    this.logger.error('exception', exception);

    response.status(status).json({
      result: false,
      statusCode: status,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
