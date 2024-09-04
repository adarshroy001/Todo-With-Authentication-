import jwt from "jsonwebtoken";
export const SendCookies = (user,res,message,statusCode=200)=>{
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15d"
      });


    res.status(statusCode)
    .cookie("token", token, {
            httpOnly: true,
            maxAge: 15*24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
            domain: process.env.FRONTEND_URL, 
    })
    .json({
            success: true,
            message,
    });


}
