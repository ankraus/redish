import { RedishError } from '../error/redish-error';

export class Result<T = void> {
  constructor(
    public success = true,
    public error: RedishError | null = null,
    public result: T | null = null
  ) {}

  public static success<T = void>(result: T | null = null): Result<T> {
    return new Result<T>(true, null, result);
  }

  public static error<T = void>(error: RedishError): Result<T> {
    return new Result<T>(false, error);
  }
}
