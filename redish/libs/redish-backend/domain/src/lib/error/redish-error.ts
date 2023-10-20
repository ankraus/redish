const registrationError = 100;
const gameError = 200;
const databaseError = 300;

export class RedishError {
  constructor(
    public code: number,
    public message: string,
    public exception: Error | null = null
  ) { }

  public static Domain = class {
    public static Codes = class {
      static USERNAME_TOO_SHORT = registrationError + 1;
      static USERNAME_ALREADY_EXISTS = registrationError + 2;
      static EMAIL_ALREADY_EXISTS = registrationError + 3;
      static GAME_MAX_NUMBER_PLAYERS = gameError + 1;
      static DATABASE_ERROR = databaseError + 1;
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

    public static maxNumberOfPlayersReached(): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.GAME_MAX_NUMBER_PLAYERS,
        'Maximum number of players reached'
      );
    }

    public static databaseError(): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.DATABASE_ERROR,
        'A database error has occurred'
      )
    }
  };
}
