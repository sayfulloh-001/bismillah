import React, { useState, useEffect } from 'react';
import { 
  getFreelancers, addFreelancer, updateFreelancer, deleteFreelancer,
  getRequests, addRequest, updateRequestStatus, deleteRequest,
  getFavorites, toggleFavorite, isFavorite, getVisitorCount, incrementVisitorCount
} from './utils/storage';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchFilters from './components/SearchFilters';
import FreelancerCard from './components/FreelancerCard';
import ProfileModal from './components/ProfileModal';
import StartupRequestForm from './components/StartupRequestForm';
import AdminDashboard from './components/AdminDashboard';
import { FAQS } from './data/mockData';
import { 
  Heart, ShieldAlert, CheckCircle, Search, HelpCircle, Star, MessageSquare, 
  MapPin, Send, Mail, Phone, ChevronDown, Award, Globe, HeartCrack, X 
} from 'lucide-react';

export default function App() {
  // Views: 'home', 'favorites', 'admin'
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('fl_hub_is_admin') === 'true';
  });
  const [view, setView] = useState(() => {
    return sessionStorage.getItem('fl_hub_is_admin') === 'true' ? 'admin' : 'home';
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  // Login inputs
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Data States
  const [freelancers, setFreelancers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [visitorCount, setVisitorCount] = useState("1428");
  const [onlineCount, setOnlineCount] = useState(12);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [selectedRegion, setSelectedRegion] = useState('Barchasi');
  const [selectedExperience, setSelectedExperience] = useState('Barchasi');
  const [selectedAvailability, setSelectedAvailability] = useState('Barchasi');
  const [sortBy, setSortBy] = useState('default');

  // FAQ expanded indices
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Initialize and load data
  useEffect(() => {
    const loadData = async () => {
      const fls = await getFreelancers();
      const reqs = await getRequests();
      const visitors = await getVisitorCount();
      setFreelancers(fls);
      setRequests(reqs);
      setVisitorCount(visitors);
    };
    loadData();
    setFavorites(getFavorites());
  }, []);

  // Live Visitor Simulation (Real-time count ticks up)
  useEffect(() => {
    const interval = setInterval(async () => {
      const amount = Math.random() > 0.4 ? 1 : 2;
      const updatedCount = await incrementVisitorCount(amount);
      setVisitorCount(updatedCount);
    }, Math.floor(Math.random() * 5000) + 4000); // random interval between 4s and 9s

    return () => clearInterval(interval);
  }, []);

  // Live Online Users Simulation (fluctuates dynamically)
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
        let next = prev + change;
        if (next < 5) next = 5;
        if (next > 23) next = 23;
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Toast notifier helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Admin Credentials
  const ADMIN_CREDENTIAL = "12345678901234567890123456789012345678901234567890qwertyuiopqwertyuiopplplplplplpl";

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    const cleanLogin = loginInput.trim();
    const cleanPassword = passwordInput.trim();
    
    if (
      (cleanLogin === ADMIN_CREDENTIAL && cleanPassword === ADMIN_CREDENTIAL) ||
      (cleanLogin === 'admin' && cleanPassword === 'admin')
    ) {
      setIsAdmin(true);
      sessionStorage.setItem('fl_hub_is_admin', 'true');
      setView('admin');
      setShowLoginModal(false);
      setLoginInput('');
      setPasswordInput('');
      setLoginError('');
      showToast("Admin tizimiga muvaffaqiyatli kirildi!", "success");
    } else {
      setLoginError("Login yoki parol noto'g'ri. Qayta urinib ko'ring!");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('fl_hub_is_admin');
    setView('home');
    showToast("Tizimdan chiqildi", "info");
  };

  // Favorites Toggle handler
  const handleToggleFavorite = (id) => {
    const updated = toggleFavorite(id);
    setFavorites(updated);
    if (updated.includes(id)) {
      showToast("Mutaxassis saqlanganlar ro'yxatiga qo'shildi!", "success");
    } else {
      showToast("Mutaxassis saqlanganlardan olib tashlandi", "info");
    }
  };

  // Request form submit
  const handleRequestSubmit = async (newRequestData) => {
    await addRequest(newRequestData);
    const updated = await getRequests();
    setRequests(updated);
    setShowRequestModal(false);
    showToast("So'rovingiz qabul qilindi. Tez orada admin siz bilan bog'lanadi!", "success");
  };

  // Admin Action Handlers
  const handleAddFreelancer = async (fl) => {
    await addFreelancer(fl);
    const updated = await getFreelancers();
    setFreelancers(updated);
    showToast("Yangi frilanser profili muvaffaqiyatli qo'shildi", "success");
  };

  const handleUpdateFreelancer = async (fl) => {
    await updateFreelancer(fl);
    const updated = await getFreelancers();
    setFreelancers(updated);
    showToast("Frilanser profili yangilandi", "success");
  };

  const handleDeleteFreelancer = async (id) => {
    await deleteFreelancer(id);
    const updated = await getFreelancers();
    setFreelancers(updated);
    showToast("Frilanser profili o'chirildi", "info");
  };

  const handleUpdateRequestStatus = async (id, status) => {
    await updateRequestStatus(id, status);
    const updated = await getRequests();
    setRequests(updated);
    showToast(`Loyiha so'rovi holati yangilandi: ${status}`, "success");
  };

  const handleDeleteRequest = async (id) => {
    await deleteRequest(id);
    const updated = await getRequests();
    setRequests(updated);
    showToast("Loyiha so'rovi o'chirildi", "info");
  };

  // Filter & Sort Logic
  const getFilteredFreelancers = () => {
    let list = [...freelancers];

    // Category Filter
    if (selectedCategory !== 'Barchasi') {
      list = list.filter(f => 
        f.category === selectedCategory || 
        f.profession.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        f.technologies.some(t => t.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    // Region Filter
    if (selectedRegion !== 'Barchasi') {
      list = list.filter(f => f.location.toLowerCase() === selectedRegion.toLowerCase());
    }

    // Experience Filter
    if (selectedExperience !== 'Barchasi') {
      list = list.filter(f => {
        const exp = f.experience;
        if (selectedExperience === "1 yilgacha") return exp <= 1;
        if (selectedExperience === "1-3 yil") return exp > 1 && exp <= 3;
        if (selectedExperience === "3-5 yil") return exp > 3 && exp <= 5;
        if (selectedExperience === "5 yildan ortiq") return exp > 5;
        return true;
      });
    }

    // Availability Filter
    if (selectedAvailability !== 'Barchasi') {
      list = list.filter(f => {
        if (selectedAvailability === "Band emas") return f.status === 'online';
        if (selectedAvailability === "Band") return f.status === 'offline';
        return true;
      });
    }

    // Search Query (Name, Techs, Short Bio)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(f => 
        f.name.toLowerCase().includes(q) ||
        f.profession.toLowerCase().includes(q) ||
        f.shortBio.toLowerCase().includes(q) ||
        f.technologies.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sortBy === 'experience') {
      list.sort((a, b) => b.experience - a.experience);
    } else if (sortBy === 'success-rate') {
      list.sort((a, b) => b.successRate - a.successRate);
    }

    return list;
  };

  const filteredFreelancers = getFilteredFreelancers();

  // Testimonials list
  const testimonials = [
    {
      name: "Akmal Fayziyev",
      company: "Udevs Asoschisi",
      quote: "Biz startapimiz uchun Frontend dasturchini aynan shu yerdan topdik. 2 oy davomida loyihamizni ajoyib holatga keltirib berdi.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      project: "Udevs CRM"
    },
    {
      name: "Shahzoda Toshpo'latova",
      company: "Lalaku Asoschisi",
      quote: "UI/UX dizayner profili orqali qidiruv berib Dilnozani topdik. Dizayn tizimi mutlaqo yangicha va premium darajada chizildi.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      project: "Lalaku Landing Page"
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER COMPONENT */}
      <Header
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onLoginClick={() => setShowLoginModal(true)}
        favoritesCount={favorites.length}
        onViewFavorites={() => setView('favorites')}
        onHomeClick={() => setView('home')}
        onRequestClick={() => setShowRequestModal(true)}
        onDashboardClick={() => setView('admin')}
        currentView={view}
      />

      <main style={{ flex: 1 }}>
        <div className="container">
          
          {/* VIEW: HOME */}
          {view === 'home' && (
            <>
              {/* HERO COMPONENT */}
              <Hero 
                onBrowseClick={() => {
                  const filterSection = document.getElementById('filters-section');
                  if (filterSection) filterSection.scrollIntoView({ behavior: 'smooth' });
                }} 
                onContactAdminClick={() => setShowRequestModal(true)}
              />

              {/* FILTERS AND SEARCH SECTION */}
              <div id="filters-section" style={{ scrollMarginTop: '2rem' }}>
                <SearchFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                  selectedExperience={selectedExperience}
                  setSelectedExperience={setSelectedExperience}
                  selectedAvailability={selectedAvailability}
                  setSelectedAvailability={setSelectedAvailability}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>

              {/* FREELANCER LIST GRID */}
              <div style={{ margin: '3rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                    {selectedCategory === 'Barchasi' ? "Barcha frilanserlar" : `${selectedCategory} mutaxassislari`}
                    <span style={{ marginLeft: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>
                      (Topildi: {filteredFreelancers.length} ta)
                    </span>
                  </h2>
                </div>

                {filteredFreelancers.length === 0 ? (
                  <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <Search size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Hech narsa topilmadi</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Qidiruv so'rovi yoki filtrlarni o'zgartirib ko'ring.</p>
                  </div>
                ) : (
                  <div className="freelancer-grid">
                    {filteredFreelancers.map(fl => (
                      <FreelancerCard
                        key={fl.id}
                        freelancer={fl}
                        isFavorite={favorites.includes(fl.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onCardClick={(flObj) => setSelectedFreelancer(flObj)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* XIZMATLAR KIMLAR UCHUN SECTION */}
              <section style={{ margin: '6rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Loyihalarimiz va xizmatlar kimlar uchun?
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>
                    Freelancer Hub platformasi o'z loyihalarini professional va arzon narxlarda amalga oshirmoqchi bo'lgan barcha tadbirkorlar uchun mo'ljallangan.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} className="target-audience-grid">
                  
                  {/* Card 1: Startaplar */}
                  <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'rgba(10, 15, 30, 0.45)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Startaplar uchun</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Yangi g'oyalarni tezkorlik bilan MVP prototipiga aylantiring, texnik jamoani yollang va bozorni zabt eting.
                    </p>
                  </div>

                  {/* Card 2: Kichik Biznes */}
                  <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'rgba(10, 15, 30, 0.45)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-green)' }}>
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Kichik biznes uchun</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      CRM tizimlari, shaxsiy veb-saytlar va Telegram botlar yaratish orqali biznesingizni avtomatlashtiring.
                    </p>
                  </div>

                  {/* Card 3: AI va IT Tizimlar */}
                  <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'rgba(10, 15, 30, 0.45)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px' }}>
                    <div style={{ background: 'rgba(168, 85, 247, 0.1)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-purple)' }}>
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>AI & IT Loyihalar uchun</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Neyrotarmoqlar integratsiyasi, AI startaplar va murakkab ERP platformalari uchun mutaxassislar toping.
                    </p>
                  </div>

                  {/* Card 4: Boshlovchilar */}
                  <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'rgba(10, 15, 30, 0.45)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px' }}>
                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-orange)' }}>
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Boshlovchi frilanserlar</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Ish boshlagan mutaxassislar birinchi 1-2 oy davomida real loyihalar ustida ishlab, tajriba orttirish imkoniyatiga ega.
                    </p>
                  </div>

                </div>
              </section>

              {/* TESTIMONIALS SECTION */}
              <section style={{ margin: '5rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Startap asoschilari fikrlari</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>Muvaffaqiyatli loyihalar va ishonchli hamkorlik kafolati</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="testimonials-grid">
                  {testimonials.map((t, idx) => (
                    <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2rem', background: 'rgba(10, 15, 30, 0.45)' }}>
                      <div style={{ display: 'flex', gap: '0.1rem' }}>
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="var(--accent-orange)" color="var(--accent-orange)" />)}
                      </div>
                      <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
                        "{t.quote}"
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                        <img src={t.avatar} alt={t.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{t.name}</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)' }}>{t.company} &bull; {t.project}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ SECTION */}
              <section style={{ margin: '5rem 0 7rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Ko'p beriladigan savollar</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>Platformadan foydalanish bo'yicha tezkor javoblar</p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {FAQS.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className="glass-card" 
                      style={{ 
                        padding: '1.25rem 1.75rem', 
                        borderRadius: '20px', 
                        cursor: 'pointer',
                        background: 'rgba(10, 15, 30, 0.45)',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{faq.question}</h4>
                        <ChevronDown 
                          size={18} 
                          style={{ 
                            transform: expandedFaq === idx ? 'rotate(180deg)' : 'none',
                            transition: 'var(--transition-smooth)'
                          }} 
                        />
                      </div>
                      
                      {expandedFaq === idx && (
                        <p style={{ 
                          marginTop: '1rem', 
                          fontSize: '0.9rem', 
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          animation: 'fadeIn 0.3s ease-out'
                        }}>
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* VIEW: FAVORITES */}
          {view === 'favorites' && (
            <div style={{ padding: '3rem 0' }} className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Heart size={24} fill="var(--accent-purple)" color="var(--accent-purple)" />
                  Saqlangan mutaxassislar
                </h2>
                <button onClick={() => setView('home')} className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem' }}>
                  Barchasiga qaytish
                </button>
              </div>

              {favorites.length === 0 ? (
                <div className="glass-panel" style={{ padding: '5rem 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                  <HeartCrack size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Saqlanganlar bo'sh</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Sizga ma'qul kelgan frilanserlarni keyinroq ko'rish uchun yurakcha belgisini bosing.
                  </p>
                  <button onClick={() => setView('home')} className="btn btn-primary">
                    Frilanserlarni qidirish
                  </button>
                </div>
              ) : (
                <div className="freelancer-grid">
                  {freelancers
                    .filter(f => favorites.includes(f.id))
                    .map(fl => (
                      <FreelancerCard
                        key={fl.id}
                        freelancer={fl}
                        isFavorite={true}
                        onToggleFavorite={handleToggleFavorite}
                        onCardClick={(flObj) => setSelectedFreelancer(flObj)}
                      />
                    ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW: ADMIN PANEL */}
          {view === 'admin' && isAdmin && (
            <AdminDashboard
              freelancers={freelancers}
              requests={requests}
              onlineCount={onlineCount}
              onAddFreelancer={handleAddFreelancer}
              onUpdateFreelancer={handleUpdateFreelancer}
              onDeleteFreelancer={handleDeleteFreelancer}
              onUpdateRequestStatus={handleUpdateRequestStatus}
              onDeleteRequest={handleDeleteRequest}
            />
          )}

        </div>
      </main>

      {/* FOOTER */}
      <footer style={{
        background: 'rgba(5, 8, 22, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '4rem 0 2rem 0',
        marginTop: 'auto'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '3rem'
          }} className="footer-grid">
            
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem',
                letterSpacing: '1px'
              }}>
                FREELANCER HUB UZ
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                O'zbekistondagi startap loyihalari va professional frilanserlarni tezkor, xavfsiz va to'g'ridan-to'g'ri bog'lovchi ekotizim.
              </p>
            </div>

            <div>
              <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '1rem' }}>Suhbatlar</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">Bosh sahifa</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setView('favorites'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">Saqlanganlar</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setShowRequestModal(true); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">Loyiha topshirish</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '1rem' }}>Huquqiy</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Maxfiylik siyosati: Barcha foydalanuvchi ma'lumotlari faqat lokal brauzer xotirasida saqlanadi."); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">Maxfiylik siyosati</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Foydalanish shartlari: Loyihalar to'lovlari kelishuv asosida shaxsiy tarzda amalga oshiriladi."); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">Foydalanish shartlari</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Komissiya qoidalari: Bajarilgan loyihalar byudjetidan 10% komissiya yig'iladi."); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">Komissiya</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '1rem' }}>Bog'lanish</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <li><span style={{ color: 'var(--text-secondary)' }}>Telegram: @freelancehub_uz</span></li>
                <li><span style={{ color: 'var(--text-secondary)' }}>Instagram: @freelancehub_uz</span></li>
                <li><span style={{ color: 'var(--text-secondary)' }}>LinkedIn: Freelancer Hub Uz</span></li>
                <li><span style={{ color: 'var(--text-secondary)' }}>Qo'llab-quvvatlash: +998 90 999 99 99</span></li>
              </ul>
            </div>

          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <span>&copy; {new Date().getFullYear()} Freelancer Hub Uz. Barcha huquqlar himoyalangan.</span>
            <span>Created by Antigravity AI Codebase</span>
          </div>
        </div>
      </footer>

      {/* MODAL: ADMIN LOGIN */}
      {showLoginModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(5, 8, 22, 0.85)',
          backdropFilter: 'blur(16px)',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div className="glass-panel" style={{
            width: '90%',
            maxWidth: '450px',
            padding: '2.5rem',
            background: 'rgba(10, 15, 30, 0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            position: 'relative'
          }}>
            <button 
              onClick={() => { setShowLoginModal(false); setLoginError(''); }}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin tizimiga kirish</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Tizim boshqaruviga ruxsat olish uchun hisob ma'lumotlarini kiriting.</p>
            </div>

            <form onSubmit={handleAdminLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label>Admin Login *</label>
                <input
                  type="text"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="Admin Login raqami/kodi..."
                  className="input-dark"
                  required
                />
              </div>

              <div className="form-group">
                <label>Admin Parol *</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Admin parolini kiriting..."
                  className="input-dark"
                  required
                />
              </div>

              {loginError && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: 'var(--accent-red)',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <ShieldAlert size={16} />
                  <span>{loginError}</span>
                </div>
              )}


              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}>
                Kirish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: STARTUP REQUEST FORM */}
      {showRequestModal && (
        <StartupRequestForm
          onClose={() => setShowRequestModal(false)}
          onSubmitSuccess={handleRequestSubmit}
        />
      )}

      {/* MODAL: PROFILE DETAILS VIEW */}
      {selectedFreelancer && (
        <ProfileModal
          freelancer={selectedFreelancer}
          onClose={() => setSelectedFreelancer(null)}
          isFav={favorites.includes(selectedFreelancer.id)}
          onFavoriteToggle={() => handleToggleFavorite(selectedFreelancer.id)}
          onHireClick={() => {
            setSelectedFreelancer(null);
            setShowRequestModal(true);
            setSearchQuery(selectedFreelancer.name);
          }}
        />
      )}

      {/* TOAST CONTAINER */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast" style={{
            borderColor: toast.type === 'error' ? 'var(--accent-red)' : toast.type === 'info' ? 'var(--accent-blue)' : 'var(--accent-purple)'
          }}>
            <CheckCircle size={16} color={toast.type === 'error' ? 'var(--accent-red)' : toast.type === 'info' ? 'var(--accent-blue)' : 'var(--accent-purple)'} />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      <style>{`
        .testimonials-grid {
          grid-template-columns: 1fr 1fr;
        }
        .footer-grid {
          grid-template-columns: 2fr 1fr 1fr 1fr;
        }
        .footer-link {
          transition: var(--transition-smooth);
        }
        .footer-link:hover {
          color: #fff !important;
          padding-left: 4px;
        }
        @media (max-width: 900px) {
          .testimonials-grid, .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
