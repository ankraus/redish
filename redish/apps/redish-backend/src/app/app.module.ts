import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RestApiModule } from '@redish-backend/rest-api';

@Module({
  imports: [RestApiModule],
  controllers: [AppController],
})
export class AppModule {}
