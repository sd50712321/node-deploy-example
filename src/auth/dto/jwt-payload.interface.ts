import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiProperty({
    description: '유저 아이디',
  })
  USER_ID: string;

  @ApiProperty({
    description:
      '유저 등급 120100:kins 관리자, 120200:kins 사용자, 120300:유관기관 사용자, 120400:업체본 사용자, 120500: 업체출장소사용자',
  })
  Grade: string;

  @ApiProperty({
    description: '소속업체ID CORP_CO',
  })
  CORP_CO: string;

  @ApiProperty({
    description: '사업소ID CORP_ID',
  })
  CORP_ID: string;
}
