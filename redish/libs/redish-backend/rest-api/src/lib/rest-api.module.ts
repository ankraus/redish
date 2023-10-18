import { Module } from '@nestjs/common';
import { ShellModule } from '@redish-backend/shell';
import { GameController } from './controllers/game.controller';
import { SharedModule } from '@redish-backend/shared';

@Module({
  imports: [ShellModule, SharedModule],
  controllers: [GameController],
})
export class RestApiModule {}
