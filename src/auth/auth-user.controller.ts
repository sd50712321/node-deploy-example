import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SecretService } from 'src/common/common.secret.service';
// import { UserService } from 'src/tg/user/user.service';
import { AuthSignInDto } from './dto/auth-signIn.dto';
import { JwtPayload } from './dto/jwt-payload.interface';
import {
  AuthSignInResult,
  AuthSignInResultResponse,
} from './response/auth-signIn.response';

@Controller('/auth')
export class AuthUserController {
  private logger = new Logger('AuthController');
  constructor(
    private readonly secretService: SecretService,
    // private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // @Post('/signin')
  // @ApiTags('인증')
  // @ApiOperation({
  //   summary: '로그인합니다',
  //   description: 'accesstoken을 반환합니다',
  // })
  // @ApiOkResponse({ type: AuthSignInResultResponse })
  // async signIn(
  //   @Body() authSignInDto: AuthSignInDto,
  // ): Promise<AuthSignInResult> {
  //   // const password = 'kinsRadlot1!';
  //   // const user_id = 'Radlot';
  //   const { USER_ID, USER_PWD } = authSignInDto;
  //   const userLoginInfo = await this.userService.getLoginInfo(USER_ID);
  //   if (!userLoginInfo) {
  //     throw new NotFoundException('User not found');
  //   }
  //   const compareResult = this.secretService.comparePassword(
  //     USER_PWD,
  //     userLoginInfo.USER_PWD,
  //   );
  //   if (!compareResult) {
  //     throw new UnauthorizedException('Invalid User');
  //   }

  //   if (userLoginInfo && compareResult) {
  //     const { Grade, CompanyID, DivisionID } = userLoginInfo;
  //     const payload: JwtPayload = {
  //       USER_ID,
  //       Grade,
  //       CORP_CO: CompanyID,
  //       CORP_ID: DivisionID,
  //     };
  //     const accessToken: string = await this.jwtService.sign(payload);
  //     // await this.jwtService.verify(accessToken);
  //     // this.logger.log('accessToken: ' + accessToken);
  //     return {
  //       accessToken,
  //     };
  //   } else {
  //     throw new UnauthorizedException('Login failed');
  //   }
  // }
}
