import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import UserValidator from "contracts/validators/user.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { Cookbook } from "./cookbook.entity";
import { Recipe } from "./recipe.entity";

@ObjectType()
@Entity({ schema: "users" })
export class User extends Base<User> {
  @Field()
  @Property()
  @Unique()
  public email: string;

  @Property()
  public password: string;

  @Field()
  @Property()
  public fullName: string;

  @Field()
  @Property()
  public avatarId: string;

  @OneToMany(() => Recipe, (recipe: Recipe) => recipe.creator, {
    cascade: [Cascade.ALL],
  })
  public recipes = new Collection<Recipe>(this);

  @OneToMany(() => Cookbook, (cookbook: Cookbook) => cookbook.creator, {
    cascade: [Cascade.ALL],
  })
  public cookbooks = new Collection<Cookbook>(this);

  constructor(body: UserValidator) {
    super(body);
  }
}
