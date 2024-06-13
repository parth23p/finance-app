import { Hono } from "hono";
import {handle} from "hono/vercel";
import  accounts  from "./accounts";
import  categories  from "./categories";
import transactions from "./transactions";
import summary from "./summary";
import { cors } from 'hono/cors';

export const runtime="edge";


const app=new Hono().basePath("/api");
app.use('*', cors({
    origin: '*', // Replace with your frontend URL
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization']
  }));
// app.onError((err,c)=>{
//     if(err instanceof HTTPException){
//         return err.getResponse();
//     }

//     return c.json({error:"Internal Server Error"},500);
// })
const routes=app
    .route("/accounts",accounts)
    .route("/categories",categories)
    .route("/transactions",transactions)
    .route("/summary",summary)

// app.route("/accounts",accounts);

export const GET=handle(app);
export const POST=handle(app);
export const PATCH=handle(app);
export const DELETE=handle(app);

export type AppType=typeof routes;