import { HttpModule } from "@nestjs/axios";
import { Global, Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { BasicHttpClient } from "./http/basicHttpClient.service";
import { HttpClient } from "./http/httpClient.service";
import { LoggingService } from "./logging/logging.service";
import { SentryService } from "./logging/sentry.service";
import { DateScalar } from './scalars/date.scalars';

@Global()
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
  exports: [
    LoggingService, 
    HttpClient]
})

export class CoreModule {}