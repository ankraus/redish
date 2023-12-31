import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';

@Module({
  imports: [ConfigurationModule],
  exports: [ConfigurationModule],
})
export class SharedModule {}
