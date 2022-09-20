import { QueryHandler, IQueryHandler } from '@nestjs/cqrs'
import { Log } from '../models/log.model';
import { LogQuery } from './log.query';

@QueryHandler(LogQuery)
export class LogQueryHandler implements IQueryHandler<LogQuery> {
  constructor() {}

  async execute(query: LogQuery) {
    // placeholder
    if (query.logId === 0) return [new Log()];
    return new Log();
  }
}