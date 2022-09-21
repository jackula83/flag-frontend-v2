import { Field, InputType } from "@nestjs/graphql";
import { IsIn } from "class-validator";

@InputType()
export class LogInput {

  public static readonly SrcFlagFrontend = 'flag-frontend';
  public static readonly SrcFlagUI = 'flag-ui';

  public static readonly TypeInfo = 'info';
  public static readonly TypeWarning = 'warning';
  public static readonly TypeError = 'error';

  @Field()
  @IsIn([LogInput.TypeInfo, LogInput.TypeWarning, LogInput.TypeError])
  type: string;
  
  @Field()
  message: string;
  
  @Field()
  @IsIn([LogInput.SrcFlagFrontend, LogInput.SrcFlagUI])
  source: string;
}