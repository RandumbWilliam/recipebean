// import express from 'express';
// import 'express-async-errors';

// import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { GraphQLSchema } from 'graphql';
// import ormConfig from 'orm.config';
// import { buildSchema } from 'type-graphql';
// import { RecipeResolver } from 'resolvers/recipe.resolver';
// import { UserResolver } from 'resolvers/user.resolver';
// import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
// import { ApolloServer } from "apollo-server-express";
// import session from "express-session";
// import { COOKIE_NAME, __prod__ } from "./constants";
// import Redis from "ioredis";
// import connectRedis from "connect-redis";

// export default class Application {
//   public orm: MikroORM<IDatabaseDriver<Connection>>;
//   public host: express.Application;
//   public server: ApolloServer;

//   public connect = async (): Promise<void> => {
//     try {
//       this.orm = await MikroORM.init(ormConfig);
//       const migrator = this.orm.getMigrator();
//       const migrations = await migrator.getPendingMigrations();
//       if (migrations && migrations.length > 0) {
//         await migrator.up();
//       }
//     } catch (error) {
//       console.error('📌 Could not connect to the database', error);
//       throw Error(error);
//     }
//   };

//   public init = async (): Promise<void> => {
//     this.host = express();

//     let RedisStore = connectRedis(session);
//     let redis = new Redis();

//     this.host.use(
//         session({
//             name: COOKIE_NAME,
//             store: new RedisStore({ client: redis, disableTouch: true }),
//             cookie: {
//               maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
//               httpOnly: true,
//               secure: false,
//               // sameSite: "none",
//             },
//             saveUninitialized: false,
//             secret: "keyboard cat",
//             resave: false,
//           })
//     )

//     this.server = new ApolloServer({
//         schema: await buildSchema({
//           resolvers: [RecipeResolver, UserResolver],
//           validate: false,
//         }),
//         plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
//         context: ({ req, res }) => ({ em: this.orm.em.fork(), req, res, redis }),
//       });

//     await this.server.start()

//     this.server.applyMiddleware({
//         this.host,
//         cors: { credentials: true, origin: "http://localhost:3000" },
//     });

//     this.host.listen(4000, () => {
//     console.log("server started on localhost:4000");
//     });
//   };
// }
