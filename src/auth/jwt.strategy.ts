import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { User } from 'src/tg/user/user.entity';
// import { UserService } from 'src/tg/user/user.service';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('JwtStrategy');
  constructor(
    // private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const { USER_ID } = payload;
    // this.logger.log(USER_ID);
    // const user: User = await this.userService.getLoginInfo(USER_ID);
    // this.logger.log(user);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    return payload;
  }
}
