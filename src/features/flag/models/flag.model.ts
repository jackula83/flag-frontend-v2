import { Field, ObjectType } from "@nestjs/graphql";
import { Entity } from "../../../core/models/entity";
import { ServeValue } from './serveValue.model';


@ObjectType()
export class Flag extends Entity {

  @Field()
  name: string;
  
  @Field()
  description: string;
  
  @Field()
  alias: string;
  
  @Field({defaultValue: false})
  isEnabled: boolean;

  @Field(type => ServeValue)
  defaultServeValue: ServeValue;
}