import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";
import { AddLogCommandHandler } from "./cqrs/addLog.handler";
import { LogQueryHandler } from "./cqrs/log.handler";
import { LogResolver } from "./log.resolvers";
import { LogService } from "./log.service";
import { CoreModule } from "@flagcar/core/core.module";

export const CommandHandlers = [AddLogCommandHandler];
export const QueryHandlers = [LogQueryHandler];

@Module({
  imports: [ConfigModule, CqrsModule, CoreModule],
  providers: [
    LogResolver, 
    LogService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class LogModule {}