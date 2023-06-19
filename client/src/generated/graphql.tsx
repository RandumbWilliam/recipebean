import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type BooleanError = {
  __typename?: 'BooleanError';
  boolean?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<FieldError>>;
};

export type Cookbook = {
  __typename?: 'Cookbook';
  cookbookCoverId: Scalars['String'];
  cookbookName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  recipes: Array<Recipe>;
  updatedAt: Scalars['DateTime'];
};

export type CookbookValidator = {
  cookbookCoverId: Scalars['String'];
  cookbookName: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Measurement = {
  __typename?: 'Measurement';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  ingredients: RecipeIngredient;
  isConverted: Scalars['Boolean'];
  isRange: Scalars['Boolean'];
  quantity?: Maybe<Scalars['Float']>;
  quantityRange?: Maybe<Array<Scalars['Float']>>;
  unit?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type MeasurmentValidator = {
  isConverted: Scalars['Boolean'];
  isRange: Scalars['Boolean'];
  quantity?: InputMaybe<Scalars['Float']>;
  quantityRange?: InputMaybe<Array<Scalars['Float']>>;
  unit?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  createCookbook: Cookbook;
  createRecipe: Recipe;
  deleteCookbook: Scalars['Boolean'];
  deleteRecipe: Scalars['Boolean'];
  deleteUser: BooleanError;
  forgotPassword: Scalars['Boolean'];
  login: UserError;
  logout: Scalars['Boolean'];
  parseIngredient: ParsedIngredient;
  register: UserError;
  searchRecipes: Array<Recipe>;
  updateCookbook: Cookbook;
  updatePDP: UserError;
  updatePassword: UserError;
  updateRecipe: Recipe;
  updateUser: UserError;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateCookbookArgs = {
  input: CookbookValidator;
};


export type MutationCreateRecipeArgs = {
  cookbookId: Array<Scalars['String']>;
  input: RecipeValidator;
};


export type MutationDeleteCookbookArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  password: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationParseIngredientArgs = {
  strIngredient: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: UserValidator;
};


export type MutationSearchRecipesArgs = {
  query: Scalars['String'];
};


export type MutationUpdateCookbookArgs = {
  id: Scalars['String'];
  input: CookbookValidator;
};


export type MutationUpdatePdpArgs = {
  avatarId: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationUpdateRecipeArgs = {
  cookbookIds: Array<Scalars['String']>;
  id: Scalars['String'];
  input: RecipeValidator;
};


export type MutationUpdateUserArgs = {
  email: Scalars['String'];
  fullName: Scalars['String'];
};

export type ParsedIngredient = {
  __typename?: 'ParsedIngredient';
  alternativeIngredients?: Maybe<Array<Scalars['String']>>;
  comments?: Maybe<Scalars['String']>;
  hasAddedMeasurements: Scalars['Boolean'];
  hasAlternativeIngredients: Scalars['Boolean'];
  ingredient: Scalars['String'];
  measurements?: Maybe<Array<ParsedMeasurment>>;
};

export type ParsedMeasurment = {
  __typename?: 'ParsedMeasurment';
  isConverted: Scalars['Boolean'];
  isRange: Scalars['Boolean'];
  quantity?: Maybe<Scalars['Float']>;
  quantityRange?: Maybe<Array<Scalars['Float']>>;
  unit?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getCookbook: Cookbook;
  getCookbooks: Array<Cookbook>;
  getRecipe?: Maybe<Recipe>;
  getRecipes: Array<Recipe>;
  myUser?: Maybe<User>;
};


export type QueryGetCookbookArgs = {
  id: Scalars['String'];
};


export type QueryGetRecipeArgs = {
  id: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  cookTime: Scalars['Float'];
  cookbooks: Array<Cookbook>;
  coverImage: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  prepTime: Scalars['Float'];
  recipeHeaderIngredient: Array<RecipeHeaderIngredient>;
  recipeHeaderInstruction: Array<RecipeHeaderInstruction>;
  recipeIngredient: Array<RecipeIngredient>;
  recipeInstruction: Array<RecipeInstruction>;
  recipeName: Scalars['String'];
  servings: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type RecipeHeaderIngredient = {
  __typename?: 'RecipeHeaderIngredient';
  createdAt: Scalars['DateTime'];
  header: Scalars['String'];
  id: Scalars['ID'];
  order: Scalars['Float'];
  recipes: Recipe;
  updatedAt: Scalars['DateTime'];
};

export type RecipeHeaderInstruction = {
  __typename?: 'RecipeHeaderInstruction';
  createdAt: Scalars['DateTime'];
  header: Scalars['String'];
  id: Scalars['ID'];
  order: Scalars['Float'];
  recipes: Recipe;
  updatedAt: Scalars['DateTime'];
};

export type RecipeHeaderValidator = {
  header: Scalars['String'];
  order: Scalars['Float'];
};

export type RecipeIngredient = {
  __typename?: 'RecipeIngredient';
  alternativeIngredients?: Maybe<Array<Scalars['String']>>;
  comments?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  hasAddedMeasurements: Scalars['Boolean'];
  hasAlternativeIngredients: Scalars['Boolean'];
  id: Scalars['ID'];
  ingredient: Scalars['String'];
  measurements?: Maybe<Array<Measurement>>;
  order: Scalars['Float'];
  recipes: Recipe;
  updatedAt: Scalars['DateTime'];
};

export type RecipeIngredientValidator = {
  alternativeIngredients?: InputMaybe<Array<Scalars['String']>>;
  comments?: InputMaybe<Scalars['String']>;
  hasAddedMeasurements: Scalars['Boolean'];
  hasAlternativeIngredients: Scalars['Boolean'];
  ingredient: Scalars['String'];
  measurements?: InputMaybe<Array<MeasurmentValidator>>;
  order: Scalars['Float'];
};

export type RecipeInstruction = {
  __typename?: 'RecipeInstruction';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  instruction: Scalars['String'];
  order: Scalars['Float'];
  recipes: Recipe;
  step: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type RecipeInstructionValidator = {
  instruction: Scalars['String'];
  order: Scalars['Float'];
  step: Scalars['Float'];
};

export type RecipeValidator = {
  cookTime: Scalars['Float'];
  coverImage: Scalars['String'];
  ingredientHeaders: Array<RecipeHeaderValidator>;
  ingredientValues: Array<RecipeIngredientValidator>;
  instructionHeaders: Array<RecipeHeaderValidator>;
  instructionValues: Array<RecipeInstructionValidator>;
  prepTime: Scalars['Float'];
  recipeName: Scalars['String'];
  servings: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  avatarId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type UserError = {
  __typename?: 'UserError';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserValidator = {
  avatarId: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
};

export type CookbookResponseFragment = { __typename?: 'Cookbook', id: string, cookbookName: string, cookbookCoverId: string, recipes: Array<{ __typename?: 'Recipe', id: string, recipeName: string, prepTime: number, cookTime: number, coverImage: string }> };

export type ErrorResponseFragment = { __typename?: 'FieldError', field: string, message: string };

export type MeasurementResponseFragment = { __typename?: 'Measurement', quantity?: number | null, quantityRange?: Array<number> | null, isRange: boolean, unit?: string | null, isConverted: boolean };

export type ParsedIngredientResponseFragment = { __typename?: 'ParsedIngredient', ingredient: string, alternativeIngredients?: Array<string> | null, hasAlternativeIngredients: boolean, hasAddedMeasurements: boolean, comments?: string | null, measurements?: Array<{ __typename?: 'ParsedMeasurment', quantity?: number | null, quantityRange?: Array<number> | null, isRange: boolean, unit?: string | null, isConverted: boolean }> | null };

export type RecipeCardResponseFragment = { __typename?: 'Recipe', id: string, recipeName: string, prepTime: number, cookTime: number, coverImage: string };

export type RecipeHeaderIngredientResponseFragment = { __typename?: 'RecipeHeaderIngredient', order: number, header: string };

export type RecipeHeaderInstructionResponseFragment = { __typename?: 'RecipeHeaderInstruction', order: number, header: string };

export type RecipeIngredientResponseFragment = { __typename?: 'RecipeIngredient', order: number, ingredient: string, alternativeIngredients?: Array<string> | null, hasAlternativeIngredients: boolean, hasAddedMeasurements: boolean, comments?: string | null, measurements?: Array<{ __typename?: 'Measurement', quantity?: number | null, quantityRange?: Array<number> | null, isRange: boolean, unit?: string | null, isConverted: boolean }> | null };

export type RecipeInstructionResponseFragment = { __typename?: 'RecipeInstruction', order: number, step: number, instruction: string };

export type RecipeResponseFragment = { __typename?: 'Recipe', id: string, recipeName: string, prepTime: number, cookTime: number, servings: number, coverImage: string, recipeIngredient: Array<{ __typename?: 'RecipeIngredient', order: number, ingredient: string, alternativeIngredients?: Array<string> | null, hasAlternativeIngredients: boolean, hasAddedMeasurements: boolean, comments?: string | null, measurements?: Array<{ __typename?: 'Measurement', quantity?: number | null, quantityRange?: Array<number> | null, isRange: boolean, unit?: string | null, isConverted: boolean }> | null }>, recipeInstruction: Array<{ __typename?: 'RecipeInstruction', order: number, step: number, instruction: string }>, recipeHeaderIngredient: Array<{ __typename?: 'RecipeHeaderIngredient', order: number, header: string }>, recipeHeaderInstruction: Array<{ __typename?: 'RecipeHeaderInstruction', order: number, header: string }>, cookbooks: Array<{ __typename?: 'Cookbook', id: string }> };

export type UserErrorResponseFragment = { __typename?: 'UserError', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: string } | null };

export type UserResponseFragment = { __typename?: 'User', id: string, email: string, fullName: string, avatarId: string };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'User', id: string, email: string, fullName: string } };

export type CreateCookbookMutationVariables = Exact<{
  input: CookbookValidator;
}>;


export type CreateCookbookMutation = { __typename?: 'Mutation', createCookbook: { __typename?: 'Cookbook', id: string, cookbookName: string, cookbookCoverId: string } };

export type CreateRecipeMutationVariables = Exact<{
  cookbookId: Array<Scalars['String']> | Scalars['String'];
  input: RecipeValidator;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipe', id: string } };

export type DeleteCookbookMutationVariables = Exact<{
  deleteCookbookId: Scalars['String'];
}>;


export type DeleteCookbookMutation = { __typename?: 'Mutation', deleteCookbook: boolean };

export type DeleteRecipeMutationVariables = Exact<{
  deleteRecipeId: Scalars['String'];
}>;


export type DeleteRecipeMutation = { __typename?: 'Mutation', deleteRecipe: boolean };

export type DeleteUserMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'BooleanError', boolean?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserError', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ParseIngredientMutationVariables = Exact<{
  strIngredient: Scalars['String'];
}>;


export type ParseIngredientMutation = { __typename?: 'Mutation', parseIngredient: { __typename?: 'ParsedIngredient', ingredient: string, alternativeIngredients?: Array<string> | null, hasAlternativeIngredients: boolean, hasAddedMeasurements: boolean, comments?: string | null, measurements?: Array<{ __typename?: 'ParsedMeasurment', quantity?: number | null, quantityRange?: Array<number> | null, isRange: boolean, unit?: string | null, isConverted: boolean }> | null } };

export type RegisterMutationVariables = Exact<{
  input: UserValidator;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserError', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: string } | null } };

export type SearchRecipesMutationVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchRecipesMutation = { __typename?: 'Mutation', searchRecipes: Array<{ __typename?: 'Recipe', id: string, recipeName: string, prepTime: number, cookTime: number, coverImage: string }> };

export type UpdateCookbookMutationVariables = Exact<{
  input: CookbookValidator;
  updateCookbookId: Scalars['String'];
}>;


export type UpdateCookbookMutation = { __typename?: 'Mutation', updateCookbook: { __typename?: 'Cookbook', cookbookName: string, id: string, cookbookCoverId: string } };

export type UpdatePdpMutationVariables = Exact<{
  avatarId: Scalars['String'];
}>;


export type UpdatePdpMutation = { __typename?: 'Mutation', updatePDP: { __typename?: 'UserError', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: string } | null } };

export type UpdatePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'UserError', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: string } | null } };

export type UpdateRecipeMutationVariables = Exact<{
  id: Scalars['String'];
  input: RecipeValidator;
  cookbookIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateRecipeMutation = { __typename?: 'Mutation', updateRecipe: { __typename?: 'Recipe', id: string } };

export type UpdateUserMutationVariables = Exact<{
  fullName: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserError', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: string } | null } };

export type GetCookbookQueryVariables = Exact<{
  getCookbookId: Scalars['String'];
}>;


export type GetCookbookQuery = { __typename?: 'Query', getCookbook: { __typename?: 'Cookbook', id: string, cookbookName: string, cookbookCoverId: string, recipes: Array<{ __typename?: 'Recipe', id: string, recipeName: string, prepTime: number, cookTime: number, coverImage: string }> } };

export type GetCookbooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCookbooksQuery = { __typename?: 'Query', getCookbooks: Array<{ __typename?: 'Cookbook', id: string, cookbookName: string, cookbookCoverId: string, recipes: Array<{ __typename?: 'Recipe', id: string, recipeName: string, prepTime: number, cookTime: number, coverImage: string }> }> };

export type GetRecipeByIdQueryVariables = Exact<{
  getRecipeId: Scalars['String'];
}>;


export type GetRecipeByIdQuery = { __typename?: 'Query', getRecipe?: { __typename?: 'Recipe', id: string, recipeName: string, prepTime: number, cookTime: number, servings: number, coverImage: string, recipeIngredient: Array<{ __typename?: 'RecipeIngredient', order: number, ingredient: string, alternativeIngredients?: Array<string> | null, hasAlternativeIngredients: boolean, hasAddedMeasurements: boolean, comments?: string | null, measurements?: Array<{ __typename?: 'Measurement', quantity?: number | null, quantityRange?: Array<number> | null, isRange: boolean, unit?: string | null, isConverted: boolean }> | null }>, recipeInstruction: Array<{ __typename?: 'RecipeInstruction', order: number, step: number, instruction: string }>, recipeHeaderIngredient: Array<{ __typename?: 'RecipeHeaderIngredient', order: number, header: string }>, recipeHeaderInstruction: Array<{ __typename?: 'RecipeHeaderInstruction', order: number, header: string }>, cookbooks: Array<{ __typename?: 'Cookbook', id: string }> } | null };

export type GetRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipesQuery = { __typename?: 'Query', getRecipes: Array<{ __typename?: 'Recipe', id: string, recipeName: string, prepTime: number, cookTime: number, servings: number, coverImage: string, recipeIngredient: Array<{ __typename?: 'RecipeIngredient', order: number, ingredient: string, alternativeIngredients?: Array<string> | null, hasAlternativeIngredients: boolean, hasAddedMeasurements: boolean, comments?: string | null, measurements?: Array<{ __typename?: 'Measurement', quantity?: number | null, quantityRange?: Array<number> | null, isRange: boolean, unit?: string | null, isConverted: boolean }> | null }>, recipeInstruction: Array<{ __typename?: 'RecipeInstruction', order: number, step: number, instruction: string }>, recipeHeaderIngredient: Array<{ __typename?: 'RecipeHeaderIngredient', order: number, header: string }>, recipeHeaderInstruction: Array<{ __typename?: 'RecipeHeaderInstruction', order: number, header: string }>, cookbooks: Array<{ __typename?: 'Cookbook', id: string }> }> };

export type MyUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUserQuery = { __typename?: 'Query', myUser?: { __typename?: 'User', id: string, email: string, fullName: string, avatarId: string } | null };

export const CookbookResponseFragmentDoc = gql`
    fragment CookbookResponse on Cookbook {
  id
  cookbookName
  cookbookCoverId
  recipes {
    id
    recipeName
    prepTime
    cookTime
    coverImage
  }
}
    `;
export const ParsedIngredientResponseFragmentDoc = gql`
    fragment ParsedIngredientResponse on ParsedIngredient {
  ingredient
  alternativeIngredients
  hasAlternativeIngredients
  hasAddedMeasurements
  comments
  measurements {
    quantity
    quantityRange
    isRange
    unit
    isConverted
  }
}
    `;
export const RecipeCardResponseFragmentDoc = gql`
    fragment RecipeCardResponse on Recipe {
  id
  recipeName
  prepTime
  cookTime
  coverImage
}
    `;
export const MeasurementResponseFragmentDoc = gql`
    fragment MeasurementResponse on Measurement {
  quantity
  quantityRange
  isRange
  unit
  isConverted
}
    `;
export const RecipeIngredientResponseFragmentDoc = gql`
    fragment RecipeIngredientResponse on RecipeIngredient {
  order
  ingredient
  alternativeIngredients
  hasAlternativeIngredients
  hasAddedMeasurements
  comments
  measurements {
    ...MeasurementResponse
  }
}
    ${MeasurementResponseFragmentDoc}`;
export const RecipeInstructionResponseFragmentDoc = gql`
    fragment RecipeInstructionResponse on RecipeInstruction {
  order
  step
  instruction
}
    `;
export const RecipeHeaderIngredientResponseFragmentDoc = gql`
    fragment RecipeHeaderIngredientResponse on RecipeHeaderIngredient {
  order
  header
}
    `;
export const RecipeHeaderInstructionResponseFragmentDoc = gql`
    fragment RecipeHeaderInstructionResponse on RecipeHeaderInstruction {
  order
  header
}
    `;
export const RecipeResponseFragmentDoc = gql`
    fragment RecipeResponse on Recipe {
  id
  recipeName
  prepTime
  cookTime
  servings
  coverImage
  recipeIngredient {
    ...RecipeIngredientResponse
  }
  recipeInstruction {
    ...RecipeInstructionResponse
  }
  recipeHeaderIngredient {
    ...RecipeHeaderIngredientResponse
  }
  recipeHeaderInstruction {
    ...RecipeHeaderInstructionResponse
  }
  cookbooks {
    id
  }
}
    ${RecipeIngredientResponseFragmentDoc}
${RecipeInstructionResponseFragmentDoc}
${RecipeHeaderIngredientResponseFragmentDoc}
${RecipeHeaderInstructionResponseFragmentDoc}`;
export const ErrorResponseFragmentDoc = gql`
    fragment ErrorResponse on FieldError {
  field
  message
}
    `;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on User {
  id
  email
  fullName
  avatarId
}
    `;
export const UserErrorResponseFragmentDoc = gql`
    fragment UserErrorResponse on UserError {
  errors {
    ...ErrorResponse
  }
  user {
    ...UserResponse
  }
}
    ${ErrorResponseFragmentDoc}
${UserResponseFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    id
    email
    fullName
  }
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateCookbookDocument = gql`
    mutation CreateCookbook($input: CookbookValidator!) {
  createCookbook(input: $input) {
    id
    cookbookName
    cookbookCoverId
  }
}
    `;

export function useCreateCookbookMutation() {
  return Urql.useMutation<CreateCookbookMutation, CreateCookbookMutationVariables>(CreateCookbookDocument);
};
export const CreateRecipeDocument = gql`
    mutation CreateRecipe($cookbookId: [String!]!, $input: RecipeValidator!) {
  createRecipe(cookbookId: $cookbookId, input: $input) {
    id
  }
}
    `;

export function useCreateRecipeMutation() {
  return Urql.useMutation<CreateRecipeMutation, CreateRecipeMutationVariables>(CreateRecipeDocument);
};
export const DeleteCookbookDocument = gql`
    mutation DeleteCookbook($deleteCookbookId: String!) {
  deleteCookbook(id: $deleteCookbookId)
}
    `;

export function useDeleteCookbookMutation() {
  return Urql.useMutation<DeleteCookbookMutation, DeleteCookbookMutationVariables>(DeleteCookbookDocument);
};
export const DeleteRecipeDocument = gql`
    mutation DeleteRecipe($deleteRecipeId: String!) {
  deleteRecipe(id: $deleteRecipeId)
}
    `;

export function useDeleteRecipeMutation() {
  return Urql.useMutation<DeleteRecipeMutation, DeleteRecipeMutationVariables>(DeleteRecipeDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser($password: String!) {
  deleteUser(password: $password) {
    errors {
      ...ErrorResponse
    }
    boolean
  }
}
    ${ErrorResponseFragmentDoc}`;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    ...UserErrorResponse
  }
}
    ${UserErrorResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ParseIngredientDocument = gql`
    mutation ParseIngredient($strIngredient: String!) {
  parseIngredient(strIngredient: $strIngredient) {
    ...ParsedIngredientResponse
  }
}
    ${ParsedIngredientResponseFragmentDoc}`;

export function useParseIngredientMutation() {
  return Urql.useMutation<ParseIngredientMutation, ParseIngredientMutationVariables>(ParseIngredientDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: UserValidator!) {
  register(input: $input) {
    ...UserErrorResponse
  }
}
    ${UserErrorResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SearchRecipesDocument = gql`
    mutation SearchRecipes($query: String!) {
  searchRecipes(query: $query) {
    ...RecipeCardResponse
  }
}
    ${RecipeCardResponseFragmentDoc}`;

export function useSearchRecipesMutation() {
  return Urql.useMutation<SearchRecipesMutation, SearchRecipesMutationVariables>(SearchRecipesDocument);
};
export const UpdateCookbookDocument = gql`
    mutation UpdateCookbook($input: CookbookValidator!, $updateCookbookId: String!) {
  updateCookbook(input: $input, id: $updateCookbookId) {
    cookbookName
    id
    cookbookCoverId
  }
}
    `;

export function useUpdateCookbookMutation() {
  return Urql.useMutation<UpdateCookbookMutation, UpdateCookbookMutationVariables>(UpdateCookbookDocument);
};
export const UpdatePdpDocument = gql`
    mutation UpdatePDP($avatarId: String!) {
  updatePDP(avatarId: $avatarId) {
    ...UserErrorResponse
  }
}
    ${UserErrorResponseFragmentDoc}`;

export function useUpdatePdpMutation() {
  return Urql.useMutation<UpdatePdpMutation, UpdatePdpMutationVariables>(UpdatePdpDocument);
};
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($oldPassword: String!, $newPassword: String!, $confirmPassword: String!) {
  updatePassword(
    oldPassword: $oldPassword
    newPassword: $newPassword
    confirmPassword: $confirmPassword
  ) {
    ...UserErrorResponse
  }
}
    ${UserErrorResponseFragmentDoc}`;

export function useUpdatePasswordMutation() {
  return Urql.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument);
};
export const UpdateRecipeDocument = gql`
    mutation UpdateRecipe($id: String!, $input: RecipeValidator!, $cookbookIds: [String!]!) {
  updateRecipe(id: $id, input: $input, cookbookIds: $cookbookIds) {
    id
  }
}
    `;

export function useUpdateRecipeMutation() {
  return Urql.useMutation<UpdateRecipeMutation, UpdateRecipeMutationVariables>(UpdateRecipeDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($fullName: String!, $email: String!) {
  updateUser(fullName: $fullName, email: $email) {
    ...UserErrorResponse
  }
}
    ${UserErrorResponseFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const GetCookbookDocument = gql`
    query GetCookbook($getCookbookId: String!) {
  getCookbook(id: $getCookbookId) {
    ...CookbookResponse
  }
}
    ${CookbookResponseFragmentDoc}`;

export function useGetCookbookQuery(options: Omit<Urql.UseQueryArgs<GetCookbookQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCookbookQuery, GetCookbookQueryVariables>({ query: GetCookbookDocument, ...options });
};
export const GetCookbooksDocument = gql`
    query GetCookbooks {
  getCookbooks {
    ...CookbookResponse
  }
}
    ${CookbookResponseFragmentDoc}`;

export function useGetCookbooksQuery(options?: Omit<Urql.UseQueryArgs<GetCookbooksQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCookbooksQuery, GetCookbooksQueryVariables>({ query: GetCookbooksDocument, ...options });
};
export const GetRecipeByIdDocument = gql`
    query GetRecipeByID($getRecipeId: String!) {
  getRecipe(id: $getRecipeId) {
    ...RecipeResponse
  }
}
    ${RecipeResponseFragmentDoc}`;

export function useGetRecipeByIdQuery(options: Omit<Urql.UseQueryArgs<GetRecipeByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>({ query: GetRecipeByIdDocument, ...options });
};
export const GetRecipesDocument = gql`
    query GetRecipes {
  getRecipes {
    ...RecipeResponse
  }
}
    ${RecipeResponseFragmentDoc}`;

export function useGetRecipesQuery(options?: Omit<Urql.UseQueryArgs<GetRecipesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetRecipesQuery, GetRecipesQueryVariables>({ query: GetRecipesDocument, ...options });
};
export const MyUserDocument = gql`
    query MyUser {
  myUser {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;

export function useMyUserQuery(options?: Omit<Urql.UseQueryArgs<MyUserQueryVariables>, 'query'>) {
  return Urql.useQuery<MyUserQuery, MyUserQueryVariables>({ query: MyUserDocument, ...options });
};