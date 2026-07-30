import React, { useState, useEffect } from 'react';
import { 
  getFreelancers, addFreelancer, updateFreelancer, deleteFreelancer,
  getRequests, addRequest, updateRequestStatus, deleteRequest,
  getFavorites, toggleFavorite, getVisitorCount, incrementVisitorCount,
  getAppState, updateAppState,
  getPortfolioProjects, addPortfolioProject, updatePortfolioProject, deletePortfolioProject,
  getAppStateSync, getRequestsSync, getFreelancersSync, getPortfolioProjectsSync
} from './utils/storage';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchFilters from './components/SearchFilters';
import FreelancerCard from './components/FreelancerCard';
import ProfileModal from './components/ProfileModal';
import StartupRequestForm from './components/StartupRequestForm';
import AdminDashboard from './components/AdminDashboard';
import KimYaratadiModal from './components/KimYaratadiModal';
import ProjectOrderChat from './components/ProjectOrderChat';
import PortfolioSection from './components/PortfolioSection';
import { FAQS } from './data/mockData';
import { 
  Heart, ShieldAlert, CheckCircle, Search, HelpCircle, Star, MessageSquare, 
  MapPin, Send, Mail, Phone, ChevronDown, Award, Globe, HeartCrack, X, Rocket, Sparkles
} from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { t, lang } = useLanguage();
  // Synchronous initial state from localStorage (0ms instant restore on refresh)
  const initialAppState = getAppStateSync();
  const [isAdmin, setIsAdmin] = useState(initialAppState.isAdmin || false);
  const [view, setView] = useState(initialAppState.activeView || 'home');
  const [portfolioProjects, setPortfolioProjects] = useState(getPortfolioProjectsSync);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showKimYaratadiModal, setShowKimYaratadiModal] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [selectedCreatorForRequest, setSelectedCreatorForRequest] = useState(null);
  const [requestFormType, setRequestFormType] = useState({
    title: "Startap qurish & Buyurtma berish",
    subtitle: "Ismingiz va loyiha ma'lumotlarini qoldiring. Loyiha admin sahifasiga yuboriladi."
  });

  // Login inputs
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Data States
  const [freelancers, setFreelancers] = useState(getFreelancersSync);
  const [requests, setRequests] = useState(getRequestsSync);
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

  // Initialize and load data strictly from server API
  useEffect(() => {
    const loadData = async () => {
      const fls = await getFreelancers();
      const reqs = await getRequests();
      const visitors = await getVisitorCount();
      const favs = await getFavorites();
      const state = await getAppState();
      const ports = await getPortfolioProjects();

      setFreelancers(fls);
      setRequests(reqs);
      setVisitorCount(visitors);
      setFavorites(favs);
      setPortfolioProjects(ports);
      setIsAdmin(state.isAdmin);
      if (state.activeView) {
        setView(state.activeView);
      }
    };
    loadData();
  }, []);

  // Portfolio Handlers
  const handleAddPortfolioProject = async (proj) => {
    await addPortfolioProject(proj);
    const updated = await getPortfolioProjects();
    setPortfolioProjects(updated);
    showToast("Yangi qilingan ish portfolio-ga qo'shildi", "success");
  };

  const handleUpdatePortfolioProject = async (proj) => {
    await updatePortfolioProject(proj);
    const updated = await getPortfolioProjects();
    setPortfolioProjects(updated);
    showToast("Portfolio loyihasi yangilandi", "success");
  };

  const handleDeletePortfolioProject = async (id) => {
    await deletePortfolioProject(id);
    const updated = await getPortfolioProjects();
    setPortfolioProjects(updated);
    showToast("Portfolio loyihasi o'chirildi", "info");
  };

  // Sync view changes to server
  const changeView = async (newView) => {
    setView(newView);
    await updateAppState({ activeView: newView });
  };

  // Live Visitor Simulation (Real-time count ticks up)
  useEffect(() => {
    const interval = setInterval(async () => {
      const amount = Math.random() > 0.4 ? 1 : 2;
      const updatedCount = await incrementVisitorCount(amount);
      setVisitorCount(updatedCount);
    }, Math.floor(Math.random() * 5000) + 4000);

    return () => clearInterval(interval);
  }, []);

  // Live Online Users Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
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

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    const cleanLogin = loginInput.trim();
    const cleanPassword = passwordInput.trim();
    
    if (
      (cleanLogin === ADMIN_CREDENTIAL && cleanPassword === ADMIN_CREDENTIAL) ||
      (cleanLogin === 'admin' && cleanPassword === 'admin')
    ) {
      setIsAdmin(true);
      setView('admin');
      await updateAppState({ isAdmin: true, activeView: 'admin' });
      setShowLoginModal(false);
      setLoginInput('');
      setPasswordInput('');
      setLoginError('');
      showToast("Admin tizimiga muvaffaqiyatli kirildi!", "success");
    } else {
      setLoginError("Login yoki parol noto'g'ri. Qayta urinib ko'ring!");
    }
  };

  const handleLogout = async () => {
    setIsAdmin(false);
    setView('home');
    await updateAppState({ isAdmin: false, activeView: 'home' });
    showToast("Tizimdan chiqildi", "info");
  };

  // Favorites Toggle handler on server
  const handleToggleFavorite = async (id) => {
    const updated = await toggleFavorite(id);
    setFavorites(updated);
    if (updated.includes(id)) {
      showToast("Mutaxassis saqlanganlar ro'yxatiga qo'shildi!", "success");
    } else {
      showToast("Mutaxassis saqlanganlardan olib tashlandi", "info");
    }
  };

  // Open forms with specific context
  const handleOpenStartapForm = () => {
    setRequestFormType({
      title: "🚀 Startap Qurish uchun Buyurtma",
      subtitle: "Startapingiz g'oyasini va kerakli yo'nalishlarni kiriting. Jamoa yoki ijrochini birgalikda tanlaymiz."
    });
    setShowRequestModal(true);
  };

  const handleOpenBuyurmaForm = () => {
    setRequestFormType({
      title: "📋 Buyurtma Berish",
      subtitle: "Loyiha bo'yicha texnik topshiriq va aloqa ma'lumotlarini qoldiring."
    });
    setShowRequestModal(true);
  };

  // Request form submit
  const handleRequestSubmit = (newRequestData) => {
    // Close modal and show success toast immediately
    setShowRequestModal(false);
    setSelectedCreatorForRequest(null);
    showToast("So'rovingiz qabul qilindi. Tez orada admin siz bilan bog'lanadi!", "success");

    // Perform database saving and updates in the background
    addRequest(newRequestData)
      .then(() => getRequests())
      .then(updated => setRequests(updated))
      .catch(err => console.error("Error saving request in background:", err));
  };

  // Admin Action Handlers
  const handleAddFreelancer = async (fl) => {
    await addFreelancer(fl);
    const updated = await getFreelancers();
    setFreelancers(updated);
    showToast(fl.hidden ? "Yangi yashirin foydalanuvchi qo'shildi ('Kim Yaratadi'da ko'rinadi)" : "Yangi ommaviy frilanser qo'shildi", "success");
  };

  const handleUpdateFreelancer = async (fl) => {
    await updateFreelancer(fl);
    const updated = await getFreelancers();
    setFreelancers(updated);
    showToast("Foydalanuvchi profili va ko'rinish rejimi yangilandi", "success");
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

  // Filter & Sort Logic for Homepage (HIDE hidden users from regular main list)
  const getFilteredFreelancers = () => {
    // Hidden users added by admin are NOT shown on main public list by default
    let list = freelancers.filter(f => !f.hidden);

    // Category Filter
    if (selectedCategory !== 'Barchasi') {
      list = list.filter(f => 
        f.category === selectedCategory || 
        f.profession.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (f.technologies && f.technologies.some(t => t.toLowerCase() === selectedCategory.toLowerCase()))
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
        (f.shortBio && f.shortBio.toLowerCase().includes(q)) ||
        (f.technologies && f.technologies.some(t => t.toLowerCase().includes(q)))
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
        onViewChat={() => changeView('chat')}
        onHomeClick={() => changeView('home')}
        onPortfolioClick={() => changeView('portfolio')}
        onRequestClick={handleOpenBuyurmaForm}
        onStartapClick={handleOpenStartapForm}
        onKimYaratadiClick={() => setShowKimYaratadiModal(true)}
        onDashboardClick={() => changeView('admin')}
        currentView={view}
      />

      <main style={{ flex: 1 }}>
        <div className="container">
          {/* VIEW: HOME */}
          {view === 'home' && (
            <>
              {/* HERO COMPONENT */}
              <Hero 
                onStartapClick={() => changeView('chat')}
                onBuyurmaClick={() => changeView('chat')}
                onKimYaratadiClick={() => setShowKimYaratadiModal(true)}
              />
            </>
          )}

          {/* VIEW: PORTFOLIO / QILINGAN ISHLAR */}
          {view === 'portfolio' && (
            <PortfolioSection 
              projects={portfolioProjects}
              onOrderClick={() => changeView('chat')}
            />
          )}

          {/* VIEW: PROJECT ORDER CHAT */}
          {view === 'chat' && (
            <ProjectOrderChat 
              onSubmitOrder={(orderData) => {
                showToast("Loyiha buyurtmangiz Telegram botga yuborildi!", "success");
                addRequest(orderData)
                  .then(newReq => {
                    if (newReq) {
                      setRequests(prev => [newReq, ...prev]);
                    }
                  })
                  .catch(err => console.error("Error in background order submit:", err));
                return Promise.resolve();
              }}
            />
          )}

          {/* VIEW: ADMIN PANEL */}
          {view === 'admin' && isAdmin && (
            <AdminDashboard
              freelancers={freelancers}
              requests={requests}
              onlineCount={onlineCount}
              portfolioProjects={portfolioProjects}
              onAddFreelancer={handleAddFreelancer}
              onUpdateFreelancer={handleUpdateFreelancer}
              onDeleteFreelancer={handleDeleteFreelancer}
              onUpdateRequestStatus={handleUpdateRequestStatus}
              onDeleteRequest={handleDeleteRequest}
              onAddPortfolioProject={handleAddPortfolioProject}
              onUpdatePortfolioProject={handleUpdatePortfolioProject}
              onDeletePortfolioProject={handleDeletePortfolioProject}
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
                CREATOR.COM
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {t('footerDesc')}
              </p>
            </div>

            <div>
              <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '1rem' }}>{t('navHeader')}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); changeView('home'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">{t('home')}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); changeView('portfolio'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">{t('portfolio')}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); changeView('chat'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">{t('order')}</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '1rem' }}>{t('legalHeader')}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert(t('privacy')); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">{t('privacy')}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert(t('terms')); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">{t('terms')}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert(t('commission')); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }} className="footer-link">{t('commission')}</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '1rem' }}>{t('contactHeader')}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <li><span style={{ color: 'var(--text-secondary)' }}>Telegram: @creator_com</span></li>
                <li><span style={{ color: 'var(--text-secondary)' }}>Instagram: @creator_com</span></li>
                <li><span style={{ color: 'var(--text-secondary)' }}>LinkedIn: Creator.com</span></li>
                <li><span style={{ color: 'var(--text-secondary)' }}>Support: +998 94 731 95 45</span></li>
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
            <span>&copy; {new Date().getFullYear()} {t('copyright')}</span>
            <span>Created by Creator.com Engineering</span>
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

      {/* MODAL: STARTUP REQUEST FORM / BUYURTMA FORM */}
      {showRequestModal && (
        <StartupRequestForm
          formTitle={requestFormType.title}
          formSubtitle={requestFormType.subtitle}
          selectedCreator={selectedCreatorForRequest}
          onOpenKimYaratadi={() => {
            setShowRequestModal(false);
            setShowKimYaratadiModal(true);
          }}
          onClose={() => {
            setShowRequestModal(false);
            setSelectedCreatorForRequest(null);
          }}
          onSubmitSuccess={handleRequestSubmit}
        />
      )}

      {/* MODAL: KIM YARATADI? (SHOW ALL CREATORS / HIDDEN USERS) */}
      {showKimYaratadiModal && (
        <KimYaratadiModal
          freelancers={freelancers}
          onClose={() => setShowKimYaratadiModal(false)}
          onViewProfile={(creator) => {
            setSelectedFreelancer(creator);
          }}
          onSelectCreator={(creator) => {
            setSelectedCreatorForRequest(creator);
            setShowKimYaratadiModal(false);
            setShowRequestModal(true);
            showToast(`${creator.name} loyihaga ijrochi sifatida tanlandi!`, 'success');
          }}
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
            setSelectedCreatorForRequest(selectedFreelancer);
            setSelectedFreelancer(null);
            setShowKimYaratadiModal(false);
            setShowRequestModal(true);
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
        @media (max-width: 768px) {
          footer {
            display: none !important;
          }
          main {
            padding-bottom: 90px !important;
          }
        }
      `}</style>
    </div>
  );
}
