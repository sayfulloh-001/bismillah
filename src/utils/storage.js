const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : '/api';

// Helper for local storage reading with JSON parsing fallback
export const getLocal = (key, fallback) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

// Helper for local storage writing
export const setLocal = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error writing to localStorage:", e);
  }
};

// Synchronous Getters for Instant Load on Mount (0ms delay)
export const getAppStateSync = () => getLocal('app_state', { activeView: 'home', isAdmin: false });
export const getRequestsSync = () => getLocal('startup_requests', []);
export const getFreelancersSync = () => getLocal('freelancers', []);
export const getTelegramConfigSync = () => getLocal('telegram_config', {
  telegramToken: '8793259506:AAFMrsPvXzEvRxy3CtDYbXtD0KtHImjmLEg',
  telegramChatId: '6473433651'
});

// Specialists (Freelancers)
export const getFreelancers = async () => {
  try {
    const res = await fetch(`${API_URL}/freelancers`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    setLocal('freelancers', data);
    return data;
  } catch (e) {
    console.warn("Using local storage fallback for freelancers");
    return getLocal('freelancers', []);
  }
};

export const addFreelancer = async (freelancer) => {
  const current = getLocal('freelancers', []);
  const newFreelancer = { ...freelancer, id: 'fl-' + Date.now() };
  const updated = [newFreelancer, ...current];
  setLocal('freelancers', updated);

  try {
    const res = await fetch(`${API_URL}/freelancers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(freelancer)
    });
    if (res.ok) {
      const serverData = await res.json();
      return serverData;
    }
  } catch (e) {
    console.warn("Saved freelancer to local storage fallback");
  }
  return newFreelancer;
};

export const updateFreelancer = async (freelancer) => {
  const current = getLocal('freelancers', []);
  const updated = current.map(f => f.id === freelancer.id ? freelancer : f);
  setLocal('freelancers', updated);

  try {
    const res = await fetch(`${API_URL}/freelancers/${freelancer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(freelancer)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Updated freelancer in local storage fallback");
  }
  return freelancer;
};

export const deleteFreelancer = async (id) => {
  const current = getLocal('freelancers', []);
  const updated = current.filter(f => f.id !== id);
  setLocal('freelancers', updated);

  try {
    const res = await fetch(`${API_URL}/freelancers/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Deleted freelancer from local storage fallback");
  }
  return { success: true };
};

// Startup Requests
export const getRequests = async () => {
  try {
    const res = await fetch(`${API_URL}/requests`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    setLocal('startup_requests', data);
    return data;
  } catch (e) {
    console.warn("Using local storage fallback for requests");
    return getLocal('startup_requests', []);
  }
};

// Helper to escape HTML entities for Telegram Bot API
const escapeHTML = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

let lastSentHash = '';
let lastSentTime = 0;

// Direct Telegram Notification helper for 100% reliable single instant delivery
export const sendDirectTelegramNotification = async (request) => {
  const currentHash = `${request.clientName || request.name || ''}_${request.phone || ''}_${request.serviceType || request.projectName || ''}`;
  const now = Date.now();

  // Block duplicate calls within 1 second window (to prevent double-click duplicates)
  if (currentHash === lastSentHash && (now - lastSentTime < 1000)) {
    console.log("Blocking duplicate Telegram notification within 1s window");
    return;
  }

  lastSentHash = currentHash;
  lastSentTime = now;

  const cfg = getLocal('telegram_config', {
    telegramToken: '8793259506:AAFMrsPvXzEvRxy3CtDYbXtD0KtHImjmLEg',
    telegramChatId: '6473433651'
  });

  const token = cfg.telegramToken || '8793259506:AAFMrsPvXzEvRxy3CtDYbXtD0KtHImjmLEg';
  const chatId = cfg.telegramChatId || '6473433651';

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

    const cleanPhone = rawPhone.replace(/[^\d+]/g, '');
    const replyMarkup = cleanPhone && cleanPhone.length > 5 ? {
      inline_keyboard: [
        [
          {
            text: `📞 Bog'lanish (${rawPhone})`,
            url: `tel:${cleanPhone}`
          }
        ]
      ]
    } : undefined;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
        ...(replyMarkup ? { reply_markup: replyMarkup } : {})
      })
    });
  } catch (e) {
    console.error("Direct Telegram notification error:", e);
  }
};

