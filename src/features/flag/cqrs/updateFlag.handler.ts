import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { FlagService } from './../services/flag.service';
import { UpdateFlagCommand } from './updateFlag.command';

@CommandHandler(UpdateFlagCommand)
export class UpdateFlagCommandHandler implements ICommandHandler<UpdateFlagCommand> {
  constructor(private readonly flagService: FlagService) {}

  async execute(command: UpdateFlagCommand) {
    const existingFlag = await this.flagService.get(command.id);
    if (!existingFlag) throw new NotFoundException(command);
    
    existingFlag.description = command.description;
    existingFlag.isEnabled = command.isEnabled;
    existingFlag.defaultServeValue.state = command.defaultServeValue;
    return this.flagService.update(existingFlag);
  }
}