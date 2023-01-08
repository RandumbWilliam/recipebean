import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import RecipeValidator from "contracts/validators/recipe.validator";
import { User } from "entities/user.entity";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { RecipeIngredient } from "./recipe_ingredient.entity";
import { CookbookSection } from "./cookbook_section.entity";
import { RecipeHeader } from "./recipe_header.entity";
import { Cookbook } from "./cookbook.entity";

@ObjectType()
@Entity({ schema: "recipes" })
export class Recipe extends Base<Recipe> {
  @Field()
  @Property()
  public recipeName!: string;

  @Field()
  @Property()
  public servings: number;

  @Field()
  @Property()
  public prepTime: number;

  @Field()
  @Property()
  public cookTime: number;

  @Field(() => [RecipeIngredient])
  @OneToMany(() => RecipeIngredient, (r: RecipeIngredient) => r.recipes, {
    cascade: [Cascade.ALL],
  })
  public recipeIngredient = new Collection<RecipeIngredient>(this);

  @Field(() => [RecipeHeader])
  @OneToMany(() => RecipeHeader, (recipeHeader) => recipeHeader.recipes, {
    cascade: [Cascade.ALL],
  })
  public recipeHeader = new Collection<RecipeHeader>(this);

  @ManyToOne(() => CookbookSection, { onDelete: "cascade" })
  public section: CookbookSection;

  @ManyToOne(() => Cookbook, { onDelete: "cascade" })
  public cookbook: Cookbook;

  @ManyToOne(() => User, { onDelete: "cascade" })
  public creator: User;

  constructor(body: RecipeValidator) {
    super(body);
  }
}
