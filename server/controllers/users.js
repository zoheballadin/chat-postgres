import express from "express";
import User from "../models/User.js";
import { isAuthenticated } from "../middleware/auth.js";

const router  = express.Router();

router.get("/", async(req,res)=>{
    try {
        let users = await User.findAll();
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }
})

router.get("/profile", isAuthenticated, async(req,res)=>{
    try {
        let user = await User.findByPk(req.payload.id);
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }
})

router.get("/:userId", async(req,res)=>{
    try {
        let user  = await User.findByPk(req.params.userId);
        if(!user){
            return res.status(400).json({error: "User not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }
})


export default router