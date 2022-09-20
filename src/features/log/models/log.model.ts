import { Field, ObjectType } from "@nestjs/graphql";
import { Entity } from "../../../core/models/entity";
import { LogDto } from "./log.dto";


@ObjectType()
export class Log extends Entity {

  @Field({defaultValue: LogDto.TypeInfo})
  type: string;
  
  @Field({defaultValue: ''})
  message: string;
  
  @Field({defaultValue: LogDto.SrcFlagFrontend})
  source: string;
}