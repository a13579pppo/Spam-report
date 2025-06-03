
import json
import telebot

API_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'
bot = telebot.TeleBot(API_TOKEN)

REPORT_FILE = 'reports.json'

def load_reports():
    try:
        with open(REPORT_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def save_reports(data):
    with open(REPORT_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@bot.message_handler(commands=['report'])
def handle_report(message):
    try:
        reported_user = message.text.split()[1]
        reporter = str(message.from_user.id)
        data = load_reports()
        if reported_user not in data:
            data[reported_user] = []
        if reporter not in data[reported_user]:
            data[reported_user].append(reporter)
            save_reports(data)
            bot.reply_to(message, f"User {reported_user} reported successfully.")
        else:
            bot.reply_to(message, "You already reported this user.")
    except IndexError:
        bot.reply_to(message, "Usage: /report <user_id>")

bot.polling()
