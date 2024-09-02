import jwt from "jsonwebtoken";
export const SendCookies = (user,res,message,statusCode=200)=>{
 try{
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

res.status(statusCode)
   .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 60 * 1000, // 15 hours
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
        // domain: process.env.DOMAIN || "yourdomain.com", // Optional: Specify domain if needed
        // path: "/", // Optional: Specify the path if needed
   })
   .json({
        success: true,
        message,
   });
  console.log(token);

  
 }
 catch(e){
  console.log(e);
 }
 
}
