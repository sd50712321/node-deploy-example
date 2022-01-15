import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './dto/jwt-payload.interface';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      return request.user;
    }
    return {};
  },
);
