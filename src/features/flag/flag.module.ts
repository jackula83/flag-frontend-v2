import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CoreModule } from "src/core/core.module";
import { FlagResolver } from './flag.resolvers';
import { FlagService } from './flag.service';

@Module({
  imports: [ConfigModule, CoreModule],
  providers: [FlagResolver, FlagService]
})

export class FlagModule {}