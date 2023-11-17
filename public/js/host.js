const socket = io("http://localhost:8000");
const replyInput = document.querySelector("#reply-input");
const chatListElem = document.querySelector("#chat-list");
const chatMessagesElem = document.querySelector("#chat-messages");
const xhr = new XMLHttpRequest();
const adminName = prompt("Enter Admin Name...");

let currentActiveChat = "";
loadChatList();

socket.on("admin-message", (msg) => {
  const divElem = document.createElement("div");
  divElem.innerText = msg.role + ": " + msg.messageString;
  console.log(divElem.innerText);
  console.log("hello");
  divElem.classList.add("msgLeft");

  chatMessagesElem.appendChild(divElem);
});

// Add your frontend logic here

function loadChatHistory() {
  // Fetch chat list from the server and populate the #chat-list element
}

function loadChatList(selectedChat) {
  xhr.open("GET", "http://localhost:8000/get-chats", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        const responseData = JSON.parse(xhr.responseText);

        responseData.forEach((item) => {
          const divElem = document.createElement("div");
          divElem.onclick = () => {
            chatMessagesElem.innerHTML = "";
            currentActiveChat = item.sender;
            item.messages.forEach((item) => {
              const msgElem = document.createElement("div");
              msgElem.innerText = `${item.role}: ${item.messageString}`;
              if (item.role === "ADMIN") {
                msgElem.classList.add("msgRight");
              } else {
                msgElem.classList.add("msgLeft");
              }

              chatMessagesElem.appendChild(msgElem);
            });
          };

          chatListElem.appendChild(divElem);

          const senderElem = document.createElement("span");
          senderElem.innerText = "Name: " + item.name ? "USER" : item.name;
          divElem.appendChild(senderElem);

          const messageElem = document.createElement("p");
          messageElem.innerText = "Id: " + item.sender;
          divElem.appendChild(messageElem);

          chatListElem.appendChild(divElem);
        });
      } else {
        console.error("Error: " + xhr.status);
      }
    }
  };

  xhr.send();
}

const sendMessage = () => {
  // const userId = "gdbfhgd"; // Remove the semicolon at the end
  if (replyInput.value) {
    socket.emit("admin-message", {
      userId: currentActiveChat,
      messageString: replyInput.value,
      role: "ADMIN",
      name: adminName,
    });
    const msgElem = document.createElement("div");
    msgElem.innerText = `${adminName}: ${replyInput.value}`;
    msgElem.classList.add("msgRight");

    chatMessagesElem.appendChild(msgElem);
    replyInput.value = "";
  }
};
