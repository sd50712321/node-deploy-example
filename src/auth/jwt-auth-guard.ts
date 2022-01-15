import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger('JwtAuthGuard');
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    // this.logger.log('user', user);
    // this.logger.log('info', info);
    // this.logger.log(
    //   'info instanceof TokenExpiredError',
    //   info instanceof TokenExpiredError,
    // );

    if (info instanceof TokenExpiredError) {
      // this.logger.error(
      //   `JWT Token expired at ${new Date(info.expiredAt).toISOString()}`,
      // );
      throw new UnauthorizedException('Token expired');
    }

    if (err || !user) {
      // console.error('err', err);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
