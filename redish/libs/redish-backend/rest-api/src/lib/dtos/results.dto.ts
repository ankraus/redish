import { ApiProperty } from '@nestjs/swagger';
import { ResultsDto as IResultsDto } from '@redish-shared/domain';

export class ResultsDto<T> implements IResultsDto<T> {
  @ApiProperty()
  results: Array<T>;

  @ApiProperty()
  total: number;

  constructor(results: Array<T>, total: number) {
    this.results = results;
    this.total = total;
  }
}
