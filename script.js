let isLoggedIn = false;
let currentChatUser = null;

function login() {
  const phone = document.getElementById("phone").value;
  const code = document.getElementById("code").value;

  if (phone && code === "1234") {
    isLoggedIn = true;
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("chatSection").style.display = "block";
    loadChatList();
  } else {
    alert("Invalid code. Use 1234 to log in.");
  }
}

function loadChatList() {
  const chatList = document.getElementById("chatList");
  chatList.style.display = "block";

  const users = [
    { username: "AliSpammer", tag: "spam", bio: "⚠️ This user may be a spammer." },
    { username: "NormalUser", tag: "", bio: "Just a regular user of SpamTel." }
  ];

  chatList.innerHTML = "";

  users.forEach((user, index) => {
    const item = document.createElement("div");
    item.className = "chat-item";
    item.innerHTML = `
      ${user.username} 
      ${user.tag ? `<span style="border:1px solid gray; padding:2px 6px; margin-left:8px; font-size:12px;">${user.tag.toUpperCase()}</span>` : ""}
    `;
    item.onclick = () => openChat(user);
    chatList.appendChild(item);
  });
}

function openChat(user) {
  currentChatUser = user;
  document.getElementById("chatWindow").style.display = "block";
  document.getElementById("chatMessages").innerHTML = `
    <div><strong>${user.username}</strong></div>
    <div style="font-size:13px; color:gray; margin-bottom:10px;">${user.bio}</div>
  `;
}

function sendMessage() {
  const msg = document.getElementById("messageInput").value.trim();
  if (!msg || !currentChatUser) return;

  const messageElement = document.createElement("div");
  messageElement.className = "message sent";
  messageElement.innerText = msg;

  document.getElementById("chatMessages").appendChild(messageElement);
  document.getElementById("messageInput").value = "";
}

function reportSpam() {
  if (!currentChatUser) return;
  alert("✅ Report for spam submitted to admins.");
}
