const registrationError = 100;
const gameError = 200;
const databaseError = 300;
const authenticationError = 400;

const environmentError = 2100;
const repositoryError = 2200;
const cqrsError = 2300;

export class RedishError {
  constructor(
    public code: number,
    public message: string,
    public cause: unknown = null
  ) {}

  public static Unknown = () => new RedishError(-1, 'Unknown error');

  public static Domain = class {
    public static Codes = class {
      static USERNAME_TOO_SHORT = registrationError + 1;
      static USERNAME_ALREADY_EXISTS = registrationError + 2;
      static EMAIL_ALREADY_EXISTS = registrationError + 3;
      static PASSWORD_TOO_SHORT = registrationError + 4;
      static GAME_MAX_NUMBER_PLAYERS = gameError + 1;
      static DATABASE_ERROR = databaseError + 1;
      static AUTHENTICATION_ERROR = authenticationError + 1;
      static UNAUTHORIZED_ERROR = authenticationError + 2;
      static TECHNICAL_AUTHENTICATION_ERROR = authenticationError + 3;
    };

    public static userNameTooShort(): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.USERNAME_TOO_SHORT,
        'Username given is too short'
      );
    }

    public static userNameAlreadyExists(): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.USERNAME_ALREADY_EXISTS,
        'Username already exists'
      );
    }

    public static emailAlreadyExists(): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.EMAIL_ALREADY_EXISTS,
        'Email already exists'
      );
    }

    public static passwordTooShort(): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.PASSWORD_TOO_SHORT,
        'Password too short'
      );
    }

    public static maxNumberOfPlayersReached(): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.GAME_MAX_NUMBER_PLAYERS,
        'Maximum number of players reached'
      );
    }

    public static databaseError(cause?: unknown): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.DATABASE_ERROR,
        'A database error has occurred',
        cause
      );
    }

    public static authenticationError(cause?: unknown): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.AUTHENTICATION_ERROR,
        'Email or password incorrect',
        cause
      );
    }

    public static technicalAuthenticationError(cause?: unknown): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.TECHNICAL_AUTHENTICATION_ERROR,
        'An internal error has occurred during authentication',
        cause
      );
    }

    public static unauthorizedError(cause?: unknown): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.UNAUTHORIZED_ERROR,
        'Unauthorized',
        cause
      );
    }
  };

  static Infrastructure = class {
    public static Codes = class {
      static ENVIRONMENT_VARIABLE_MISSING = environmentError + 1;

      static REPOSITORY_NOT_AVAILABLE = repositoryError + 1;
      static NOT_FOUND = repositoryError + 2;
      static DATABASE_ERROR = repositoryError + 3;

      static UNKNOWN_CQRS_ERROR = cqrsError + 1;
    };

    public static environmentVariableMissing(environmentVariableName: string) {
      return new RedishError(
        RedishError.Infrastructure.Codes.ENVIRONMENT_VARIABLE_MISSING,
        `Environment variable '${environmentVariableName}' missing. Please provide.`
      );
    }

    public static repositoryNotAvailable() {
      return new RedishError(
        RedishError.Infrastructure.Codes.REPOSITORY_NOT_AVAILABLE,
        'Some Problem with the repo'
      );
    }

    public static notFound() {
      return new RedishError(
        RedishError.Infrastructure.Codes.NOT_FOUND,
        'Not found in database'
      );
    }

    public static databaseError(cause: unknown = null) {
      return new RedishError(
        RedishError.Infrastructure.Codes.DATABASE_ERROR,
        'Database error',
        cause
      );
    }

    public static unknownCqrsError(exception: Error | null = null) {
      return new RedishError(
        RedishError.Infrastructure.Codes.UNKNOWN_CQRS_ERROR,
        'Some Problem with cqrs',
        exception
      );
    }
  };
}
