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

export type Cookbook = {
  __typename?: 'Cookbook';
  cookbookName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  recipes: Array<Recipe>;
  updatedAt: Scalars['DateTime'];
};

export type CookbookValidator = {
  cookbookName: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  createCookbook: Cookbook;
  createRecipe: Recipe;
  deleteCookbook: Scalars['Boolean'];
  deleteRecipe: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserError;
  logout: Scalars['Boolean'];
  parseIngredient: ParsedIngredient;
  register: UserError;
  updateCookbook: Cookbook;
  updateRecipe: Recipe;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateCookbookArgs = {
  input: CookbookValidator;
};


export type MutationCreateRecipeArgs = {
  cookbookId: Scalars['String'];
  input: RecipeValidator;
  sectionId: Scalars['String'];
};


export type MutationDeleteCookbookArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['String'];
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


export type MutationUpdateCookbookArgs = {
  cookbookName: Scalars['String'];
  id: Scalars['String'];
};


export type MutationUpdateRecipeArgs = {
  id: Scalars['String'];
  input: RecipeValidator;
};

export type ParsedIngredient = {
  __typename?: 'ParsedIngredient';
  ingredient: Scalars['String'];
  quantity: Scalars['Float'];
  unit: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  ingredient: Scalars['String'];
  order: Scalars['Float'];
  quantity: Scalars['Float'];
  recipes: Recipe;
  unit: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RecipeIngredientValidator = {
  ingredient: Scalars['String'];
  order: Scalars['Float'];
  quantity: Scalars['Float'];
  unit: Scalars['String'];
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
  ingredientHeaders: Array<RecipeHeaderValidator>;
  ingredients: Array<RecipeIngredientValidator>;
  instructionHeaders: Array<RecipeHeaderValidator>;
  instructions: Array<RecipeInstructionValidator>;
  prepTime: Scalars['Float'];
  recipeName: Scalars['String'];
  servings: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserError = {
  __typename?: 'UserError';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserValidator = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type ErrorResponseFragment = { __typename?: 'FieldError', field: string, message: string };

export type RecipeHeaderIngredientResponseFragment = { __typename?: 'RecipeHeaderIngredient', order: number, header: string };

export type RecipeHeaderInstructionResponseFragment = { __typename?: 'RecipeHeaderInstruction', order: number, header: string };

export type RecipeIngredientResponseFragment = { __typename?: 'RecipeIngredient', order: number, ingredient: string, quantity: number, unit: string };

export type RecipeInstructionResponseFragment = { __typename?: 'RecipeInstruction', order: number, step: number, instruction: string };

export type UserErrorResponseFragment = { __typename?: 'UserError', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } | null };

export type UserResponseFragment = { __typename?: 'User', id: string, email: string, firstName: string, lastName: string };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type CreateCookbookMutationVariables = Exact<{
  input: CookbookValidator;
}>;


export type CreateCookbookMutation = { __typename?: 'Mutation', createCookbook: { __typename?: 'Cookbook', id: string, cookbookName: string } };

export type DeleteCookbookMutationVariables = Exact<{
  deleteCookbookId: Scalars['String'];
}>;


export type DeleteCookbookMutation = { __typename?: 'Mutation', deleteCookbook: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserError', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ParseIngredientMutationVariables = Exact<{
  strIngredient: Scalars['String'];
}>;


export type ParseIngredientMutation = { __typename?: 'Mutation', parseIngredient: { __typename?: 'ParsedIngredient', unit: string, ingredient: string, quantity: number } };

export type RegisterMutationVariables = Exact<{
  input: UserValidator;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserError', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } | null } };

export type UpdateCookbookMutationVariables = Exact<{
  cookbookName: Scalars['String'];
  updateCookbookId: Scalars['String'];
}>;


export type UpdateCookbookMutation = { __typename?: 'Mutation', updateCookbook: { __typename?: 'Cookbook', cookbookName: string, id: string } };

export type GetCookbookQueryVariables = Exact<{
  getCookbookId: Scalars['String'];
}>;


export type GetCookbookQuery = { __typename?: 'Query', getCookbook: { __typename?: 'Cookbook', cookbookName: string, recipes: Array<{ __typename?: 'Recipe', id: string, prepTime: number, cookTime: number, recipeName: string }> } };

export type GetCookbooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCookbooksQuery = { __typename?: 'Query', getCookbooks: Array<{ __typename?: 'Cookbook', id: string, cookbookName: string, recipes: Array<{ __typename?: 'Recipe', id: string }> }> };

export type GetRecipeByIdQueryVariables = Exact<{
  getRecipeId: Scalars['String'];
}>;


export type GetRecipeByIdQuery = { __typename?: 'Query', getRecipe?: { __typename?: 'Recipe', id: string, recipeName: string, servings: number, prepTime: number, cookTime: number, recipeIngredient: Array<{ __typename?: 'RecipeIngredient', order: number, ingredient: string, quantity: number, unit: string }>, recipeInstruction: Array<{ __typename?: 'RecipeInstruction', order: number, instruction: string }>, recipeHeaderIngredient: Array<{ __typename?: 'RecipeHeaderIngredient', order: number, header: string }>, recipeHeaderInstruction: Array<{ __typename?: 'RecipeHeaderInstruction', order: number, header: string }> } | null };

export type GetRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipesQuery = { __typename?: 'Query', getRecipes: Array<{ __typename?: 'Recipe', id: string, recipeName: string, servings: number, prepTime: number, cookTime: number, recipeIngredient: Array<{ __typename?: 'RecipeIngredient', order: number, ingredient: string, quantity: number, unit: string }>, recipeInstruction: Array<{ __typename?: 'RecipeInstruction', order: number, instruction: string }>, recipeHeaderIngredient: Array<{ __typename?: 'RecipeHeaderIngredient', order: number, header: string }>, recipeHeaderInstruction: Array<{ __typename?: 'RecipeHeaderInstruction', order: number, header: string }> }> };

export type MyUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUserQuery = { __typename?: 'Query', myUser?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } | null };

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
export const RecipeIngredientResponseFragmentDoc = gql`
    fragment RecipeIngredientResponse on RecipeIngredient {
  order
  ingredient
  quantity
  unit
}
    `;
export const RecipeInstructionResponseFragmentDoc = gql`
    fragment RecipeInstructionResponse on RecipeInstruction {
  order
  step
  instruction
}
    `;
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
  firstName
  lastName
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
    firstName
    lastName
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
  }
}
    `;

export function useCreateCookbookMutation() {
  return Urql.useMutation<CreateCookbookMutation, CreateCookbookMutationVariables>(CreateCookbookDocument);
};
export const DeleteCookbookDocument = gql`
    mutation DeleteCookbook($deleteCookbookId: String!) {
  deleteCookbook(id: $deleteCookbookId)
}
    `;

export function useDeleteCookbookMutation() {
  return Urql.useMutation<DeleteCookbookMutation, DeleteCookbookMutationVariables>(DeleteCookbookDocument);
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
    unit
    ingredient
    quantity
  }
}
    `;

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
export const UpdateCookbookDocument = gql`
    mutation UpdateCookbook($cookbookName: String!, $updateCookbookId: String!) {
  updateCookbook(cookbookName: $cookbookName, id: $updateCookbookId) {
    cookbookName
    id
  }
}
    `;

export function useUpdateCookbookMutation() {
  return Urql.useMutation<UpdateCookbookMutation, UpdateCookbookMutationVariables>(UpdateCookbookDocument);
};
export const GetCookbookDocument = gql`
    query GetCookbook($getCookbookId: String!) {
  getCookbook(id: $getCookbookId) {
    cookbookName
    recipes {
      id
      prepTime
      cookTime
      recipeName
    }
  }
}
    `;

export function useGetCookbookQuery(options: Omit<Urql.UseQueryArgs<GetCookbookQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCookbookQuery, GetCookbookQueryVariables>({ query: GetCookbookDocument, ...options });
};
export const GetCookbooksDocument = gql`
    query GetCookbooks {
  getCookbooks {
    id
    cookbookName
    recipes {
      id
    }
  }
}
    `;

export function useGetCookbooksQuery(options?: Omit<Urql.UseQueryArgs<GetCookbooksQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCookbooksQuery, GetCookbooksQueryVariables>({ query: GetCookbooksDocument, ...options });
};
export const GetRecipeByIdDocument = gql`
    query GetRecipeByID($getRecipeId: String!) {
  getRecipe(id: $getRecipeId) {
    id
    recipeName
    servings
    prepTime
    cookTime
    recipeIngredient {
      order
      ingredient
      quantity
      unit
    }
    recipeInstruction {
      order
      instruction
    }
    recipeHeaderIngredient {
      order
      header
    }
    recipeHeaderInstruction {
      order
      header
    }
  }
}
    `;

export function useGetRecipeByIdQuery(options: Omit<Urql.UseQueryArgs<GetRecipeByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>({ query: GetRecipeByIdDocument, ...options });
};
export const GetRecipesDocument = gql`
    query GetRecipes {
  getRecipes {
    id
    recipeName
    servings
    prepTime
    cookTime
    recipeIngredient {
      order
      ingredient
      quantity
      unit
    }
    recipeInstruction {
      order
      instruction
    }
    recipeHeaderIngredient {
      order
      header
    }
    recipeHeaderInstruction {
      order
      header
    }
  }
}
    `;

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