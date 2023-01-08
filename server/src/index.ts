import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import microConfig from "./orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "resolvers/user.resolver";
import { RecipeResolver } from "resolvers/recipe.resolver";
import { CookbookResolver } from "resolvers/cookbook.resolver";
import { CookbookSectionResolver } from "resolvers/cookbook_section.resolver";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  let RedisStore = connectRedis(session);
  let redis = new Redis();

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
      secret: "keyboard cat",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        RecipeResolver,
        UserResolver,
        CookbookResolver,
        CookbookSectionResolver,
      ],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context: ({ req, res }) => ({ em: orm.em.fork(), req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: { credentials: true, origin: "http://localhost:3000" },
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
