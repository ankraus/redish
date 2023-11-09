import { ApiProperty } from '@nestjs/swagger';
import { RedishError } from '@redish-shared/domain';

export class RedishErrorDto extends RedishError {
  @ApiProperty()
  public override code: number;

  @ApiProperty()
  public override message: string;

  @ApiProperty()
  public override cause: unknown;

  constructor(code: number, message: string, cause: unknown = null) {
    super(code, message, cause);
    this.code = code;
    this.message = message;
    this.cause = cause;
  }
}
