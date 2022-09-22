import { Field, ID, ObjectType } from "@nestjs/graphql";
import { NIL } from 'uuid';

@ObjectType()
export abstract class Entity {

  @Field(type => ID, {defaultValue: 0})
  id: number;

  @Field({defaultValue: NIL})
  uuid: string;

  @Field({defaultValue: false})
  deleteFlag: boolean;

  @Field({defaultValue: Date.UTC})
  createdAt: Date;

  @Field({nullable: true})
  updatedAt?: Date;

  @Field({nullable: true})
  createdBy?: string;

  @Field({nullable: true})
  updatedBy?: string;
}