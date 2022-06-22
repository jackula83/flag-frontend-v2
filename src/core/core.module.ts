import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Providers } from "./core.types";
import { BasicHttpClient } from "./http/basicHttpClient.service";
import { SentryService } from "./logging/sentry.service";

@Global()
@Module({
  imports: [
  ConfigModule,
    HttpModule
  ],
  providers: [{
    provide: Providers.LogService.toString(),
    useClass: SentryService
  },{
    provide: Providers.HttpClient.toString(),
    useClass: BasicHttpClient
  }],
})

export class CoreModule {}