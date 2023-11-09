import { Module } from '@nestjs/common';
import { ShellModule } from '@redish-backend/shell';
import { GameController } from './controllers/game.controller';
import { SharedModule } from '@redish-backend/shared';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [ShellModule, SharedModule],
  controllers: [GameController, UserController],
})
export class RestApiModule {}
