import { Field, ObjectType } from "@nestjs/graphql";
import { Entity } from "../../../core/models/entity";


@ObjectType()
export class Log extends Entity {

  public static readonly SrcFlagFrontend = 'flag-frontend';
  public static readonly SrcFlagUI = 'flag-ui';

  public static readonly TypeInfo = 'info';
  public static readonly TypeWarning = 'warning';
  public static readonly TypeError = 'error';

  @Field({defaultValue: Log.TypeInfo})
  type: string;
  
  @Field({defaultValue: ''})
  message: string;
  
  @Field({defaultValue: Log.SrcFlagFrontend})
  source: string;
}