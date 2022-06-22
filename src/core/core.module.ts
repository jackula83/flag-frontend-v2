import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LogService } from './core.types';
import { SentryService } from "./logging/sentry.service";

@Global()
@Module({
  imports: [
    ConfigModule,
    HttpModule
  ],
  providers: [{
    provide: nameof<LogService>(),
    useClass: SentryService
  }],
})

export class CoreModule {}