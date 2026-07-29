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
    name: "Software Engineer (Domla)",
    profession: "Senior Software Engineer & Lead Architect",
    category: "Full Stack",
    experience: 7,
    age: 32,
    location: "Toshkent",
    shortBio: "Platforma Asoschisi & Bosh Muhandisi. Murakkab tizimlar arxitekturasi va backend mutaxassisi.",
    aboutMe: "Freelancer Hub Uz platformasi asoschisi va bosh muhandisi. Software Engineering, microservices, cloud arxitekturasi va AI modellarini integratsiya qilish bo'yicha ko'p yillik tajribaga egaman.",
    technologies: ["Node.js", "Python", "System Design", "Microservices", "Docker", "PostgreSQL", "React"],
    skills: ["Tizim Arxitekturasi", "Cloud Infratuzilma", "Security", "AI Integratsiya"],
    languages: ["O'zbekcha (Ona tili)", "Inglizcha (Erkin)"],
    education: [
      {
        institution: "Toshkent Axborot Texnologiyalari Universiteti",
        degree: "Dasturiy injiniring, Magistr",
        period: "2015 - 2021"
      }
    ],
    certificates: [
      { name: "Senior System Architect", issuer: "IEEE", year: "2023" }
    ],
    workExperience: [
      {
        company: "Freelancer Hub Uz",
        position: "Co-Founder & Lead Software Engineer",
        period: "2024 - Hozirgi vaqt",
        description: "Platforma arxitekturasiga asos solgan yetakchi muhandis."
      }
    ],
    portfolio: [
      {
        title: "Freelancer Hub Uz Platformasi",
        description: "High-performance IT kadrlar va loyihalar platformasi.",
        tech: ["React", "Express", "Vite", "Node.js"],
        link: "#",
        image: "/logo-pencil.jpg"
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Tadbirkor",
        company: "Tech Startups",
        stars: 5,
        text: "Professional Software Engineer. Loyihani eng yuqori standartlarda bajarib berdi.",
        project: "Enterprise System"
      }
    ],
    avatar: "/founder-engineer.png",
    resumeUrl: "#",
    phone: "+998 94 731 95 45",
    telegram: "freelancehub_uz",
    email: "admin@freelancehub.uz",
    github: "https://github.com/sayfulloh-001",
    linkedin: "#",
    verified: true,
    premium: true,
    status: "online",
    successRate: 100,
    completedJobs: 50
  },
  {
    id: "2",
    name: "Full Stack Developer",
    profession: "Full Stack Developer & Web Engineer",
    category: "Full Stack",
    experience: 4,
    age: 22,
    location: "Toshkent",
    shortBio: "Platforma Ham-asoschisi. Telegram botlar, zamonaviy veb-saytlar va Full Stack ilovalar yaratuvchisi.",
    aboutMe: "Freelancer Hub Uz ham-asoschisiman. React, Node.js va Telegram API yordamida har qanday murakkablikdagi Telegram botlar, tezkor veb-saytlar va startaplarni ishlab chiqaman.",
    technologies: ["React", "Node.js", "Express", "Telegram API", "JavaScript", "Tailwind", "PostgreSQL"],
    skills: ["Telegram Botlar", "Full Stack Web Development", "UI/UX", "API"],
    languages: ["O'zbekcha (Ona tili)", "Inglizcha"],
    education: [
      {
        institution: "TATU",
        degree: "Dasturiy injiniring",
        period: "2020 - 2024"
      }
    ],
    certificates: [
      { name: "Full Stack Web Development", issuer: "Coursera", year: "2024" }
    ],
    workExperience: [
      {
        company: "Freelancer Hub Uz",
        position: "Co-Founder & Full Stack Developer",
        period: "2024 - Hozirgi vaqt",
        description: "Veb va bot loyihalar yaratish ham-asoschisi."
      }
    ],
    portfolio: [
      {
        title: "Telegram Bot & E-commerce",
        description: "Avtomatlashtirilgan Telegram bot va veb platformalar.",
        tech: ["React", "Node.js", "Telegram API"],
        link: "#",
        image: "/logo-pencil.jpg"
      }
    ],
    reviews: [
      {
        id: "r2",
        author: "Mijoz",
        company: "Online Store",
        stars: 5,
        text: "Telegram bot va saytimizni juda tez va sifatli yaratib berdi!",
        project: "Telegram Bot & Store"
      }
    ],
    avatar: "/founder-fullstack.png",
    resumeUrl: "#",
    phone: "+998 94 731 95 45",
    telegram: "freelancehub_uz",
    email: "dev@freelancehub.uz",
    github: "https://github.com/sayfulloh-001",
    linkedin: "#",
    verified: true,
    premium: true,
    status: "online",
    successRate: 100,
    completedJobs: 45
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
