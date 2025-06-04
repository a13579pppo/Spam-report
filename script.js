const users = [
  { name: "JohnDoe", username: "john123" },
  { name: "FakeBot", username: "fake_bot" },
  { name: "Spammer", username: "spammer99" }
];

let selectedUser = null;
let reports = JSON.parse(localStorage.getItem("spamReports") || "[]");

function login() {
  const code = document.getElementById("code").value;
  if (code === "1234") {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appScreen").style.display = "flex";
    loadChats();
  } else {
    alert("Invalid code.");
  }
}

function loadChats() {
  const chatList = document.getElementById("chatList");
  chatList.innerHTML = "";
  users.forEach((u, i) => {
    const div = document.createElement("div");
    div.className = "chat-item";
    const isSpam = reports.includes(u.username);
    div.textContent = isSpam ? `${u.name} [SPAM]` : u.name;
    div.onclick = () => openChat(u);
    chatList.appendChild(div);
  });
}

function openChat(user) {
  selectedUser = user;
  document.getElementById("chatName").textContent =
    reports.includes(user.username) ? `${user.name} [SPAM]` : user.name;
  document.getElementById("chatMessages").innerHTML = "";
  document.getElementById("chatArea").style.display = "flex";
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (message) {
    const div = document.createElement("div");
    div.textContent = "You: " + message;
    document.getElementById("chatMessages").appendChild(div);
    input.value = "";
  }
}

function markSpam() {
  if (selectedUser) {
    if (!reports.includes(selectedUser.username)) {
      reports.push(selectedUser.username);
      localStorage.setItem("spamReports", JSON.stringify(reports));
      alert("Reported as spam!");
      loadChats();
      openChat(selectedUser);
    } else {
      alert("Already marked as spam.");
    }
  }
}
