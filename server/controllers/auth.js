import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", async(req,res)=>{
    try {
        let user = await User.findOne({where: {email: req.body.email}});
        if(!user){
            return res.status(401).json({error: "Wrong username or password", loggedIn: false})
        }
        let match = bcrypt.compare(req.body.password, user.password)
        if(!match){
            return res.status(401).json({error: "Wrong username or password", loggedIn: false})
        }
        let token = generateToken({id: user.id, role: user.role})
        return res.status(200).json({token, role: user.role, message: "Logged in successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }
})

router.get("/", isAuthenticated, async(req,res)=>{
    try {
        return res.status(200).json(req.payload)
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: "Unauthorized"})
    }
})
router.post("/register", async(req,res)=>{
    try {
        let findUser = await User.findOne({where: {email: req.body.email}})
        if(findUser){
            return res.status(409).json({message: "User already exists"})
        }
        req.body.password = await bcrypt.hash(req.body.password, 12)
        await User.create(req.body)
        return res.status(200).json({message: "User registered successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }
})

export default router