import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AddLogCommand } from './addLog.command';
import { Log } from './../models/log.model';

@CommandHandler(AddLogCommand)
export class AddLogCommandHandler implements ICommandHandler<AddLogCommand> {
  constructor() {}

  async execute(command: AddLogCommand) {
    // placeholder
    return new Log();
  }
}