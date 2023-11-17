const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const messageSchema = new Schema({
  messageString: String,
  userId: String,
  name: String,
  timestamp: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
    required: true,
  },
});

const chatSchema = new Schema({
  sender: String,
  messages: [messageSchema],
  timestamp: { type: Date, default: Date.now },
  name: {
    default: "",
    type: String,
    required: false,
  },
  email: {
    default: "",
    type: String,
    required: false,
  },
  phone: {
    default: "",
    type: String,
    required: false,
  },
});

const ChatModel = model("chat", chatSchema);

module.exports = ChatModel;