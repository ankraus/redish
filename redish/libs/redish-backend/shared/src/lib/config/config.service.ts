import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { IDatabaseConfiguration } from './database-configuration.interface';
import { IJwtConfiguration } from './jwt-configuration.interface';

const CONFIG_NAMESPACE = 'redish-backend';

export const redishBackendConfigurationService = registerAs(
  CONFIG_NAMESPACE,
  () => ({
    db: {
      type: process.env['DATABASE_TYPE'],
      host: process.env['DATABASE_HOST'],
      port: parseInt(process.env['DATABASE_PORT'] || '', 10),
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSWORD'],
      database: process.env['DATABASE_DATABASE'],
      synchronize: JSON.parse(process.env['DATABASE_SYNCHRONIZE'] || ''),
      autoLoadEntities: JSON.parse(
        process.env['DATABASE_AUTO_LOAD_ENTITIES'] || ''
      ),
    },
    jwt: {
      jwt_secret: process.env['JWT_SECRET'],
      jwt_expiry: process.env['JWT_EXPIRY'],
    },
  })
);

@Injectable()
export class RedishBackendConfigurationService {
  constructor(private configService: ConfigService) {}

  getDbConfig(): IDatabaseConfiguration {
    const config = this.configService.get<IDatabaseConfiguration>(
      CONFIG_NAMESPACE + '.db'
    );

    if (!config) {
      throw new Error('missing db config');
    }

    return config;
  }

  getJwtConfig(): IJwtConfiguration {
    const config = this.configService.get<IJwtConfiguration>(
      CONFIG_NAMESPACE + '.jwt'
    );

    if (!config) {
      throw new Error('missing jwt config');
    }

    return config;
  }
}
