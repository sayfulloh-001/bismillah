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

// Deduplication lock to guarantee NO duplicate messages within 10 seconds
let lastSentHash = '';
let lastSentTime = 0;

// Direct Telegram Notification helper for 100% reliable single instant delivery
export const sendDirectTelegramNotification = async (request) => {
  const currentHash = `${request.clientName || request.name || ''}_${request.phone || ''}_${request.serviceType || request.projectName || ''}`;
  const now = Date.now();

  // Block duplicate calls within 10 seconds window
  if (currentHash === lastSentHash && (now - lastSentTime < 10000)) {
    console.log("Blocking duplicate Telegram notification within 10s window");
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

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML'
      })
    });
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

// Portfolio Projects (Qilingan ishlar API)
const INITIAL_FALLBACK_PORTFOLIO = [
  {
    id: 'port-1',
    title: 'E-Commerce Online Do\'kon Platformasi',
    category: 'Veb-sayt',
    price: '200$ +',
    clientName: 'Lalaku Uzbekistan',
    description: 'Zamonaviy to\'lov tizimlari (Click, Payme) integratsiyalangan va moslashuvchan savdo platformasi.',
    technologies: ['React', 'Node.js', 'Express', 'TailwindCSS'],
    image: 'https://images.unsplash.com/photo-1556742049-0a6756574f8b?w=600',
    demoLink: 'https://lalaku.uz',
    createdAt: new Date().toISOString()
  },
  {
    id: 'port-2',
    title: 'Avtomatlashtirilgan Kuryer & Buyurtma Telegram Boti',
    category: 'Telegram Bot',
    price: '50$ +',
    clientName: 'Express Delivery Uz',
    description: 'Mijozlardan buyurtma qabul qilish va kuryerlarga avtomatik marshrut belgilash bot ekotizimi.',
    technologies: ['Python', 'aiogram', 'Telegram API', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600',
    demoLink: 'https://t.me/open_four_bot',
    createdAt: new Date().toISOString()
  },
  {
    id: 'port-3',
    title: 'AI EdTech FinTech Startap Ekotizimi',
    category: 'Startap',
    price: '400$ +',
    clientName: 'EduInvest Global',
    description: 'Sun\'iy intellekt va analitika bilan ishlaydigan xalqaro ta\'lim hamda investitsiya startap platformasi.',
    technologies: ['React', 'Python AI', 'Node.js', 'Vite'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600',
    demoLink: '#',
    createdAt: new Date().toISOString()
  }
];

export const getPortfolioProjects = async () => {
  try {
    const res = await fetch(`${API_URL}/portfolio-projects`);
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error getting portfolio projects from server:", e);
    return INITIAL_FALLBACK_PORTFOLIO;
  }
};

export const addPortfolioProject = async (project) => {
  try {
    const res = await fetch(`${API_URL}/portfolio-projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error adding portfolio project on server:", e);
    return { ...project, id: 'port-' + Date.now() };
  }
};

export const updatePortfolioProject = async (project) => {
  try {
    const res = await fetch(`${API_URL}/portfolio-projects/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error updating portfolio project on server:", e);
    return project;
  }
};

export const deletePortfolioProject = async (id) => {
  try {
    const res = await fetch(`${API_URL}/portfolio-projects/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Network response not ok');
    return await res.json();
  } catch (e) {
    console.error("Error deleting portfolio project on server:", e);
    return { success: false };
  }
};
