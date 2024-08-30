import {User} from "../models/user.js"
import bcrypt from "bcrypt" 
import {SendCookies} from "../Utility/cookieProvider.js"
import cookieParser from "cookie-parser";
import ErrorHandler from "../middlewares/error.js";



export const login  = async (req,res,next)=>{
   try {
    const { email , password } = req.body ; 
    const existingUser = await User.findOne({email}).select("+password") ;
     
    if(!existingUser){
        return next(new ErrorHandler("User not Find Kindly Register",404)) ; 
       
    }
     
    const isMatch =  await bcrypt.compare(password,existingUser.password) ;
    if(!isMatch){
        return next(new ErrorHandler("Invalid Username or Password",404)) ; 
      
    }

    SendCookies(existingUser,res,`Welcome back , ${existingUser.name}`,201)
   } catch (error) {
    next(error) ; 
   }
    
}

export const register = async (req,res) => { 
    try {
        const {name,email,password} = req.body ; 
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(404).json({
            success: false,
            message: "User Already Exists",
        });
    } 

    const hashedpassword = await bcrypt.hash(password,10)  ;
    const user = await User.create({name,email,password: hashedpassword}) 
 
    SendCookies(user,res,"Registered successfully", 201)
    } catch (error) {
        next(error);
    }

};

export const getMyProfile = (req,res)=> { 
    res.status(200).json({
        success: true , 
        user: req.user
    })
} ;

export const logout =  (req , res) => {
    res.status(200) .cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" :  "none" , 
        secure: process.env.NODE_ENV === "Development" ? false : true ,
    }) .json({
        success: true , 
        message: "logout Sucessfully" , 
        user: req.user
    })


};