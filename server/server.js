import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const DB_FILE = path.join(__dirname, 'db.json');

const INITIAL_FREELANCERS = [
  {
    id: "1",
    name: "Shavkat Rahimov",
    profession: "Full Stack Developer",
    category: "Full Stack",
    experience: 5,
    age: 26,
    location: "Toshkent",
    shortBio: "Murakkab veb-tizimlar, API interfeyslari va yuqori yuklamali dasturlarni ishlab chiqish bo'yicha mutaxassis.",
    aboutMe: "Men 5 yildan ortiq tajribaga ega Full Stack dasturchiman. Node.js, React va PostgreSQL texnologiyalari yordamida tezkor, xavfsiz va moslashuvchan veb-ilovalarni yaratish bilan shug'ullanaman. Startaplar uchun MVP yaratishdan tortib, korporativ ERP tizimlarigacha bo'lgan loyihalarni muvaffaqiyatli topshirganman.",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Docker", "TypeScript", "Next.js"],
    skills: ["API Arxitekturasi", "Ma'lumotlar bazasini optimallashtirish", "CI/CD", "AWS", "Xavfsizlik", "Git"],
    languages: ["O'zbekcha (Ona tili)", "Ruscha (Erkin)", "Inglizcha (IELTS 7.5)"],
    education: [
      {
        institution: "Toshkent Axborot Texnologiyalari Universiteti",
        degree: "Dasturiy injiniring, Bakalavr",
        period: "2018 - 2022"
      }
    ],
    certificates: [
      { name: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", year: "2024" },
      { name: "Advanced Node.js Application Patterns", issuer: "Joyent", year: "2023" }
    ],
    workExperience: [
      {
        company: "EPAM Systems",
        position: "Senior Software Engineer",
        period: "2024 - Hozirgi vaqt",
        description: "Yirik moliyaviy loyiha uchun mikroxizmatlar arxitekturasini ishlab chiqish va optimallashtirish."
      },
      {
        company: "Najot Ta'lim",
        position: "Frontend & Backend Mentor",
        period: "2022 - 2024",
        description: "150 dan ortiq muvaffaqiyatli bitiruvchilarni professional dasturchi sifatida tayyorladim."
      }
    ],
    portfolio: [
      {
        title: "UzMarket E-Commerce Platformasi",
        description: "100k dan ortiq faol foydalanuvchiga ega bo'lgan to'liq elektron tijorat platformasi.",
        tech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
        link: "https://github.com/shavkat/uzmarket",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop"
      },
      {
        title: "LMS – Ta'lim Tizimi",
        description: "Maktablar va o'quv markazlari uchun onlayn dars va reyting tizimi.",
        tech: ["React", "Express.js", "MongoDB"],
        link: "https://github.com/shavkat/lms-platform",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Alisher Qodirov",
        company: "Apex Tech",
        stars: 5,
        text: "Shavkat bizning startap uchun ajoyib MVP ishlab chiqardi. Belgilangan muddatda va juda sifatli qilib topshirdi. Maslahat beraman!",
        project: "Apex CRM"
      }
    ],
    avatar: "/logo-pencil.jpg",
    resumeUrl: "#",
    phone: "+998 90 123 45 67",
    telegram: "shavkat_dev",
    email: "shavkat.rahimov@gmail.com",
    github: "https://github.com/shavkat",
    linkedin: "https://linkedin.com/in/shavkat",
    verified: true,
    premium: true,
    status: "online",
    successRate: 98,
    completedJobs: 37
  },
  {
    id: "2",
    name: "Dilnoza Alimova",
    profession: "Senior UI/UX Designer",
    category: "UI UX",
    experience: 4,
    age: 24,
    location: "Samarqand",
    shortBio: "Veb va mobil ilovalar uchun zamonaviy, qulay va premium dizaynlar yaratuvchisi.",
    aboutMe: "Men 4 yildan buyon dizayn sohasidaman. Foydalanuvchilar ehtiyojlarini o'rganish, interfeys arxitekturasini tuzish (wireframing) va chiroyli shishasimon (glassmorphic) vizual dizaynlar chizish bo'yicha katta tajribam bor.",
    technologies: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "After Effects", "Webflow"],
    skills: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Typography", "Color Theory"],
    languages: ["O'zbekcha (Ona tili)", "Ruscha (Erkin)", "Inglizcha (Texnik)"],
    education: [
      {
        institution: "Toshkentdagi Turin Politexnika Universiteti",
        degree: "Sanoat dizayni, Bakalavr",
        period: "2019 - 2023"
      }
    ],
    certificates: [
      { name: "Google UX Design Professional Certificate", issuer: "Google (Coursera)", year: "2023" }
    ],
    workExperience: [
      {
        company: "Payme",
        position: "Lead UI/UX Designer",
        period: "2023 - Hozirgi vaqt",
        description: "Mobil ilovaning yangi dizayn tizimini va o'tkazmalar bo'limini qayta ishlab chiqish."
      }
    ],
    portfolio: [
      {
        title: "FinTech Mobil Ilovasi",
        description: "Zamonaviy qora interfeys va neomorfik/glassmorfik effektlarga ega to'lov ilovasi dizayni.",
        tech: ["Figma", "Prototyping"],
        link: "https://figma.com/@dilnoza/fintech",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        id: "r3",
        author: "Rustam Sobirov",
        company: "Silk Road Tour",
        stars: 5,
        text: "Dizaynlar kutilganidan ham ajoyib chiqdi. Ranglar uyg'unligi va animatsiyalar nihoyatda professional.",
        project: "Travel Agency Website"
      }
    ],
    avatar: "/logo-pencil.jpg",
    resumeUrl: "#",
    phone: "+998 93 987 65 43",
    telegram: "dilnoza_ux",
    email: "dilnoza.alimova@design.uz",
    github: "",
    linkedin: "https://linkedin.com/in/dilnoza-ux",
    verified: true,
    premium: true,
    status: "offline",
    successRate: 100,
    completedJobs: 25
  },
  {
    id: "3",
    name: "Sardor Yusupov",
    profession: "AI & Python Engineer",
    category: "AI Engineer",
    experience: 3,
    age: 25,
    location: "Toshkent",
    shortBio: "Sun'iy intellekt, LLM agentlari, Telegram botlar va kompyuter ko'rishi (CV) bo'yicha mutaxassis.",
    aboutMe: "Men Python tilida murakkab algoritmlar va sun'iy intellekt modellarini integratsiya qilish bilan shug'ullanaman. OpenAI API, LangChain va PyTorch yordamida kompaniyalarga ish faoliyatini avtomatlashtiruvchi aqlli tizimlar yaratib beraman. Shuningdek, murakkab Telegram botlar ishlab chiqaman.",
    technologies: ["Python", "FastAPI", "OpenAI API", "PyTorch", "LangChain", "PostgreSQL", "Docker", "Telegram API"],
    skills: ["AI Chatbotlar", "RAG (Retrieval-Augmented Generation)", "Ma'lumotlar tahlili", "Git", "Scikit-Learn"],
    languages: ["O'zbekcha (Ona tili)", "Ruscha (Texnik)", "Inglizcha (IELTS 6.5)"],
    education: [
      {
        institution: "Toshkent shahridagi Amity Universiteti",
        degree: "Kompyuter fanlari, Bakalavr",
        period: "2020 - 2024"
      }
    ],
    certificates: [
      { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2023" }
    ],
    workExperience: [
      {
        company: "AI Innovations",
        position: "NLP Engineer",
        period: "2023 - Hozirgi vaqt",
        description: "Kompaniya ichki hujjatlari bilan ishlaydigan va savollarga javob beradigan aqlli RAG chatbotini yaratish."
      }
    ],
    portfolio: [
      {
        title: "SmartBot AI – Mijozlar bilan ishlash",
        description: "OpenAI GPT-4o asosida ishlaydigan, 24/7 mijozlar bilan muloqot qiluvchi Telegram boti.",
        tech: ["Python", "Telegram API", "OpenAI", "FastAPI"],
        link: "https://github.com/sardor/smartbot-ai",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        id: "r4",
        author: "Bekzod To'rayev",
        company: "RetailUz",
        stars: 5,
        text: "Kompaniyamiz uchun ajoyib AI menejer bot yaratdi. Ishimizni 40% ga yengillashtirdi. Ishiga juda ma'suliyatli yigit ekan.",
        project: "Auto-Support Bot"
      }
    ],
    avatar: "/logo-pencil.jpg",
    resumeUrl: "#",
    phone: "+998 99 444 33 22",
    telegram: "sardor_ai",
    email: "sardor.yusupov@ai.uz",
    github: "https://github.com/sardor",
    linkedin: "https://linkedin.com/in/sardor-ai",
    verified: true,
    premium: false,
    status: "online",
    successRate: 95,
    completedJobs: 18
  }
];

const readDB = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialData = {
        freelancers: INITIAL_FREELANCERS,
        requests: [
          {
            id: "req1",
            clientName: "Alisher Ubaydullayev",
            projectName: "AI Integratsiyali Telegram Bot",
            phone: "+998 90 999 88 77",
            telegram: "startup_founder",
            createdAt: new Date().toISOString(),
            status: "kutilmoqda"
          }
        ],
        visitors: 1428
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database", err);
    return { freelancers: [], requests: [], visitors: 1428 };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing database", err);
  }
};

