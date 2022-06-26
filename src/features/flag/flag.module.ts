import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FlagResolver } from './flag.resolvers';
import { FlagService } from './flag.service';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [ConfigModule, CoreModule],
providers: [FlagResolver, FlagService],
  exports: [FlagResolver, FlagService]
})

export class FlagModule {}