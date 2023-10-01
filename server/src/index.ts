import { MikroORM } from "@mikro-orm/core";
import { CookbookResolver } from "@resolvers/cookbook.resolver";
import { IngredientResolver } from "@resolvers/ingredient.resolver";
import { RecipeResolver } from "@resolvers/recipe.resolver";
import { SearchResolver } from "@resolvers/search.resolver";
import { UserResolver } from "@resolvers/user.resolver";
import { MyContext } from "@utils/interfaces/context.interface";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import { request } from "graphql-request";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, REDIS_URL, SESSION_SECRET, __prod__ } from "./constants";
import microConfig from "./orm.config";

// registerEnumType(HeaderValue, {
//   name: "HeaderValue",
//   description: "Either it is a header or value (ingredient or instructions)",
// });
// let redis = new Redis(process.env.REDIS_URL);

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  let RedisStore = connectRedis(session);
  let redis = new Redis(REDIS_URL);

  app.set("trust proxy", true);

  app.use(
    express.json({
      limit: "50mb",
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      },
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        RecipeResolver,
        UserResolver,
        CookbookResolver,
        IngredientResolver,
        SearchResolver,
      ],
      validate: false,
    }),
    introspection: process.env.NODE_ENV !== "production",
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context: ({ req, res }) => ({ em: orm.em.fork(), req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: { credentials: true, origin: process.env.CORS_ORIGIN },
  });

  app.get(
    "/googleOAuthUser",
    async (req: MyContext["req"], res: MyContext["res"]) => {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const { code } = req.query;
      const { googleOAuthUser } = await request<{ googleOAuthUser: string }>(
        `${baseUrl}/graphql`,
        `mutation Mutation($code: String!) {
        googleOAuthUser(code: $code)
      }`,
        { code: code }
      );
      req.session!.userId = googleOAuthUser;

      // res.json({ redirectUrl: `${process.env.CORS_ORIGIN}/cookbooks` });
      res.redirect(303, `${process.env.CORS_ORIGIN}/cookbooks`);
      // res.end();
    }
  );

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Server started`);
  });
};

main().catch((err) => {
  console.error(err);
});
