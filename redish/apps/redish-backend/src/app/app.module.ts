import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RestApiModule } from '@redish-backend/rest-api';
import { ConfigurationModule } from 'libs/redish-backend/shared/src/lib/config/config.module';

@Module({
  imports: [
    RestApiModule,
    ConfigurationModule
  ],
  controllers: [AppController],
})
export class AppModule {}
