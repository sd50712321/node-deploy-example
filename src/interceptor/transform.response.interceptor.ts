import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
// import { isArray, isObject } from 'class-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private logger = new Logger('ResponseTransformInterceptor', {
    timestamp: true,
  });
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((res) => {
        this.logger.log('res', res instanceof Object);
        const { data, pagination, result, ...rest } = res || {};
        if (res?.data instanceof Array) {
          return {
            result: result ? result : true,
            data: data.map((item) => {
              return {
                ...item,
              };
            }),
            pagination,
            ...rest,
          };
        } else if (res instanceof Array) {
          return {
            result: result ? result : true,
            data: res,
          };
        } else if (res?.data instanceof Object) {
          return {
            result: result ? result : true,
            data: data
              ? {
                  ...data,
                  ...rest,
                }
              : {
                  ...rest,
                },
          };
        } else if (!res?.data && result) {
          return { result };
        } else {
          return {
            result: true,
            data: !res ? {} : res instanceof Object ? { ...res } : res,
          };
        }
      }),
    );
  }
}
