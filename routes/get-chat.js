const express = require("express");
const chatModel = require("../models/chat");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await chatModel.find();
    res.json(data);
  } catch (e) {
    res.json({ error: String(e) });
  }
});

module.exports = router;
