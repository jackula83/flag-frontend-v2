import { Field, ID } from "@nestjs/graphql";

export abstract class AggregateRoot {

  @Field(type => ID)
  id: number;

  @Field()
  uuid: string;

  @Field({defaultValue: false})
  deleteFlag: boolean;

  @Field()
  createdAt: Date;

  @Field({nullable: true})
  updatedAt?: Date;

  @Field({nullable: true})
  createdBy?: string;

  @Field({nullable: true})
  updatedBy?: string;
}