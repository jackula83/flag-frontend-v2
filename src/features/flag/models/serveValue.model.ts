import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServeValue {

  @Field()
  state: boolean
}