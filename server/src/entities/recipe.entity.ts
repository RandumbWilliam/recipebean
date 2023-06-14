import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import RecipeValidator from "contracts/validators/recipe.validator";
import { User } from "entities/user.entity";
import { Field, ObjectType } from "type-graphql";
import { Base } from "utils/entities/base.entity";
import { Cookbook } from "./cookbook.entity";
import { RecipeHeaderIngredient } from "./recipe_header_ingredient.entity";
import { RecipeHeaderInstruction } from "./recipe_header_instruction.entity";
import { RecipeIngredient } from "./recipe_ingredient.entity";
import { RecipeInstruction } from "./recipe_instruction.entity";

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

  @Field(() => [RecipeHeaderIngredient])
  @OneToMany(
    () => RecipeHeaderIngredient,
    (recipeHeaderIngredient) => recipeHeaderIngredient.recipes,
    {
      cascade: [Cascade.ALL],
      orphanRemoval: true,
    }
  )
  public recipeHeaderIngredient = new Collection<RecipeHeaderIngredient>(this);

  @Field(() => [RecipeHeaderInstruction])
  @OneToMany(
    () => RecipeHeaderInstruction,
    (recipeHeaderInstruction) => recipeHeaderInstruction.recipes,
    {
      cascade: [Cascade.ALL],
      orphanRemoval: true,
    }
  )
  public recipeHeaderInstruction = new Collection<RecipeHeaderInstruction>(
    this
  );

  @Field(() => [RecipeIngredient])
  @OneToMany(() => RecipeIngredient, (r: RecipeIngredient) => r.recipes, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  public recipeIngredient = new Collection<RecipeIngredient>(this);

  @Field(() => [RecipeInstruction])
  @OneToMany(() => RecipeInstruction, (r: RecipeInstruction) => r.recipes, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  public recipeInstruction = new Collection<RecipeInstruction>(this);

  @Field(() => [Cookbook])
  @ManyToMany(() => Cookbook, (cookbook: Cookbook) => cookbook.recipes)
  public cookbooks = new Collection<Cookbook>(this);

  @ManyToOne(() => User, { onDelete: "cascade" })
  public creator: User;

  constructor(body: RecipeValidator) {
    super(body);
  }
}
