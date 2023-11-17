const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const getChatsRouter = require("./routes/get-chat");
const helmet = require("helmet");

const {
  createTempUser,
  updateChat,
  deleteChatIfNoMessages,
  updateUserData,
} = require("./utils/chat");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://mnik7044:Chatwidget@cluster0.zifg9xi.mongodb.net/?retryWrites=true&w=majority"
);

// Serve static files from the "public" directory
app.use(express.static("public"));

app.use("/get-chats", getChatsRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/templates/index.html");
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/public/templates/host.html");
});

io.engine.use(helmet());

io.on("connection", (socket) => {
  const chat_room_id = socket.id;

  if (String(socket.handshake.headers.referer).split("/").pop() === "admin") {
    console.log("Admin connected");
    socket.join("admin");
  } else {
    console.log(`User connected: ${chat_room_id}`);
    socket.join(chat_room_id);
    createTempUser(chat_room_id);
  }

  socket.on("update-user", async (userDetails) => {
    await updateUserData(userDetails);
  });

  // Handle incoming messages
  socket.on("message", (msg) => {
    // Update Data in mongoose
    updateChat(socket.id, msg);

    socket.to(chat_room_id).emit("message", msg);
    socket.to("admin").emit("admin-message", msg);
  });

  socket.on("admin-message", (msg) => {
    updateChat(msg.userId, msg);
    socket.to(msg.userId).emit("message", msg);
    socket.to("admin").emit("admin-message", msg);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    deleteChatIfNoMessages(chat_room_id);
    socket.leave(chat_room_id);
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
