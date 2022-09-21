import { Field, ObjectType } from "@nestjs/graphql";
import { Entity } from "../../../core/models/entity";
import { LogInput } from "./log.input";


@ObjectType()
export class Log extends Entity {

  @Field({defaultValue: LogInput.TypeInfo})
  type: string;
  
  @Field({defaultValue: ''})
  message: string;
  
  @Field({defaultValue: LogInput.SrcFlagFrontend})
  source: string;
}