export const addRequest = async (request) => {
  // Check maximum submission limit (100)
  const count = parseInt(window.localStorage.getItem('user_submission_count') || '0', 10);
  if (count >= 100) {
    throw new Error("Maksimal yuborish soni (100 ta) cheklangan!");
  }

  // Save to localStorage immediately so data is NEVER lost on refresh/close
  const newReq = {
    ...request,
    id: request.id || 'req-' + Date.now(),
    createdAt: request.createdAt || new Date().toISOString(),
    status: request.status || 'kutilmoqda'
  };

  const current = getLocal('startup_requests', []);
  const updated = [newReq, ...current];
  setLocal('startup_requests', updated);

  // Increment submission count
  window.localStorage.setItem('user_submission_count', (count + 1).toString());

  // Trigger instant Telegram notification directly from browser EXACTLY ONCE
  await sendDirectTelegramNotification(request);

  try {
    const res = await fetch(`${API_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...request, skipTelegram: true })
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Saved request to local storage fallback");
  }

  return newReq;
};

export const updateRequestStatus = async (id, status) => {
  const current = getLocal('startup_requests', []);
  const updated = current.map(r => r.id === id ? { ...r, status } : r);
  setLocal('startup_requests', updated);

  try {
    const res = await fetch(`${API_URL}/requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Updated request status in local storage fallback");
  }
  return { id, status };
};

export const deleteRequest = async (id) => {
  const current = getLocal('startup_requests', []);
  const updated = current.filter(r => r.id !== id);
  setLocal('startup_requests', updated);

  try {
    const res = await fetch(`${API_URL}/requests/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Deleted request from local storage fallback");
  }
  return { success: true };
};

// Visitors Count
export const getVisitorCount = async () => {
  try {
    const res = await fetch(`${API_URL}/visitors`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    setLocal('visitor_count', data.visitors.toString());
    return data.visitors.toString();
  } catch (e) {
    return getLocal('visitor_count', "1428");
  }
};

export const incrementVisitorCount = async (amount = 1) => {
  const current = parseInt(getLocal('visitor_count', "1428"), 10);
  const next = (current + amount).toString();
  setLocal('visitor_count', next);

  try {
    const res = await fetch(`${API_URL}/visitors/increment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    if (res.ok) {
      const data = await res.json();
      return data.visitors.toString();
    }
  } catch (e) {
    console.warn("Incremented visitor count in local storage fallback");
  }
  return next;
};

// Favorites
export const getFavorites = async () => {
  try {
    const res = await fetch(`${API_URL}/favorites`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    setLocal('favorites', data);
    return data;
  } catch (e) {
    return getLocal('favorites', []);
  }
};

export const toggleFavorite = async (id) => {
  const current = getLocal('favorites', []);
  const idx = current.indexOf(id);
  let updated;
  if (idx === -1) updated = [...current, id];
  else updated = current.filter(item => item !== id);
  setLocal('favorites', updated);

  try {
    const res = await fetch(`${API_URL}/favorites/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Toggled favorite in local storage fallback");
  }
  return updated;
};

// App State Persistence
export const getAppState = async () => {
  try {
    const res = await fetch(`${API_URL}/app-state`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    setLocal('app_state', data);
    return data;
  } catch (e) {
    return getLocal('app_state', { activeView: 'home', isAdmin: false });
  }
};

export const updateAppState = async (state) => {
  const current = getLocal('app_state', { activeView: 'home', isAdmin: false });
  const updated = { ...current, ...state };
  setLocal('app_state', updated);

  try {
    const res = await fetch(`${API_URL}/app-state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Updated app state in local storage fallback");
  }
  return updated;
};

// Telegram Config API
export const getTelegramConfig = async () => {
  try {
    const res = await fetch(`${API_URL}/telegram-config`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    setLocal('telegram_config', data);
    return data;
  } catch (e) {
    return getLocal('telegram_config', {
      telegramToken: '8793259506:AAFMrsPvXzEvRxy3CtDYbXtD0KtHImjmLEg',
      telegramChatId: '6473433651'
    });
  }
};

export const updateTelegramConfig = async (config) => {
  setLocal('telegram_config', config);
  try {
    const res = await fetch(`${API_URL}/telegram-config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Updated telegram config in local storage fallback");
  }
  return config;
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

export const getPortfolioProjectsSync = () => getLocal('portfolio_projects', INITIAL_FALLBACK_PORTFOLIO);

export const getPortfolioProjects = async () => {
  try {
    const res = await fetch(`${API_URL}/portfolio-projects`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    setLocal('portfolio_projects', data);
    return data;
  } catch (e) {
    console.warn("Using local storage fallback for portfolio projects");
    return getLocal('portfolio_projects', INITIAL_FALLBACK_PORTFOLIO);
  }
};

export const addPortfolioProject = async (project) => {
  const newProj = {
    ...project,
    id: 'port-' + Date.now(),
    createdAt: new Date().toISOString()
  };
  const current = getLocal('portfolio_projects', INITIAL_FALLBACK_PORTFOLIO);
  const updated = [newProj, ...current];
  setLocal('portfolio_projects', updated);

  try {
    const res = await fetch(`${API_URL}/portfolio-projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Saved portfolio project to local storage fallback");
  }
  return newProj;
};

export const updatePortfolioProject = async (project) => {
  const current = getLocal('portfolio_projects', INITIAL_FALLBACK_PORTFOLIO);
  const updated = current.map(p => p.id === project.id ? { ...p, ...project } : p);
  setLocal('portfolio_projects', updated);

  try {
    const res = await fetch(`${API_URL}/portfolio-projects/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Updated portfolio project in local storage fallback");
  }
  return project;
};

export const deletePortfolioProject = async (id) => {
  const current = getLocal('portfolio_projects', INITIAL_FALLBACK_PORTFOLIO);
  const updated = current.filter(p => p.id !== id);
  setLocal('portfolio_projects', updated);

  try {
    const res = await fetch(`${API_URL}/portfolio-projects/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Deleted portfolio project from local storage fallback");
  }
  return { success: true };
};
