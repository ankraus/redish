import { Module } from '@nestjs/common';
import { ShellModule } from '@redish-backend/shell';
import { GameController } from './controllers/game.controller';

@Module({
  imports: [ShellModule],
  controllers: [GameController],
})
export class RestApiModule {}
