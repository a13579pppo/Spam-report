document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("report-form");
  const statusMsg = document.getElementById("status-msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const reason = document.getElementById("reason").value.trim();
    const language = document.getElementById("language").value;

    if (!username || !reason) {
      statusMsg.textContent = "Please fill in all fields.";
      return;
    }

    const report = {
      username: username,
      reason: reason,
      language: language
    };

    // ذخیره در localStorage به‌جای فایل چون JS در مرورگر است
    let reports = JSON.parse(localStorage.getItem("spam_reports") || "[]");
    reports.push(report);
    localStorage.setItem("spam_reports", JSON.stringify(reports));

    statusMsg.textContent = "✅ Report submitted to moderation team.";
    form.reset();
  });

  // اگر کاربر علامت‌خورده باشد، تگ و بیو را نمایش بده
  const currentUser = "testuser123"; // این را با نام کاربر واقعی تغییر دهید
  const markedSpamUsers = ["testuser123", "spammer456"];

  if (markedSpamUsers.includes(currentUser)) {
    document.getElementById("tag").textContent = "[SPAM]";
    document.getElementById("bio").textContent =
      "⚠️ This user has been flagged for suspicious and disturbing activity. Please be cautious when interacting with them. Reports have been reviewed and confirmed.";
  }
});
