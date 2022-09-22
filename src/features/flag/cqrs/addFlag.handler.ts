import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AddFlagCommand } from './addFlag.command';
import { FlagService } from './../services/flag.service';
import { Flag } from './../models/flag.model';

@CommandHandler(AddFlagCommand)
export class AddFlagCommandHandler implements ICommandHandler<AddFlagCommand> {
  constructor(private readonly flagService: FlagService) {}

  async execute(command: AddFlagCommand) {
    const flag = new Flag();
    flag.name = command.name;
    flag.description = command.description;
    console.log('addFlag flag obj: ', flag)
    return this.flagService.add(flag);
  }
}