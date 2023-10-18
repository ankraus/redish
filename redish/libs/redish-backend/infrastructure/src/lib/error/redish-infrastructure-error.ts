import { RedishError } from '@redish-backend/domain';

const environmentError = 2100;
const repositoryError = 2200;
const cqrsError = 2300;

export class RedishInfrastructureError extends RedishError {
  static Infrastructure = class {
    public static Codes = class {
      static ENVIRONMENT_VARIABLE_MISSING = environmentError + 1;

      static REPOSITORY_NOT_AVAILABLE = repositoryError + 1;

      static UNKNOWN_CQRS_ERROR = cqrsError + 1;
    };

    public static environmentVariableMissing(environmentVariableName: string) {
      return new RedishError(
        RedishInfrastructureError.Infrastructure.Codes.ENVIRONMENT_VARIABLE_MISSING,
        `Environment variable '${environmentVariableName}' missing. Please provide.`
      );
    }

    public static repositoryNotAvailable() {
      return new RedishError(
        RedishInfrastructureError.Infrastructure.Codes.REPOSITORY_NOT_AVAILABLE,
        'Some Problem with the repo'
      );
    }

    public static unknownCqrsError(exception: Error | null = null) {
      return new RedishError(
        RedishInfrastructureError.Infrastructure.Codes.UNKNOWN_CQRS_ERROR,
        'Some Problem with cqrs',
        exception
      );
    }
  };
}
