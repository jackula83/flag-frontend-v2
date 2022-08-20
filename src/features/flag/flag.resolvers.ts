import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Flag } from './models/flag.model';
import { FlagService } from './flag.service';

@Resolver(of => Flag)
export class FlagResolver {
  constructor(private readonly flagService: FlagService) {}

  @Query(returns => [Flag])
  async flags() {
    return this.flagService.enumerate();
  }

  @Query(returns => Flag)
  async flag(@Args('id', {type: () => Int}) id: number) {
    const result = this.flagService.get(id);
    return result;
  }
}