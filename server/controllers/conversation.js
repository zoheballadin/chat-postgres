import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import Conversation from "../models/Conversation.js";
import { Op } from "sequelize";
import User from "../models/User.js";

const router = express.Router();

router.post("/add", isAuthenticated, async (req, res) => {
  try {
    let conversation  = await Conversation.create({
      members: [req.payload.id, req.body.receiver],
    });
    return res.status(200).json({ message: "success", id: conversation.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", isAuthenticated, async (req, res) => {
    try {
      let conversations = await Conversation.findAll({
        where: { members: { [Op.contains]: [req.payload.id] } }
      });
      return res.status(200).json(conversations)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

router.get("/:convoId", isAuthenticated, async (req, res) => {
    try {
      let conversations = await Conversation.findOne({
        where: { id: req.params.convoId }
      });
      return res.status(200).json(conversations)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

export default router;
