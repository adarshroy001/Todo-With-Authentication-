import { app } from "./app.js";
import { connectDB } from "./data/database.js";


// Connecting Database First 
connectDB() ; 


// After connecting DB listening on server 
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port : ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);   
})

