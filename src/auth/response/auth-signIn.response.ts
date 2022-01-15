import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseSingleObject } from 'src/type/common.response';

export class AuthSignInResult {
  @ApiProperty({ description: '조사기 고유번호' })
  readonly accessToken: string;
}

export class AuthSignInResultResponse extends CommonResponseSingleObject<AuthSignInResult> {
  @ApiProperty({
    description: '결과 값',
    type: AuthSignInResult,
  })
  readonly data: AuthSignInResult;
}
