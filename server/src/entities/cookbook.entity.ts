import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import CookbookValidator from "contracts/validators/cookbook.validator";
import { User } from "entities/user.entity";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { CookbookSection } from "./cookbook_section.entity";
import { Recipe } from "./recipe.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class Cookbook extends Base<Cookbook> {
  @Field()
  @Property()
  public cookbookName!: string;

  @Field(() => [CookbookSection])
  @OneToMany(
    () => CookbookSection,
    (cookbookSection) => cookbookSection.cookbook
  )
  public sections = new Collection<CookbookSection>(this);

  @Field(() => [Recipe])
  @OneToMany(() => Recipe, (recipe) => recipe.cookbook, {
    cascade: [Cascade.ALL],
  })
  public recipes = new Collection<Recipe>(this);

  @ManyToOne(() => User, { onDelete: "cascade" })
  public creator: User;

  constructor(body: CookbookValidator) {
    super(body);
  }
}
