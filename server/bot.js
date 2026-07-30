export async function startTelegramBot(token) {
  let offset = 0;
  
  console.log("🤖 Creator Telegram Boti (JS) ishga tushmoqda...");
  
  async function poll() {
    try {
      // Use global fetch (built-in Node.js 18+)
      const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${offset}&timeout=30`);
      if (!res.ok) {
        throw new Error(`Telegram API HTTP error: ${res.status}`);
      }
      const data = await res.json();
      if (data.ok && data.result) {
        for (const update of data.result) {
          offset = update.update_id + 1;
          if (update.message) {
            await handleMessage(token, update.message);
          }
        }
      }
    } catch (e) {
      console.error("Error in bot polling loop:", e.message);
      // Wait 5 seconds before retrying on error to avoid spamming
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    // Schedule next poll
    setImmediate(poll);
  }
  
  poll();
}

async function handleMessage(token, message) {
  const chatId = message.chat.id;
  const text = message.text || '';
  
  const sendMessage = async (replyText, replyMarkup = undefined) => {
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: replyText,
          parse_mode: 'HTML',
          reply_to_message_id: message.message_id,
          ...(replyMarkup ? { reply_markup: replyMarkup } : {})
        })
      });
    } catch (e) {
      console.error("Error sending bot message:", e.message);
    }
  };

  if (text.startsWith('/start') || text.startsWith('/help')) {
    const welcomeText = 
      `🚀 <b>Creator Botiga xush kelibsiz!</b>\n\n` +
      `Ushbu bot platforma (Telegram bot, Veb-sayt, Startap) loyiha buyurtmalarini avtomatik yetkazish uchun ishlaydi.\n\n` +
      `📋 <b>Mavjud buyruqlar:</b>\n` +
      `/myid - Telegram Chat ID ngizni ko'rish\n` +
      `/status - Bot faollik holatini ko'rish`;
      
    const markup = {
      inline_keyboard: [
        [{ text: "📞 Admin bilan bog'lanish", url: "tel:+998947319545" }]
      ]
    };
    await sendMessage(welcomeText, markup);
  } else if (text.startsWith('/myid')) {
    await sendMessage(`Sizning Telegram ID ngiz: <code>${chatId}</code>`);
  } else if (text.startsWith('/status')) {
    await sendMessage(`✅ <b>Creator Boti faol rejimda ishlamoqda!</b>`);
  } else {
    const markup = {
      inline_keyboard: [
        [{ text: "📞 Qo'ng'iroq qilish", url: "tel:+998947319545" }]
      ]
    };
    await sendMessage("Assalomu alaykum! Xabaringiz qabul qilindi. Mutaxassislarimiz tez orada bog'lanishadi. 🚀", markup);
  }
}
