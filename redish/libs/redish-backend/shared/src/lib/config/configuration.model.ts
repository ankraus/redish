import { DatabaseConfiguration } from './database-configuration.model';
import { DictionaryConfiguration } from './dictionary-configuration.model';
import { JwtConfiguration } from './jwt-configuration.model';

export interface Configuration {
  database: DatabaseConfiguration;
  jwt: JwtConfiguration;
  dictionary: DictionaryConfiguration;
}
