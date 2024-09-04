import {User} from "../models/user.js"
import bcrypt from "bcrypt" 
import {SendCookies} from "../Utility/cookieProvider.js"
import ErrorHandler from "../middlewares/error.js";



export const login  = async (req,res,next)=>{
   try {
    const { email , password } = req.body ; 
    const user = await User.findOne({email}).select("+password") ;
     
    if(!user){
        return next(new ErrorHandler("User not Find Kindly Register",404)) ; 
       
    }
     
    const isMatch =  await bcrypt.compare(password,user.password) ;
    if(!isMatch){
        return next(new ErrorHandler("Invalid Username or Password",400)) ; 
      
    }

    SendCookies(user,res,`Welcome back , ${user.name}`,200)
   } catch (error) {
    next(error) ; 
   }
    
}

export const register = async (req,res) => { 
    try {
        const {name,email,password} = req.body ; 
    
    let user = await User.findOne({ email });

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User Already Exists",
        });
    } 

    const hashedpassword = await bcrypt.hash(password,10)  ;
     user = await User.create({name,email,password: hashedpassword}) 
 
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

export const logout = (req, res) => {
    res.status(204).cookie("token", "", {
        expires: new Date(Date.now()), // Immediately expire the cookie
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
        httpOnly: true, // Add this to enhance security
    }).json({
        success: true,
        message: "Logout successfully",
    });
};
