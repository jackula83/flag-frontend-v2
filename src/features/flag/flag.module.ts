import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";
import { FlagResolver } from './flag.resolvers';
import { FlagService } from './services/flag.service';
import { CoreModule } from '../../core/core.module';
import { FlagToggleCommandHandler } from "./cqrs/flagToggle.handler";
import { FlagQueryHandler } from "./cqrs/flag.handler";
import { AddFlagCommandHandler } from "./cqrs/addFlag.handler";
import { UpdateFlagCommandHandler } from "./cqrs/updateFlag.handler";

export const CommandHandlers = [
  AddFlagCommandHandler,
  UpdateFlagCommandHandler,
  FlagToggleCommandHandler
];
export const QueryHandlers = [FlagQueryHandler];

@Module({
  imports: [
    ConfigModule, 
    CqrsModule,
    CoreModule
  ],
  providers: [
    FlagResolver, 
    FlagService,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})

export class FlagModule {}