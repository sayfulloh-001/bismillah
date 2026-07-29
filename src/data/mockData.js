export const INITIAL_FREELANCERS = [
  {
    id: "1",
    name: "Shavkat Rahimov",
    profession: "Full Stack Developer",
    category: "Full Stack",
    experience: 5, // in years
    age: 26,
    location: "Toshkent",
    hourlyRate: 25,
    monthlyRate: 3800,
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
      },
      {
        id: "r2",
        author: "Madina Umarova",
        company: "Smart Media",
        stars: 5,
        text: "Kodni juda toza yozadi va eng muhimi - muammoning tubini tez tushunadi. Hamkorlikdan juda mamnunmiz.",
        project: "Media Portal"
      }
    ],
    avatar: "/logo-pencil.jpg",
    resumeUrl: "#", // Mock download link
    phone: "+998 90 123 45 67",
    telegram: "shavkat_dev",
    email: "shavkat.rahimov@gmail.com",
    github: "https://github.com/shavkat",
    linkedin: "https://linkedin.com/in/shavkat",
    verified: true,
    premium: true,
    status: "online", // online, offline
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
    hourlyRate: 20,
    monthlyRate: 3000,
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
      },
      {
        company: "Fiverr & Upwork",
        position: "Freelance Designer",
        period: "2021 - 2023",
        description: "AQSh va Yevropa mijozlari uchun 30 dan ortiq veb-saytlar dizaynini tayyorladim."
      }
    ],
    portfolio: [
      {
        title: "FinTech Mobil Ilovasi",
        description: "Zamonaviy qora interfeys va neomorfik/glassmorfik effektlarga ega to'lov ilovasi dizayni.",
        tech: ["Figma", "Prototyping"],
        link: "https://figma.com/@dilnoza/fintech",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&auto=format&fit=crop"
      },
      {
        title: "TravelUz Web Dizayni",
        description: "O'zbekistonning tarixiy shaharlariga sayohat qilish uchun premium veb-sayt dizayni.",
        tech: ["Figma", "Illustrator"],
        link: "https://figma.com/@dilnoza/traveluz",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop"
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
    hourlyRate: 30,
    monthlyRate: 4500,
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
      { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2023" },
      { name: "Natural Language Processing in TensorFlow", issuer: "Coursera", year: "2024" }
    ],
    workExperience: [
      {
        company: "AI Innovations",
        position: "NLP Engineer",
        period: "2023 - Hozirgi vaqt",
        description: "Kompaniya ichki hujjatlari bilan ishlaydigan va savollarga javob beradigan aqlli RAG chatbotini yaratish."
      },
      {
        company: "Startup Lab",
        position: "Python Developer",
        period: "2022 - 2023",
        description: "Telegram API orqali savdo avtomatizatsiyasi va mijozlarni qo'llab-quvvatlash botlarini yozish."
      }
    ],
    portfolio: [
      {
        title: "SmartBot AI – Mijozlar bilan ishlash",
        description: "OpenAI GPT-4o asosida ishlaydigan, 24/7 mijozlar bilan muloqot qiluvchi Telegram boti.",
        tech: ["Python", "Telegram API", "OpenAI", "FastAPI"],
        link: "https://github.com/sardor/smartbot-ai",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop"
      },
      {
        title: "Hujjatlarni tahlil qilish tizimi",
        description: "PDF hujjatlarni yuklab, ulardan kerakli ma'lumotlarni sekundlar ichida ajratib oluvchi veb-tizim.",
        tech: ["React", "FastAPI", "LangChain", "ChromaDB"],
        link: "https://github.com/sardor/doc-analyzer",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop"
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
  },
  {
    id: "4",
    name: "Jasur Bekzodov",
    profession: "Backend Developer (Node.js & Python)",
    category: "Backend",
    experience: 4,
    age: 27,
    location: "Buxoro",
    hourlyRate: 22,
    monthlyRate: 3400,
    shortBio: "Ma'lumotlar bazasini loyihalash, mikroxizmatlar va API integratsiyasi bo'yicha mutaxassis.",
    aboutMe: "Assalomu alaykum. Men 4 yildan beri backend dasturchi sifatda ishlab kelmoqdaman. Node.js (NestJS) va Python (Django/FastAPI) yordamida tez va xavfsiz backend tizimlarini quraman. Kod tozaligi (Clean Code) va SOLID prinsiplariga qat'iy amal qilaman.",
    technologies: ["Node.js", "NestJS", "Python", "Django", "PostgreSQL", "Redis", "Docker", "RabbitMQ"],
    skills: ["Microservices", "DB Architect", "Redis Caching", "RESTful API", "GraphQL", "Linux Admin"],
    languages: ["O'zbekcha (Ona tili)", "Ruscha (Yaxshi)", "Inglizcha (Erkin)"],
    education: [
      {
        institution: "Tashkent Inha Universiteti",
        degree: "Kompyuter muhandisligi, Bakalavr",
        period: "2017 - 2021"
      }
    ],
    certificates: [
      { name: "Node.js Developer (Intermediate)", issuer: "HackerRank", year: "2023" }
    ],
    workExperience: [
      {
        company: "Click.uz",
        companyLink: "#",
        position: "Backend Engineer",
        period: "2022 - 2024",
        description: "To'lovlar tizimi va tashqi integratsiyalar bo'yicha tranzaksiyalarni optimallashtirish."
      }
    ],
    portfolio: [
      {
        title: "Telegram Bot Shop Builder",
        description: "Dasturlash bilmasdan turib, Telegramda internet do'kon yaratish imkonini beruvchi SaaS platformasi backendi.",
        tech: ["NestJS", "MongoDB", "Redis", "Docker"],
        link: "https://github.com/jasur/bot-builder",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        id: "r5",
        author: "Feruzbek Yo'ldoshev",
        company: "Udevs",
        stars: 5,
        text: "Jasur bilan backend yozish jarayoni juda yoqdi. Hujjatlar (Swagger API) shunchalik mukammal ediki, frontendchilarimiz qiynalishmadi.",
        project: "B2B Market Backend"
      }
    ],
    avatar: "/logo-pencil.jpg",
    resumeUrl: "#",
    phone: "+998 94 333 22 11",
    telegram: "jasur_backend",
    email: "jasur.bekzodov@gmail.com",
    github: "https://github.com/jasur",
    linkedin: "https://linkedin.com/in/jasur-back",
    verified: false,
    premium: false,
    status: "offline",
    successRate: 92,
    completedJobs: 14
  },
  {
    id: "5",
    name: "Madina Solihova",
    profession: "Frontend Developer (React / Vue)",
    category: "Frontend",
    experience: 2.5,
    age: 23,
    location: "Farg'ona",
    hourlyRate: 15,
    monthlyRate: 2200,
    shortBio: "Pixel-perfect interfeyslar chizuvchi va ajoyib animatsiyalar yaratuvchi Frontend dasturchi.",
    aboutMe: "Men interfeyslarning chiroyli bo'lishiga juda e'tibor beraman. React, Next.js, Vue va Tailwind CSS yordamida foydalanuvchilar sevib ishlatadigan saytlar yarataman. Figma dizaynlarini 100% o'xshash qilib kodingga ko'chira olaman.",
    technologies: ["React", "Vue.js", "Tailwind CSS", "TypeScript", "Redux Toolkit", "Next.js", "SASS"],
    skills: ["Pixel Perfect Development", "Responsive Layouts", "Web Animations", "Git", "REST Integration"],
    languages: ["O'zbekcha (Ona tili)", "Inglizcha (Erkin, IELTS 7.0)"],
    education: [
      {
        institution: "Farg'ona Politexnika Instituti",
        degree: "Axborot tizimlari, Bakalavr",
        period: "2020 - 2024"
      }
    ],
    certificates: [
      { name: "Frontend Development Path", issuer: "Scrimba", year: "2023" }
    ],
    workExperience: [
      {
        company: "Webstars Agency",
        position: "Junior Frontend Developer",
        period: "2023 - Hozirgi vaqt",
        description: "Biznes saytlar, qo'nish sahifalari (landing page) va veb-saytlar frontendi ustida ishlash."
      }
    ],
    portfolio: [
      {
        title: "Portfolio veb-sayti premium",
        description: "Glassmorfizm uslubida tayyorlangan shaxsiy portfolio veb-sayti.",
        tech: ["React", "Framer Motion", "CSS Modules"],
        link: "https://github.com/madina/my-portfolio",
        image: "https://images.unsplash.com/photo-1541462608141-2ff030a64e43?w=600&auto=format&fit=crop"
      }
    ],
    reviews: [
      {
        id: "r6",
        author: "Komil Karimov",
        company: "Fazo Group",
        stars: 4.8,
        text: "Madina bizning do'kon interfeysini juda tez yakunladi. Mobil moslashuvchanligi ajoyib.",
        project: "Fazo Store Front"
      }
    ],
    avatar: "/logo-pencil.jpg",
    resumeUrl: "#",
    phone: "+998 91 222 33 44",
    telegram: "madina_frontend",
    email: "madina.solihova@dev.uz",
    github: "https://github.com/madina",
    linkedin: "https://linkedin.com/in/madina-front",
    verified: true,
    premium: false,
    status: "online",
    successRate: 97,
    completedJobs: 11
  }
];

export const CATEGORIES = [
  "Frontend", "Backend", "Full Stack", "React", "Vue", "Angular", 
  "Node.js", "Python", "Django", "Laravel", "Flutter", "React Native", 
  "UI UX", "Graphic Designer", "Video Editor", "AI Engineer", 
  "Telegram Bot", "DevOps", "Cyber Security", "Database", "QA", "Project Manager"
];

export const FAQS = [
  {
    question: "Freelancer Hub Uz nima va u qanday ishlaydi?",
    answer: "Bu platforma startap asoschilari va professional frilanserlar o'rtasida ko'prik vazifasini bajaradi. Siz dasturchilar, dizaynerlar va AI mutaxassislarini topishingiz, ularning portfoliosi bilan tanishib, bevosita bog'lanishingiz mumkin."
  },
  {
    question: "To'lovlar qanday amalga oshiriladi?",
    answer: "Platformamiz to'lov tizimiga aralashmaydi. Mijoz va frilanser o'rtasidagi to'lovlar shaxsiy kelishuvga ko'ra (Telegram, telefon orqali) xavfsiz va to'g'ridan-to'g'ri kelishiladi."
  },
  {
    question: "Platforma qanday daromad oladi?",
    answer: "Platforma loyihalar yakunlangandan so'ng kelishilgan komissiya orqali va frilanserlarning premium profillarini joylashtirish orqali daromad topadi."
  },
  {
    question: "Boshlovchi frilanserlar ishtirok eta oladimi?",
    answer: "Ha, yangi boshlagan frilanserlar o'zlarining birinchi 1-2 oylik tajribalarini oshirish maqsadida maxsus loyihalar orqali tajriba orttirish imkoniyatiga ega bo'ladilar."
  }
];

export const REGIONS = ["Barchasi", "Toshkent", "Samarqand", "Buxoro", "Farg'ona", "Namangan", "Andijon", "Xorazm", "Qashqadaryo", "Surxondaryo", "Jizzax", "Sirdaryo", "Navoiy", "Qoraqalpog'iston"];
export const EXPERIENCES = ["Barchasi", "1 yilgacha", "1-3 yil", "3-5 yil", "5 yildan ortiq"];
export const AVAILABILITIES = ["Barchasi", "Band emas", "Band"];
