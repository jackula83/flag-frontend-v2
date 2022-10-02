import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Flag } from './models/flag.model';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FlagQuery } from './cqrs/flag.query';
import { FlagToggleCommand } from './cqrs/flagToggle.command';
import { FlagHeaderInput } from "./models/flagHeader.input";
import { AddFlagCommand } from './cqrs/addFlag.command';
import { UpdateFlagInput } from "./models/updateFlag.input";

@Resolver(of => Flag)
export class FlagResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Query(returns => [Flag])
  async flags() {
    return this.queryBus.execute(new FlagQuery());
  }

  @Query(returns => Flag)
  async flag(@Args('id', { type: () => Int }) id: number) {
    return this.queryBus.execute(new FlagQuery(id));
  }

  @Mutation(returns => Flag)
  async addFlag(@Args('flagHeader') flagHeader: FlagHeaderInput) {
    const {name, description} = flagHeader;
    return this.commandBus.execute(new AddFlagCommand(name, description));
  }

  @Mutation(returns => Flag)
  async updateFlag(@Args('updateFlag') flagInput: UpdateFlagInput) {
    
  }

  @Mutation(returns => Flag)
  async toggleFlag(@Args('id', { type: () => Int }) id: number) {
    return this.commandBus.execute(new FlagToggleCommand(id));
  }

  /**
   * 
   * @deprecated use toggleFlag instead
   */
  @Mutation(returns => Flag)
  async toggle(@Args('id', { type: () => Int }) id: number) {
    return this.commandBus.execute(new FlagToggleCommand(id));
  }
}