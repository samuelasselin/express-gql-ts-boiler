import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { production } from "./constants";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

// Declaration overwrite to use userId in session
declare module "express-session" {
  interface Session {
    userId: number;
  }
}

const main = async () => {
  // orm config and auto migration running
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  // Setup session token with redis, because redis is fast
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years for dev
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: production, // cookie only work in https so we check based on env
      },
      saveUninitialized: false,
      secret: "qwery",
      resave: false,
    })
  );

  // Setup apollo server with resolvers
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  // Create graphql endpoint on express localhost:4000/graphql
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
  });

  app.listen(4000, () => {
    console.log("Server is listening on port 4000");
  });
};

main().catch((err) => {
  console.log(err);
});
