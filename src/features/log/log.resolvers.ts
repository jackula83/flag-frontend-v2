import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AddLogCommand } from "./cqrs/addLog.command";
import { LogQuery } from './cqrs/log.query';
import { Log } from './models/log.model';
import { LogInput } from "./models/log.input";

@Resolver(of => Log)
export class LogResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Query(returns => [Log])
  async logs() {
    return this.queryBus.execute(new LogQuery());
  }

  @Query(returns => Log)
  async log(@Args('id', { type: () => Int }) id: number) {
    return this.queryBus.execute(new LogQuery(id));
  }

  @Mutation(returns => Log)
  async addLog(
    @Args('input') input: LogInput) {
    return this.commandBus.execute(new AddLogCommand(
      input.message,
      input.type,
      input.source
    ));
  }
}