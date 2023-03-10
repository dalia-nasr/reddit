import { __prod__ } from "./constants";
import { Post } from "./entities/post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

export default {
    migrations :{
        path : path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post, User],
    dbName: 'reddit',
    user: 'postgres',
    password: 'admin',
    type: 'postgresql',
    debug: !__prod__,
    allowGlobalContext: true
} as Parameters<typeof MikroORM.init>[0];