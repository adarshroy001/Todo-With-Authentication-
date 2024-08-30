import express from 'express'  ; 
import {  getMyProfile, login, logout, register } from '../controllers/user.js'; 
import { isAuthenticated } from '../middlewares/auth.js';


//creating router 
const router  = express.Router() ; 

//creating routes for user 
//register 
router.post("/new",register) ; 
//login
router.post("/login",login) ;
//logout
router.get("/logout",logout) ;
//profile 
router.get("/me",isAuthenticated,getMyProfile)  ;


export default router  ;