const API_URL = 'http://localhost:5000/api';

// Specialists (Freelancers)
export const getFreelancers = async () => {
  try {
    const res = await fetch(`${API_URL}/freelancers`);
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error fetching freelancers from server:", e);
    return [];
  }
};

export const addFreelancer = async (freelancer) => {
  try {
    const res = await fetch(`${API_URL}/freelancers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(freelancer)
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error adding freelancer on server:", e);
    return null;
  }
};

export const updateFreelancer = async (freelancer) => {
  try {
    const res = await fetch(`${API_URL}/freelancers/${freelancer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(freelancer)
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error updating freelancer on server:", e);
    return null;
  }
};

export const deleteFreelancer = async (id) => {
  try {
    const res = await fetch(`${API_URL}/freelancers/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error deleting freelancer on server:", e);
    return null;
  }
};

// Startup Requests
export const getRequests = async () => {
  try {
    const res = await fetch(`${API_URL}/requests`);
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error fetching requests from server:", e);
    return [];
  }
};

// Helper to escape HTML entities for Telegram Bot API
const escapeHTML = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

// Deduplication lock to guarantee NO duplicate messages within 5 seconds
let lastSentHash = '';
let lastSentTime = 0;

// Direct Telegram Notification helper for 100% reliable instant delivery
export const sendDirectTelegramNotification = async (request) => {
  const currentHash = `${request.clientName || request.name || ''}_${request.phone || ''}_${request.serviceType || request.projectName || ''}_${request.description || ''}`;
  const now = Date.now();

  if (currentHash === lastSentHash && (now - lastSentTime < 5000)) {
    console.log("Blocking duplicate Telegram notification within 5s window");
    return;
  }

  lastSentHash = currentHash;
  lastSentTime = now;

  const token = '8793259506:AAFMrsPvXzEvRxy3CtDYbXtD0KtHImjmLEg';
  const chatId = '6473433651';
  try {
    const rawClientName = request.clientName || request.name || 'Noma\'lum';
    const rawPhone = request.phone || 'Kiritilmagan';
    let rawServiceType = request.serviceType || request.projectName || 'Loyiha';
    if (!rawServiceType.includes('🚀') && !rawServiceType.includes('🤖') && !rawServiceType.includes('🌐')) {
      if (rawServiceType.toLowerCase().includes('startap')) rawServiceType = '🚀 ' + rawServiceType;
      else if (rawServiceType.toLowerCase().includes('bot')) rawServiceType = '🤖 ' + rawServiceType;
      else if (rawServiceType.toLowerCase().includes('sayt') || rawServiceType.toLowerCase().includes('web')) rawServiceType = '🌐 ' + rawServiceType;
    }
    const rawPrice = request.price || (rawServiceType.includes('Startap') ? '400$ +' : rawServiceType.includes('Bot') ? '50$ +' : rawServiceType.includes('sayt') ? '200$ +' : '');
    const rawDescription = request.description || request.details || request.projectName || 'Yo\'q';

    const clientName = escapeHTML(rawClientName);
    const phone = escapeHTML(rawPhone);
    const serviceType = escapeHTML(rawServiceType);
    const price = escapeHTML(rawPrice);
    const description = escapeHTML(rawDescription);

    const messageText = `🚀 <b>YANGI LOYIHA BUYURTMASI!</b>\n\n` +
      `👤 <b>Mijoz:</b> ${clientName}\n` +
      `📞 <b>Tel:</b> ${phone}\n` +
      `💼 <b>Loyiha turi:</b> ${serviceType}\n` +
      (price ? `💵 <b>Tarif:</b> ${price}\n` : '') +
      `📝 <b>Ma'lumot:</b> ${description}\n\n` +
      `<i>📅 Vaqt: ${new Date().toLocaleString()}</i>`;

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML'
      })
    });

    const data = await res.json();
    if (!data.ok) {
      console.warn("Telegram HTML mode failed, retrying with plain text:", data);
      const plainText = `🚀 YANGI LOYIHA BUYURTMASI!\n\n` +
        `👤 Mijoz: ${rawClientName}\n` +
        `📞 Tel: ${rawPhone}\n` +
        `💼 Loyiha turi: ${rawServiceType}\n` +
        (rawPrice ? `💵 Tarif: ${rawPrice}\n` : '') +
        `📝 Ma'lumot: ${rawDescription}\n\n` +
        `📅 Vaqt: ${new Date().toLocaleString()}`;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: plainText
        })
      });
    }
  } catch (e) {
    console.error("Direct Telegram notification error:", e);
  }
};

export const addRequest = async (request) => {
  // Trigger instant Telegram notification directly from browser EXACTLY ONCE
  await sendDirectTelegramNotification(request);

  try {
    const res = await fetch(`${API_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...request, skipTelegram: true })
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error adding request on server:", e);
    return { ...request, id: Date.now().toString(), status: 'kutilmoqda' };
  }
};

export const updateRequestStatus = async (id, status) => {
  try {
    const res = await fetch(`${API_URL}/requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error updating request status on server:", e);
    return null;
  }
};

export const deleteRequest = async (id) => {
  try {
    const res = await fetch(`${API_URL}/requests/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error deleting request on server:", e);
    return null;
  }
};

// Visitors Count
export const getVisitorCount = async () => {
  try {
    const res = await fetch(`${API_URL}/visitors`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data.visitors.toString();
  } catch (e) {
    console.error("Error getting visitor count from server:", e);
    return "1428";
  }
};

export const incrementVisitorCount = async (amount = 1) => {
  try {
    const res = await fetch(`${API_URL}/visitors/increment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data.visitors.toString();
  } catch (e) {
    console.error("Error incrementing visitor count on server:", e);
    return "1428";
  }
};

// Favorites (Server API)
export const getFavorites = async () => {
  try {
    const res = await fetch(`${API_URL}/favorites`);
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error getting favorites from server:", e);
    return [];
  }
};

export const toggleFavorite = async (id) => {
  try {
    const res = await fetch(`${API_URL}/favorites/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error toggling favorite on server:", e);
    return [];
  }
};

// App State Persistence on Server (View & Admin state)
export const getAppState = async () => {
  try {
    const res = await fetch(`${API_URL}/app-state`);
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error getting app state from server:", e);
    return { activeView: 'home', isAdmin: false };
  }
};

export const updateAppState = async (state) => {
  try {
    const res = await fetch(`${API_URL}/app-state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error updating app state on server:", e);
    return null;
  }
};

// Telegram Config API
export const getTelegramConfig = async () => {
  try {
    const res = await fetch(`${API_URL}/telegram-config`);
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error getting Telegram config from server:", e);
    return { telegramToken: '', telegramChatId: '' };
  }
};

export const updateTelegramConfig = async (config) => {
  try {
    const res = await fetch(`${API_URL}/telegram-config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error updating Telegram config on server:", e);
    return null;
  }
};
