import { Field, ObjectType } from "@nestjs/graphql";
import { AggregateRoot } from "src/core/models/aggregateRoot";
import { ServeValue } from './serveValue.model';


@ObjectType()
export class Flag extends AggregateRoot {

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