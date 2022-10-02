import { Flag } from "../models/flag.model";

export class UpdateFlagCommand {
  constructor(
    public readonly id: number,
    public readonly description: string,
    public readonly isEnabled: boolean,
    public readonly defaultServeValue: boolean
  ) {}
}