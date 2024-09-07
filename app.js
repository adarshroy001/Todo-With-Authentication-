import express from "express" 
 import userRouter from "./routes/user.js" ; 
 import TaksRouter from "./routes/task.js" ; 
 import { config } from "dotenv"; 
import cookieParser from "cookie-parser";
import { errorMidddleware } from "./middlewares/error.js";
import cors from "cors" ; 

 export const app = express()  ;
 config({
    path: "./data/config.env" ,
 }) ; 

 //using Middlewares 
 app.use(express.json()) ; 
 app.use(cookieParser()) ; 
 app.use(cors({
   origin:  [process.env.FRONTEND_URL , "http://localhost:5173"  ],
   methods:["GET" , "POST" ,"PUT", "DELETE"],
   credentials: true 
 }))  ;

 //using routes
 app.use("/api/v1/users",userRouter) ; 
 app.use("/api/v1/task",TaksRouter) ; 
 
 //using ErrorMiddleware 
 app.use(errorMidddleware) ; 


 app.get("/",(req,res)=>{
    res.send("Nice Its Working||||")
 })
