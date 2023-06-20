import { MikroORM } from "@mikro-orm/core";
import { CookbookResolver } from "@resolvers/cookbook.resolver";
import { IngredientResolver } from "@resolvers/ingredient.resolver";
import { RecipeResolver } from "@resolvers/recipe.resolver";
import { SearchResolver } from "@resolvers/search.resolver";
import { UserResolver } from "@resolvers/user.resolver";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, SESSION_SECRET, __prod__ } from "./constants";
import microConfig from "./orm.config";

// registerEnumType(HeaderValue, {
//   name: "HeaderValue",
//   description: "Either it is a header or value (ingredient or instructions)",
// });

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  let RedisStore = connectRedis(session);
  let redis = new Redis();

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
        secure: false,
        // sameSite: "none",
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
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context: ({ req, res }) => ({ em: orm.em.fork(), req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: { credentials: true, origin: process.env.CORS_ORIGIN },
  });

  app.listen(process.env.SERVER_PORT, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
