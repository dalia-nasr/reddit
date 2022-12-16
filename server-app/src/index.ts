import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";  
import { COOKIE_NAME, __prod__ } from "./constants";
// import { Post } from "./entities/post";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';  
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from './resolvers/user';

// import { createClient } from "redis";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from 'connect-redis'
import { MyContext } from './types';
import cors from 'cors';


const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    const app = express();
    // app.set("trust proxy", !process.env.NODE_ENV === "production");
    
    const RedisStore = connectRedis(session)
    // const redisClient = createClient()
    const redis = new Redis()
    // app.set("Access-Control-Allow-Origin", "http://localhost:3000");
    // app.set("Access-Control-Allow-Credentials", true);
    app.set("trust proxy", !__prod__)

    app.use(cors ({
        origin: "http://localhost:3000",
        credentials: true
    }))
   
    app.use(
      session({
        name: COOKIE_NAME,
        store: new RedisStore({ 
            client: redis, 
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            httpOnly: true,
            secure: __prod__, // cookie works in https
            sameSite: 'none', //'lax', //csrf
        },
        saveUninitialized: false,
        secret: "hifeolfhjwejuowplwknjwrugbhbe",
        resave: false,
      })
    )
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({req, res}: MyContext): MyContext => ({ em: orm.em , req, res, redis }),
    });

    // const cors = { credentials: true, origin: 'http://localhost:3000' } //https://studio.apollographql.com
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false })

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
    

}

main().catch((error) => {
    console.error(error)
});