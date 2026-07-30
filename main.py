import sys
import io
import time
import telebot

# Ensure UTF-8 output encoding on Windows console
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

TOKEN = "8793259506:AAFMrsPvXzEvRxy3CtDYbXtD0KtHImjmLEg"
ADMIN_CHAT_ID = "6473433651"

bot = telebot.TeleBot(TOKEN, parse_mode="HTML")

from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton

print("🤖 Creator Telegram Boti ishga tushmoqda...")

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    welcome_text = (
        "🚀 <b>Creator Botiga xush kelibsiz!</b>\n\n"
        "Ushbu bot platforma (Telegram bot, Veb-sayt, Startap) loyiha buyurtmalarini avtomatik yetkazish uchun ishlaydi.\n\n"
        "📋 <b>Mavjud buyruqlar:</b>\n"
        "/myid - Telegram Chat ID ngizni ko'rish\n"
        "/status - Bot faollik holatini ko'rish"
    )
    markup = InlineKeyboardMarkup()
    markup.add(InlineKeyboardButton("📞 Admin bilan bog'lanish", url="tel:+998947319545"))
    bot.reply_to(message, welcome_text, reply_markup=markup)

@bot.message_handler(commands=['myid'])
def send_myid(message):
    bot.reply_to(message, f"Sizning Telegram ID ngiz: <code>{message.chat.id}</code>")

@bot.message_handler(commands=['status'])
def send_status(message):
    bot.reply_to(message, "✅ <b>Creator Boti faol rejimda ishlamoqda!</b>")

@bot.message_handler(func=lambda message: True)
def echo_all(message):
    markup = InlineKeyboardMarkup()
    markup.add(InlineKeyboardButton("📞 Qo'ng'iroq qilish", url="tel:+998947319545"))
    bot.reply_to(message, "Assalomu alaykum! Xabaringiz qabul qilindi. Mutaxassislarimiz tez orada bog'lanishadi. 🚀", reply_markup=markup)

if __name__ == '__main__':
    print("✅ Bot polling rejimida muvaffaqiyatli ishga tushdi.")
    try:
        bot.infinity_polling()
    except Exception as e:
        print("Bot ijrosida xatolik:", e)
