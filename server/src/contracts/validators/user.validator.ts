import { IsEmail, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class UserValidator {
  @Field()
  @IsEmail()
  public email: string;

  @Field()
  @IsString()
  public password: string;

  @Field()
  @IsString()
  public fullName: string;

  @Field()
  @IsString()
  public avatarId: string;
}

export default UserValidator;
