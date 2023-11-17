const socket = io();
let userName = "";
let userEmail = "";
let userPhone = "";

const chatButton = document.getElementById("chat-button");
const chatPopup = document.getElementById("chat-popup");
const messageInput = document.getElementById("message-input");
const chatMessages = document.getElementById("chat-messages");

document.addEventListener("DOMContentLoaded", () => {
  // Toggle chat popup visibility
  window.toggleChat = () => {
    if (
      userName.length > 0 &&
      userEmail.length > 0 &&
      userPhone.at.length > 0
    ) {
      if (chatPopup.style.display === "none" || !chatPopup.style.display) {
        chatPopup.style.display = "block";
        chatButton.style.display = "none";
      } else {
        chatPopup.style.display = "none";
        chatButton.style.display = "block";
      }
    } else {
      userName = prompt("Enter Your Name...");
      userEmail = prompt("Enter Your Email...");
      userPhone = prompt("Enter Your Phone...");
      if (
        userName.length > 0 &&
        userEmail.length > 0 &&
        userPhone.at.length > 0
      ) {
        socket.emit("update-user", {
          chatId: socket.id,
          name: userName,
          email: userEmail,
          phone: userPhone,
        });
      }
    }
  };

  // Receive messages from the server
  socket.on("message", (data) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("msgLeft");

    console.log(data);
    messageElement.textContent = `${data.role}(${data.name}): ${data.messageString}`;
    chatMessages.appendChild(messageElement);
  });

  // Send messages to the server
  window.sendMessage = () => {
    const message = messageInput.value;
    if (message.trim() !== "") {
      socket.emit("message", {
        userId: String(socket.id),
        messageString: message,
        role: "USER",
        name: userName,
      });
      messageInput.value = "";

      // Append the sent message to the chat messages
      const sentMessageElement = document.createElement("div");
      sentMessageElement.classList.add("msgRight");
      sentMessageElement.textContent = `USER: ${message}`;
      chatMessages.appendChild(sentMessageElement);
    }
  };
});
