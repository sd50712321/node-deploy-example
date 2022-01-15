import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'src/common/common.util.service';

export class CommonResponse<T> {
  @ApiProperty({
    description: '성공 여부',
  })
  readonly result: boolean;

  @ApiProperty({
    description: '결과 값',
  })
  readonly data: T[] | null | undefined;

  @ApiProperty({
    description: '페이징 정보',
  })
  readonly pagination: Pagination;
}

export class CommonResponseExceptPaging<T> {
  @ApiProperty({
    description: '성공 여부',
  })
  readonly result: boolean;

  @ApiProperty({
    description: '결과 값',
  })
  readonly data: T[] | null | undefined;
}

export class CommonResponseSingleObject<T> {
  @ApiProperty({
    description: '성공 여부',
  })
  readonly result: boolean;

  @ApiProperty({
    description: '결과 값',
  })
  readonly data: T | null | undefined;
}

export class CommonResponseVoid {
  @ApiProperty({
    description: '성공 여부',
  })
  readonly result: boolean;
}
