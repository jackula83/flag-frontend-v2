import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { FlagToggleCommand } from './flagToggle.command';
import { FlagService } from '../services/flag.service';

@CommandHandler(FlagToggleCommand)
export class FlagToggleCommandHandler implements ICommandHandler<FlagToggleCommand> {
  constructor(private readonly flagService: FlagService) {}

  async execute(command: FlagToggleCommand) {
    return this.flagService.toggle(command.flagId);
  }
}