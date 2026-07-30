import React, { useState } from 'react';
import { ShieldCheck, MessageSquare, User, LogOut, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header({ 
  isAdmin, 
  onLogout, 
  onLoginClick, 
  onViewChat, 
  onHomeClick, 
  onPortfolioClick,
  onDashboardClick,
  currentView
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { lang, changeLang, toggleLang, t } = useLanguage();

  const langLabels = {
    uz: { flag: '🇺🇿', name: 'UZ' },
    ru: { flag: '🇷🇺', name: 'RU' },
    en: { flag: '🇬🇧', name: 'EN' }
  };

  return (
    <header className="main-header sticky-nav glass-panel" style={{
      position: 'sticky',
      top: '0.75rem',
      zIndex: 100,
      margin: '0.75rem auto',
      width: '92%',
      maxWidth: '1100px',
      borderRadius: '24px',
      padding: '0.65rem 1.6rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      background: 'rgba(6, 6, 12, 0.94)',
      backdropFilter: 'blur(24px)',
      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(168, 85, 247, 0.1)'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={onHomeClick} 
        style={{ 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.6rem',
          flexShrink: 0 
        }}
      >
        <img 
          src="/logo-pencil.jpg?v=2" 
          alt="Creator.com Logo" 
          style={{ 
            height: '34px', 
            width: 'auto',
            borderRadius: '8px',
            filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.6))'
          }} 
        />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '1.25rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 50%, #38bdf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap'
        }}>
          CREATOR<span style={{ color: '#38bdf8', WebkitTextFillColor: '#38bdf8', fontSize: '0.8rem', verticalAlign: 'middle', border: '1px solid #38bdf8', padding: '1px 5px', borderRadius: '4px', marginLeft: '4px', fontWeight: 700 }}>.COM</span>
        </span>
      </div>

      {/* Desktop Menu */}
      <nav className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'nowrap' }}>
        <span 
          onClick={onHomeClick}
          style={{ 
            color: currentView === 'home' ? '#fff' : 'var(--text-secondary)',
            fontWeight: currentView === 'home' ? '700' : '500',
            cursor: 'pointer',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-link"
        >
          {t('home')}
        </span>

        {/* Qilingan ishlar */}
        <span 
          onClick={onPortfolioClick}
          style={{ 
            color: currentView === 'portfolio' ? '#fff' : 'var(--text-secondary)',
            fontWeight: currentView === 'portfolio' ? '700' : '500',
            cursor: 'pointer',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-link"
        >
          {t('portfolio')}
        </span>

        {/* Buyurtma berish */}
        <span 
          onClick={onViewChat}
          style={{ 
            color: currentView === 'chat' ? '#38bdf8' : '#c084fc',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            background: 'rgba(168, 85, 247, 0.1)',
            padding: '0.35rem 0.85rem',
            borderRadius: '12px',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-link-chat"
        >
          <MessageSquare size={16} color={currentView === 'chat' ? '#38bdf8' : '#c084fc'} />
          {t('order')}
        </span>

        {isAdmin && (
          <span 
            onClick={onDashboardClick}
            style={{ 
              color: currentView === 'admin' ? '#fff' : 'var(--accent-blue)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              transition: 'var(--transition-smooth)'
            }}
            className="nav-link"
          >
            <ShieldCheck size={16} />
            {t('admin')}
          </span>
        )}
      </nav>

      {/* Buttons */}
      <div className="desktop-buttons" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        {/* 3-Language Selector Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="btn btn-secondary"
            style={{
              padding: '0.4rem 0.75rem',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              borderColor: 'rgba(56, 189, 248, 0.4)',
              background: 'rgba(56, 189, 248, 0.08)',
              color: '#38bdf8',
              fontWeight: 700
            }}
          >
            <Globe size={15} color="#38bdf8" />
            {langLabels[lang]?.flag} {langLabels[lang]?.name}
            <ChevronDown size={13} style={{ transform: langDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
          </button>

          {langDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '115%',
              right: 0,
              background: 'rgba(10, 14, 28, 0.96)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '14px',
              padding: '0.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
              zIndex: 200,
              minWidth: '120px'
            }}>
              <button
                onClick={() => { changeLang('uz'); setLangDropdownOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.75rem',
                  background: lang === 'uz' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  color: lang === 'uz' ? '#38bdf8' : '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: lang === 'uz' ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>🇺🇿</span> O'zbekcha
              </button>
              <button
                onClick={() => { changeLang('ru'); setLangDropdownOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.75rem',
                  background: lang === 'ru' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  color: lang === 'ru' ? '#38bdf8' : '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: lang === 'ru' ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>🇷🇺</span> Русский
              </button>
              <button
                onClick={() => { changeLang('en'); setLangDropdownOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.75rem',
                  background: lang === 'en' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  color: lang === 'en' ? '#38bdf8' : '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: lang === 'en' ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>🇬🇧</span> English
              </button>
            </div>
          )}
        </div>

        {isAdmin ? (
          <button onClick={onLogout} className="btn btn-danger" style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem' }}>
            <LogOut size={15} />
            {t('logout')}
          </button>
        ) : (
          <button onClick={onLoginClick} className="btn btn-secondary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem' }}>
            <User size={15} />
            {t('login')}
          </button>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer', color: '#fff' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="glass-panel animate-scale-in" style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          right: 0,
          margin: '0.5rem 0 0 0',
          background: 'rgba(8, 8, 12, 0.98)',
          borderRadius: '20px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 45px rgba(0,0,0,0.9)',
          zIndex: 1000
        }}>
          <span onClick={() => { onHomeClick(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600 }}>{t('home')}</span>
          <span onClick={() => { onPortfolioClick(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600 }}>{t('portfolio')}</span>
          <span onClick={() => { onViewChat(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', fontWeight: 700 }}>
            <MessageSquare size={18} /> {t('order')}
          </span>
          {isAdmin && (
            <span onClick={() => { onDashboardClick(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', fontWeight: 700 }}>
              <ShieldCheck size={18} /> {t('admin')}
            </span>
          )}
          <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button 
              onClick={() => { changeLang('uz'); setMobileMenuOpen(false); }}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '0.5rem', justifyContent: 'center', color: lang === 'uz' ? '#38bdf8' : '#fff', borderColor: lang === 'uz' ? '#38bdf8' : 'rgba(255,255,255,0.15)' }}
            >
              🇺🇿 UZ
            </button>
            <button 
              onClick={() => { changeLang('ru'); setMobileMenuOpen(false); }}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '0.5rem', justifyContent: 'center', color: lang === 'ru' ? '#38bdf8' : '#fff', borderColor: lang === 'ru' ? '#38bdf8' : 'rgba(255,255,255,0.15)' }}
            >
              🇷🇺 RU
            </button>
            <button 
              onClick={() => { changeLang('en'); setMobileMenuOpen(false); }}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '0.5rem', justifyContent: 'center', color: lang === 'en' ? '#38bdf8' : '#fff', borderColor: lang === 'en' ? '#38bdf8' : 'rgba(255,255,255,0.15)' }}
            >
              🇬🇧 EN
            </button>
          </div>

          {isAdmin ? (
            <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="btn btn-danger" style={{ width: '100%', padding: '0.65rem' }}>
              <LogOut size={16} /> {t('logout')}
            </button>
          ) : (
            <button onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} className="btn btn-secondary" style={{ width: '100%', padding: '0.65rem' }}>
              <User size={16} /> {t('login')}
            </button>
          )}
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-menu, .desktop-buttons {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        .nav-link:hover {
          color: #fff !important;
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }
        .nav-link-chat:hover {
          background: rgba(168, 85, 247, 0.25) !important;
          border-color: rgba(168, 85, 247, 0.5) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </header>
  );
}
