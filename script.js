document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginBox = document.getElementById("login");
  const chatBox = document.getElementById("chatUI");
  const chatList = document.getElementById("chatList");
  const messagesBox = document.getElementById("messages");
  const sendForm = document.getElementById("sendForm");
  const messageInput = document.getElementById("messageInput");
  const selectedChatTitle = document.getElementById("chatTitle");
  const reportBtn = document.getElementById("reportBtn");

  const fakeChats = [
    { name: "Alice", username: "alice123", tag: "spam" },
    { name: "Bob", username: "bob456", tag: null },
    { name: "Charlie", username: "charlie789", tag: null }
  ];

  let currentChat = null;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const phone = document.getElementById("phone").value;
    const code = document.getElementById("code").value;
    if (phone && code === "1234") {
      loginBox.style.display = "none";
      chatBox.style.display = "block";
      renderChatList();
    } else {
      alert("Invalid code.");
    }
  });

  function renderChatList() {
    chatList.innerHTML = "";
    fakeChats.forEach(chat => {
      const div = document.createElement("div");
      div.className = "chat-item";
      div.textContent = chat.name + (chat.tag ? ` [${chat.tag.toUpperCase()}]` : "");
      div.addEventListener("click", () => {
        currentChat = chat;
        selectedChatTitle.textContent = chat.name;
        messagesBox.innerHTML = "";
      });
      chatList.appendChild(div);
    });
  }

  sendForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentChat) {
      alert("Select a chat first.");
      return;
    }
    const msg = messageInput.value;
    if (msg.trim() === "") return;
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = `You: ${msg}`;
    messagesBox.appendChild(div);
    messageInput.value = "";
  });

  reportBtn.addEventListener("click", () => {
    if (!currentChat) {
      alert("Select a user first.");
      return;
    }
    alert("✅ Report sent to administrators.");
  });
});
