import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import CookbookSectionValidator from "contracts/validators/cookbook_section.validator";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { Cookbook } from "./cookbook.entity";
import { Recipe } from "./recipe.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class CookbookSection extends Base<CookbookSection> {
  @Field()
  @Property()
  public sectionName: string;

  @ManyToOne(() => Cookbook, { onDelete: "cascade" })
  public cookbook: Cookbook;

  @Field(() => [Recipe])
  @OneToMany(() => Recipe, (recipe: Recipe) => recipe.section, {
    cascade: [Cascade.ALL],
  })
  public recipes = new Collection<Recipe>(this);

  constructor(body: CookbookSectionValidator) {
    super(body);
  }
}
