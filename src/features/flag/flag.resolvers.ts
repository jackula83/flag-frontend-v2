import { Args, Query, Resolver } from "@nestjs/graphql";
import { Flag } from './models/flag.model';
import { FlagService } from './flag.service';

@Resolver(of => Flag)
export class FlagResolver {
  constructor(private readonly flagService: FlagService) {}

  @Query(returns => [Flag])
  async flags(): Promise<Flag[]> {
    return this.flagService.enumerate();
  }

  @Query(returns => Flag)
  async flag(@Args('id') id: number): Promise<Flag> {
    return await this.flagService.get(id);
  }
}