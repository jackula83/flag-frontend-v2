import { Field, InputType } from "@nestjs/graphql";
import { Length } from "class-validator";

@InputType()
export class FlagHeaderInput {

  @Field()
  @Length(4, 512)
  name: string;

  @Field()
  @Length(0, 4000)
  description: string;
}