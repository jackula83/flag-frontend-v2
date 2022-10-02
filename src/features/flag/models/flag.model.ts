import { Field, ObjectType } from "@nestjs/graphql";
import { ServeValue } from "./serveValue.model";
import { Entity } from '@flagcar/core/models/entity';

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