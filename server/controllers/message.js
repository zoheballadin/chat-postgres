import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/send", isAuthenticated, async (req, res) => {
  try {
    await Message.create({
      text: req.body.text,
      conversation: req.body.conversation,
      sender: req.payload.id,
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:convId", async (req, res) => {
  try {
    let messages = await Message.findAll({
      where: { conversation: req.params.convId },
      include: { model: User, as: "senderDetails" },
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
