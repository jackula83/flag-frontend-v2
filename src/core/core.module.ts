import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BasicHttpClient } from "./http/basicHttpClient.service";
import { HttpClient } from "./http/httpClient.service";
import { LoggingService } from "./logging/logging.service";
import { SentryService } from "./logging/sentry.service";
import { DateScalar } from './scalars/date.scalars';

@Module({
  imports: [
  ConfigModule,
    HttpModule
  ],
  providers: [{
    provide: LoggingService,
    useClass: SentryService
  },{
    provide: HttpClient,
    useClass: BasicHttpClient
  },
  DateScalar],
  exports: [ConfigModule, HttpModule, LoggingService, HttpClient]
})

export class CoreModule {}