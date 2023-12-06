import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { DatabaseConfiguration } from './database-configuration.model';
import { JwtConfiguration } from './jwt-configuration.model';
import { Configuration } from './configuration.model';
import { DictionaryConfiguration } from './dictionary-configuration.model';

const CONFIG_NAMESPACE = 'redish-backend';

export const redishBackendConfigurationService = registerAs(
  CONFIG_NAMESPACE,
  (): Configuration => ({
    database: {
      type: (process.env['DATABASE_TYPE'] || 'postgres') as 'postgres',
      host: process.env['DATABASE_HOST'] || '',
      port: parseInt(process.env['DATABASE_PORT'] || '0', 10),
      username: process.env['DATABASE_USERNAME'] || '',
      password: process.env['DATABASE_PASSWORD'] || '',
      database: process.env['DATABASE_DATABASE'] || '',
      synchronize: JSON.parse(process.env['DATABASE_SYNCHRONIZE'] || 'false'),
      autoLoadEntities: JSON.parse(
        process.env['DATABASE_AUTO_LOAD_ENTITIES'] || 'false'
      ),
    },
    jwt: {
      secret: process.env['JWT_SECRET'] || '',
      expiry: process.env['JWT_EXPIRY'] || '',
      refreshSecret: process.env['JWT_REFRESH_SECRET'] || '',
      refreshExpiry: process.env['JWT_REFRESH_EXPIRY'] || '',
    },
    dictionary: {
      url: process.env['DICTIONARY_API'] || '',
    },
  })
);

@Injectable()
export class RedishBackendConfigurationService {
  constructor(private configService: ConfigService) {}

  getDbConfig(): DatabaseConfiguration {
    const config = this.configService.get<DatabaseConfiguration>(
      CONFIG_NAMESPACE + '.database'
    );

    if (!config) {
      throw new Error('missing db config');
    }

    return config;
  }

  getJwtConfig(): JwtConfiguration {
    const config = this.configService.get<JwtConfiguration>(
      CONFIG_NAMESPACE + '.jwt'
    );

    if (!config) {
      throw new Error('missing jwt config');
    }

    return config;
  }

  getDictionaryConfig(): DictionaryConfiguration {
    const config = this.configService.get<DictionaryConfiguration>(
      CONFIG_NAMESPACE + '.dictionary'
    );

    if (!config) {
      throw new Error('missing dictionary config');
    }

    return config;
  }
}
