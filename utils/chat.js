const chat = require("../models/chat");

const updateChat = async (senderId, msg) => {
  try {
    const userChat = await chat.findOne({ sender: String(senderId) });

    if (!userChat) {
      return;
    }

    userChat.messages.push(msg);

    return await userChat.updateOne({ messages: userChat.messages });
  } catch (e) {
    console.log(e);
    return null;
  }
};

const createTempUser = async (userId) => {
  const newChat = new chat({
    sender: userId,
    messages: [],
  });
  newChat.save();
};

async function deleteChatIfNoMessages(chatId) {
  try {
    const chatData = await chat.findOne({ sender: String(chatId) });

    if (chatData && chatData.messages.length === 0) {
      await chatData.deleteOne();
      console.log("Chat deleted because it has no messages.");
    }
  } catch (err) {
    console.error("Error deleting chat:", err);
  }
}

const updateUserData = async (user) => {
  try {
    const chatData = await chat.findOne({ sender: user.chatId });

    if (chatData) {
      chatData.name = user.name || chatData.name;
      chatData.email = user.email || chatData.email;
      chatData.phone = user.phone || chatData.phone;

      await chatData.save();
    } else {
      console.log("User not found");
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  updateChat,
  createTempUser,
  deleteChatIfNoMessages,
  updateUserData,
};
