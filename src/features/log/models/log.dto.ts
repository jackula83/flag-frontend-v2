import { Field, InputType } from "@nestjs/graphql";
import { IsIn } from "class-validator";

@InputType()
export class LogDto {

  public static readonly SrcFlagFrontend = 'flag-frontend';
  public static readonly SrcFlagUI = 'flag-ui';

  public static readonly TypeInfo = 'info';
  public static readonly TypeWarning = 'warning';
  public static readonly TypeError = 'error';

  @Field()
  @IsIn([LogDto.TypeInfo, LogDto.TypeWarning, LogDto.TypeError])
  type: string;
  
  @Field()
  message: string;
  
  @Field()
  @IsIn([LogDto.SrcFlagFrontend, LogDto.SrcFlagUI])
  source: string;
}