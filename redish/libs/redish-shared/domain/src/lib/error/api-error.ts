export class ApiError {
  constructor(
    public message: string,
    public error: string,
    public statusCode: number
  ) {}
}
