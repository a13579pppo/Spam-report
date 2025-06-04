const users = [
  { username: "john_doe", name: "John Doe", spam: true },
  { username: "sara_chan", name: "Sara Chan", spam: false },
  { username: "evil_bot", name: "Evil Bot", spam: true },
];

let selectedUser = null;

function login() {
  const number = document.getElementById("number").value;
  const code = document.getElementById("code").value;

  if (number && code === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "flex";
    loadChatList();
  } else {
    alert("❌ Incorrect code! Try 1234 for test login.");
  }
}

function loadChatList() {
  const list = document.getElementById("chatList");
  list.innerHTML = "";

  users.forEach((user, i) => {
    const item = document.createElement("div");
    item.className = "chat-item";
    item.innerHTML = `
      <strong>@${user.username}</strong><br>
      ${user.spam ? "<small style='color:red;'>⚠️ Suspected Spam</small>" : "<small>Safe</small>"}
    `;
    item.onclick = () => openChat(i);
    list.appendChild(item);
  });
}

function openChat(index) {
  selectedUser = users[index];
  document.getElementById("chatTitle").innerText = selectedUser.name;
  document.getElementById("messages").innerHTML = `
    <div class="message">Hi, I'm ${selectedUser.name} (@${selectedUser.username})</div>
  `;
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();

  if (!message || !selectedUser) return;

  const msgDiv = document.createElement("div");
  msgDiv.className = "message self";
  msgDiv.innerText = message;
  document.getElementById("messages").appendChild(msgDiv);
  input.value = "";
}

function reportSpam() {
  if (!selectedUser) return;

  const reason = prompt("🚨 Why do you want to report this user?");
  if (reason) {
    alert(`✅ Report for @${selectedUser.username} submitted.\nReason: ${reason}`);
  }
}
