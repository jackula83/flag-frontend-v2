export class AddLogCommand {
  constructor(
    public readonly message: string,
    public readonly type: string,
    public readonly source: string
  ) {}
}