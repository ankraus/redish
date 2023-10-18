import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IDatabaseConfiguration } from '../database-configuration/database-configuration.interface';

const typeOrmModule = TypeOrmModule.forRootAsync({
  useFactory: () => {
    const config: IDatabaseConfiguration = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      synchronize: true,
      autoLoadEntities: true,
    };

    const options: TypeOrmModuleOptions = {
      // todo dirname as env?
      // entities: [__dirname + './../../**/*.entity{.ts,.js}'],
      ...config,
      entities: [],
      type: config.type,
    };

    return options;
  },
  inject: [],
});

@Module({
  imports: [typeOrmModule],
  exports: [typeOrmModule],
})
export class TypeOrmRootModule {}
