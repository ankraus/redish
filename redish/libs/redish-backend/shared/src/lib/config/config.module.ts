import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { RedishBackendConfigurationService, redishBackendConfigurationService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [redishBackendConfigurationService],
      isGlobal: true
    })
  ],
  exports: [RedishBackendConfigurationService],
  providers: [RedishBackendConfigurationService]
})
export class ConfigurationModule {}
