import mongoose  from "mongoose";

export const connectDB = ()=>{ mongoose.connect(`${process.env.MONGO_URI}`)
.then(()=>{
    console.log(`Database connected successfully from port ${process.env.PORT}`);
    
})
.catch((e)=>{
    console.log(`Error in connecting database Error is :  ${e}`);
    
})
}