import UserValidator from "contracts/validators/user.validator";
import { User } from "entities/user.entity";
import {
  Arg,
  Ctx,
  Query,
  Mutation,
  Resolver,
  ObjectType,
  Field,
} from "type-graphql";
import { MyContext } from "utils/interfaces/context.interface";
import argon2 from "argon2";
import { v4 } from "uuid";
import { sendEmail } from "utils/sendEmails";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { RequiredEntityData } from "@mikro-orm/core";
import { validateRegister } from "utils/validateRegister";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserError {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User | null;
}

@Resolver(() => User)
export class UserResolver {
  // My User
  @Query(() => User, { nullable: true })
  async myUser(@Ctx() { em, req }: MyContext): Promise<User | null> {
    const userRepository = em.getRepository(User);

    if (!req.session.userId) {
      return null;
    }

    const user = await userRepository.findOne({ id: req.session.userId });
    return user;
  }

  // Register
  @Mutation(() => UserError)
  public async register(
    @Arg("input") input: UserValidator,
    @Ctx() { em, req }: MyContext
  ): Promise<UserError> {
    const errors = validateRegister(input);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(input.password);

    const user = em.create(User, {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);

    req.session!.userId = user.id;

    return { user };
  }

  // Login
  @Mutation(() => UserError)
  public async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserError> {
    let errors = [];

    const userRepository = em.getRepository(User);

    const user = await userRepository.findOne({ email: email });
    if (!user) {
      errors.push({
        field: "email",
        message: "User does not exist",
      });
      return { errors };
      // console.log("User does not exist");
      // throw new Error("User does not exist");
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      errors.push({
        field: "password",
        message: "Invalid password",
      });
      return { errors };
      // console.log("Wrong Password");
      // throw new Error("Incorrect password");
    }

    req.session!.userId = user.id;

    return { user };
  }

  // Logout
  @Mutation(() => Boolean)
  public async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }

  // Forgot Password
  @Mutation(() => Boolean)
  public async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { em, redis }: MyContext
  ): Promise<boolean> {
    const userRepository = em.getRepository(User);

    const user = await userRepository.findOne({ email: email });
    if (!user) {
      return true;
    }

    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "EX",
      1000 * 60 * 60 * 24 * 3
    );

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    );
    return true;
  }

  // Change Password
  @Mutation(() => User)
  public async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { em, req, redis }: MyContext
  ): Promise<User> {
    const userRepository = em.getRepository(User);

    const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);
    if (!userId) {
      throw new Error("Token expired");
    }

    const user = await userRepository.findOne({ id: userId });
    if (!user) {
      throw new Error("User no longer exists");
    }

    user.password = await argon2.hash(newPassword);
    await userRepository.persistAndFlush(user);

    await redis.del(FORGET_PASSWORD_PREFIX + token);

    req.session.userId = user.id;

    return user;
  }
}
