import { FlagQuery } from './flag.query';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs'
import { FlagService } from '../services/flag.service';

@QueryHandler(FlagQuery)
export class FlagQueryHandler implements IQueryHandler<FlagQuery> {
  constructor(private readonly flagService: FlagService) {}

  async execute(query: FlagQuery) {
    if (query.flagId === 0) return this.flagService.enumerate();
    return this.flagService.get(query.flagId);
  }
}