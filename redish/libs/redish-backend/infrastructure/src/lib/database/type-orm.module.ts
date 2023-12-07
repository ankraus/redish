import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigurationService } from '@redish-backend/shared';

const typeOrmModule = TypeOrmModule.forRootAsync({
  useFactory: (configurationService: ConfigurationService) => {
    const options: TypeOrmModuleOptions = {
      ...configurationService.getDbConfig(),
      entities: [],
    };

    return options;
  },
  inject: [ConfigurationService],
});

@Module({
  imports: [typeOrmModule],
  exports: [typeOrmModule],
})
export class TypeOrmRootModule {}
