import express from "express";
import User from "../models/User.js";

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


export default router