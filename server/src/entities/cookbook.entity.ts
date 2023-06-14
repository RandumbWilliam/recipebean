import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import CookbookValidator from "contracts/validators/cookbook.validator";
import { User } from "entities/user.entity";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { Recipe } from "./recipe.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class Cookbook extends Base<Cookbook> {
  @Field()
  @Property()
  public cookbookName!: string;

  @Field(() => [Recipe])
  @ManyToMany(() => Recipe)
  public recipes = new Collection<Recipe>(this);

  @ManyToOne(() => User, { onDelete: "cascade" })
  public creator: User;

  constructor(body: CookbookValidator) {
    super(body);
  }
}
