import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Flag } from './models/flag.model';
import { FlagService } from './flag.service';

@Resolver(of => Flag)
export class FlagResolver {
  constructor(private readonly flagService: FlagService) {}

  @Query(returns => [Flag])
  async flags(): Promise<Flag[]> {
    return this.flagService.enumerate();
  }

  @Query(returns => Flag, { name: 'flag', nullable: true})
  async flag(@Args('id', {type: () => Int}) id: number) {
    const result = await this.flagService.get(id);
    return result;
  }

  @Query(returns => String)
  async hello() {
    return "Hello world!"
  }

  @Query(returns => Flag)
  async test() {
    const flag = new Flag();
    flag.alias = "abc";
    return flag;
  }
}