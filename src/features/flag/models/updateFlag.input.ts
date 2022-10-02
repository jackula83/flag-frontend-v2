import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, Length } from "class-validator";

@InputType()
export class UpdateFlagInput {

  @Field()
  @IsNumber()
  id: number;

  @Field()
  @Length(0, 4000)
  description: string;
  
  @Field({defaultValue: false})
  isEnabled: boolean;

  @Field()
  defaultServeValue: boolean;
}