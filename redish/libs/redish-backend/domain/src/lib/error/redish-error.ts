const registrationError = 100;
const gameError = 200;

export class RedishError {
  constructor(
    public code: number,
    public message: string,
    public exception: Error | null = null
  ) {}

  public static Domain = class {
    public static Codes = class {
      static USERNAME_TOO_SHORT = registrationError + 1;
      static GAME_MAX_NUMBER_PLAYERS = gameError + 1;
    };

    public static userNameTooShort(): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.USERNAME_TOO_SHORT,
        'Username given is too short'
      );
    }

    public static maxNumberOfPlayersReached(): RedishError {
      return new RedishError(
        RedishError.Domain.Codes.GAME_MAX_NUMBER_PLAYERS,
        'Maximum number of players reached'
      );
    }
  };
}
