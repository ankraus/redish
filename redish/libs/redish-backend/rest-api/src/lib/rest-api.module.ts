import { Module } from '@nestjs/common';
import { ShellModule } from '@redish-backend/shell';
import { GameController } from './controllers/game.controller';
import { SharedModule } from '@redish-backend/shared';
import { AuthenticationController } from './controllers/authentication.controller';

@Module({
  imports: [ShellModule, SharedModule],
  controllers: [GameController, AuthenticationController],
})
export class RestApiModule {}
