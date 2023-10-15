import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RestApiModule } from '@redish-backend/rest-api';

@Module({
  imports: [
    RestApiModule,
    // todo
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
