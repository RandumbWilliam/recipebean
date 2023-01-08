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
  sections: Array<CookbookSection>;
  updatedAt: Scalars['DateTime'];
};

export type CookbookSection = {
  __typename?: 'CookbookSection';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  recipes: Array<Recipe>;
  sectionName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CookbookSectionValidator = {
  sectionName: Scalars['String'];
};

export type CookbookValidator = {
  cookbookName: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  ingredient: Scalars['String'];
  recipeIngredients: Array<RecipeIngredient>;
  updatedAt: Scalars['DateTime'];
};

export type IngredientType = {
  type: Scalars['String'];
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  createCookbook: Cookbook;
  createRecipe: Recipe;
  createSection: CookbookSection;
  deleteCookbook: Scalars['Boolean'];
  deleteRecipe: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: User;
  logout: Scalars['Boolean'];
  register: User;
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


export type MutationCreateSectionArgs = {
  cookbookId: Scalars['String'];
  input: CookbookSectionValidator;
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

export type Quantity = {
  __typename?: 'Quantity';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  quantity: Scalars['String'];
  recipeIngredients: Array<RecipeIngredient>;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  getCookbook: Cookbook;
  getCookbooks: Array<Cookbook>;
  getRecipe?: Maybe<Recipe>;
  getRecipes: Array<Recipe>;
  getSection: CookbookSection;
  getSections: Array<CookbookSection>;
  myUser?: Maybe<User>;
};


export type QueryGetCookbookArgs = {
  id: Scalars['String'];
};


export type QueryGetRecipeArgs = {
  id: Scalars['String'];
};


export type QueryGetSectionArgs = {
  id: Scalars['String'];
};


export type QueryGetSectionsArgs = {
  cookbookId: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  cookTime: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  prepTime: Scalars['Float'];
  recipeHeader: Array<RecipeHeader>;
  recipeIngredient: Array<RecipeIngredient>;
  recipeName: Scalars['String'];
  servings: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type RecipeHeader = {
  __typename?: 'RecipeHeader';
  createdAt: Scalars['DateTime'];
  headerName: Scalars['String'];
  id: Scalars['ID'];
  order: Scalars['Float'];
  recipes: Recipe;
  updatedAt: Scalars['DateTime'];
};

export type RecipeIngredient = {
  __typename?: 'RecipeIngredient';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  ingredients: Ingredient;
  order: Scalars['Float'];
  quantities: Quantity;
  recipes: Recipe;
  units: Unit;
  updatedAt: Scalars['DateTime'];
};

export type RecipeValidator = {
  cookTime: Scalars['Float'];
  ingredients: Array<IngredientType>;
  prepTime: Scalars['Float'];
  recipeName: Scalars['String'];
  servings: Scalars['Float'];
};

export type Unit = {
  __typename?: 'Unit';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  recipeIngredients: Array<RecipeIngredient>;
  unit: Scalars['String'];
  updatedAt: Scalars['DateTime'];
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

export type UserValidator = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type UserResonseFragment = { __typename?: 'User', id: string, email: string, firstName: string, lastName: string };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type CreateCookbookMutationVariables = Exact<{
  input: CookbookValidator;
}>;


export type CreateCookbookMutation = { __typename?: 'Mutation', createCookbook: { __typename?: 'Cookbook', id: string, cookbookName: string } };

export type CreateSectionMutationVariables = Exact<{
  cookbookId: Scalars['String'];
  input: CookbookSectionValidator;
}>;


export type CreateSectionMutation = { __typename?: 'Mutation', createSection: { __typename?: 'CookbookSection', sectionName: string, id: string } };

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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: UserValidator;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type UpdateCookbookMutationVariables = Exact<{
  cookbookName: Scalars['String'];
  updateCookbookId: Scalars['String'];
}>;


export type UpdateCookbookMutation = { __typename?: 'Mutation', updateCookbook: { __typename?: 'Cookbook', cookbookName: string, id: string } };

export type GetCookbookQueryVariables = Exact<{
  getCookbookId: Scalars['String'];
}>;


export type GetCookbookQuery = { __typename?: 'Query', getCookbook: { __typename?: 'Cookbook', cookbookName: string, sections: Array<{ __typename?: 'CookbookSection', id: string, sectionName: string }>, recipes: Array<{ __typename?: 'Recipe', id: string }> } };

export type GetCookbooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCookbooksQuery = { __typename?: 'Query', getCookbooks: Array<{ __typename?: 'Cookbook', id: string, cookbookName: string, sections: Array<{ __typename?: 'CookbookSection', id: string }>, recipes: Array<{ __typename?: 'Recipe', id: string }> }> };

export type GetRecipeByIdQueryVariables = Exact<{
  getRecipeId: Scalars['String'];
}>;


export type GetRecipeByIdQuery = { __typename?: 'Query', getRecipe?: { __typename?: 'Recipe', id: string, recipeName: string, servings: number, prepTime: number, cookTime: number, recipeIngredient: Array<{ __typename?: 'RecipeIngredient', order: number, ingredients: { __typename?: 'Ingredient', ingredient: string }, units: { __typename?: 'Unit', unit: string }, quantities: { __typename?: 'Quantity', quantity: string } }>, recipeHeader: Array<{ __typename?: 'RecipeHeader', order: number, headerName: string }> } | null };

export type GetRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipesQuery = { __typename?: 'Query', getRecipes: Array<{ __typename?: 'Recipe', id: string, recipeName: string, servings: number, prepTime: number, cookTime: number, recipeIngredient: Array<{ __typename?: 'RecipeIngredient', order: number, ingredients: { __typename?: 'Ingredient', ingredient: string }, units: { __typename?: 'Unit', unit: string }, quantities: { __typename?: 'Quantity', quantity: string } }>, recipeHeader: Array<{ __typename?: 'RecipeHeader', order: number, headerName: string }> }> };

export type GetSectionQueryVariables = Exact<{
  getSectionId: Scalars['String'];
}>;


export type GetSectionQuery = { __typename?: 'Query', getSection: { __typename?: 'CookbookSection', id: string, sectionName: string, recipes: Array<{ __typename?: 'Recipe', prepTime: number, cookTime: number, recipeName: string, id: string }> } };

export type MyUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUserQuery = { __typename?: 'Query', myUser?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } | null };

export const UserResonseFragmentDoc = gql`
    fragment UserResonse on User {
  id
  email
  firstName
  lastName
}
    `;
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
export const CreateSectionDocument = gql`
    mutation CreateSection($cookbookId: String!, $input: CookbookSectionValidator!) {
  createSection(cookbookId: $cookbookId, input: $input) {
    sectionName
    id
  }
}
    `;

export function useCreateSectionMutation() {
  return Urql.useMutation<CreateSectionMutation, CreateSectionMutationVariables>(CreateSectionDocument);
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
    ...UserResonse
  }
}
    ${UserResonseFragmentDoc}`;

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
export const RegisterDocument = gql`
    mutation Register($input: UserValidator!) {
  register(input: $input) {
    ...UserResonse
  }
}
    ${UserResonseFragmentDoc}`;

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
    sections {
      id
      sectionName
    }
    recipes {
      id
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
    sections {
      id
    }
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
      ingredients {
        ingredient
      }
      units {
        unit
      }
      quantities {
        quantity
      }
    }
    recipeHeader {
      order
      headerName
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
      ingredients {
        ingredient
      }
      units {
        unit
      }
      quantities {
        quantity
      }
    }
    recipeHeader {
      order
      headerName
    }
  }
}
    `;

export function useGetRecipesQuery(options?: Omit<Urql.UseQueryArgs<GetRecipesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetRecipesQuery, GetRecipesQueryVariables>({ query: GetRecipesDocument, ...options });
};
export const GetSectionDocument = gql`
    query GetSection($getSectionId: String!) {
  getSection(id: $getSectionId) {
    id
    sectionName
    recipes {
      prepTime
      cookTime
      recipeName
      id
    }
  }
}
    `;

export function useGetSectionQuery(options: Omit<Urql.UseQueryArgs<GetSectionQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSectionQuery, GetSectionQueryVariables>({ query: GetSectionDocument, ...options });
};
export const MyUserDocument = gql`
    query MyUser {
  myUser {
    ...UserResonse
  }
}
    ${UserResonseFragmentDoc}`;

export function useMyUserQuery(options?: Omit<Urql.UseQueryArgs<MyUserQueryVariables>, 'query'>) {
  return Urql.useQuery<MyUserQuery, MyUserQueryVariables>({ query: MyUserDocument, ...options });
};