import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LogService, HttpClient } from './core.types';
import { BasicHttpClient } from "./http/basicHttpClient.service";
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
  },{
    provide: nameof<HttpClient>(),
    useClass: BasicHttpClient
  }],
})

export class CoreModule {}