// GET /api/freelancers
app.get('/api/freelancers', (req, res) => {
  const db = readDB();
  res.json(db.freelancers);
});

// POST /api/freelancers
app.post('/api/freelancers', (req, res) => {
  const db = readDB();
  const newFl = {
    ...req.body,
    id: Date.now().toString(),
    verified: req.body.verified || false,
    premium: req.body.premium || false,
    successRate: req.body.successRate || 100,
    completedJobs: req.body.completedJobs || 0,
    reviews: []
  };
  db.freelancers.unshift(newFl);
  writeDB(db);
  res.status(201).json(newFl);
});

// PUT /api/freelancers/:id
app.put('/api/freelancers/:id', (req, res) => {
  const db = readDB();
  const idx = db.freelancers.findIndex(f => f.id === req.params.id);
  if (idx !== -1) {
    db.freelancers[idx] = {
      ...db.freelancers[idx],
      ...req.body
    };
    writeDB(db);
    res.json(db.freelancers[idx]);
  } else {
    res.status(404).json({ error: "Freelancer not found" });
  }
});

// DELETE /api/freelancers/:id
app.delete('/api/freelancers/:id', (req, res) => {
  const db = readDB();
  db.freelancers = db.freelancers.filter(f => f.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// GET /api/requests
app.get('/api/requests', (req, res) => {
  const db = readDB();
  res.json(db.requests);
});

// POST /api/requests
app.post('/api/requests', (req, res) => {
  const db = readDB();
  const newReq = {
    ...req.body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'kutilmoqda'
  };
  db.requests.unshift(newReq);
  writeDB(db);
  res.status(201).json(newReq);
});

// PUT /api/requests/:id
app.put('/api/requests/:id', (req, res) => {
  const db = readDB();
  const idx = db.requests.findIndex(r => r.id === req.params.id);
  if (idx !== -1) {
    db.requests[idx].status = req.body.status;
    writeDB(db);
    res.json(db.requests[idx]);
  } else {
    res.status(404).json({ error: "Request not found" });
  }
});

// DELETE /api/requests/:id
app.delete('/api/requests/:id', (req, res) => {
  const db = readDB();
  db.requests = db.requests.filter(r => r.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// GET /api/visitors
app.get('/api/visitors', (req, res) => {
  const db = readDB();
  res.json({ visitors: db.visitors });
});

// POST /api/visitors/increment
app.post('/api/visitors/increment', (req, res) => {
  const db = readDB();
  const amount = req.body.amount || 1;
  db.visitors = (db.visitors || 1428) + amount;
  writeDB(db);
  res.json({ visitors: db.visitors });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
