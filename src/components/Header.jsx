import React, { useState } from 'react';
import { ShieldCheck, Heart, User, LogOut, MessageSquarePlus, Menu, X, Rocket, Sparkles, Users } from 'lucide-react';

export default function Header({ 
  isAdmin, 
  onLogout, 
  onLoginClick, 
  favoritesCount, 
  onViewFavorites, 
  onHomeClick, 
  onRequestClick, 
  onStartapClick,
  onKimYaratadiClick,
  onDashboardClick,
  currentView
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky-nav glass-panel" style={{
      position: 'sticky',
      top: '1rem',
      zIndex: 100,
      margin: '1rem auto',
      width: '90%',
      maxWidth: '1200px',
      borderRadius: '20px',
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(5, 8, 22, 0.75)'
    }}>
      <div 
        onClick={onHomeClick} 
        style={{ 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.65rem' 
        }}
      >
        <img 
          src="/logo-lightning.png" 
          alt="Freelancer Hub Uz Logo" 
          style={{ 
            height: '36px', 
            width: 'auto',
            filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.45))'
          }} 
        />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '1.4rem',
          background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '1px'
        }}>
          FREELANCER HUB <span style={{ color: '#fff', WebkitTextFillColor: '#fff', fontSize: '0.9rem', verticalAlign: 'middle', border: '1px solid #a855f7', padding: '1px 5px', borderRadius: '4px', marginLeft: '5px' }}>UZ</span>
        </span>
      </div>

      {/* Desktop Menu */}
      <nav className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span 
          onClick={onHomeClick}
          style={{ 
            color: currentView === 'home' ? '#fff' : 'var(--text-secondary)',
            fontWeight: currentView === 'home' ? '600' : '400',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-link"
        >
          Bosh sahifa
        </span>

        {/* Startap qurish */}
        <span 
          onClick={onStartapClick || onRequestClick}
          style={{ 
            color: 'var(--accent-purple)',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-link"
        >
          <Rocket size={16} color="var(--accent-purple)" />
          Startap qurish
        </span>

        {/* Buyurtma berish */}
        <span 
          onClick={onRequestClick}
          style={{ 
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-link"
        >
          <MessageSquarePlus size={16} />
          Buyurtma berish
        </span>

        {/* Kim Yaratadi? */}
        <span 
          onClick={onKimYaratadiClick}
          style={{ 
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            color: '#fff',
            fontWeight: '600',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.25)',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-link-special"
        >
          <Sparkles size={15} color="#c084fc" />
          Kim Yaratadi?
        </span>

        {/* Saqlanganlar */}
        <span 
          onClick={onViewFavorites}
          style={{ 
            color: currentView === 'favorites' ? '#fff' : 'var(--text-secondary)',
            fontWeight: currentView === 'favorites' ? '600' : '400',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-link"
        >
          <Heart size={16} fill={favoritesCount > 0 ? "var(--accent-purple)" : "transparent"} color={favoritesCount > 0 ? "var(--accent-purple)" : "currentColor"} />
          Saqlanganlar
          {favoritesCount > 0 && (
            <span style={{
              background: 'var(--accent-purple)',
              color: '#fff',
              fontSize: '0.75rem',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {favoritesCount}
            </span>
          )}
        </span>

        {isAdmin && (
          <span 
            onClick={onDashboardClick}
            style={{ 
              color: currentView === 'admin' ? '#fff' : 'var(--accent-blue)',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'var(--transition-smooth)'
            }}
            className="nav-link"
          >
            <ShieldCheck size={16} />
            Admin Panel
          </span>
        )}
      </nav>

      {/* Buttons */}
      <div className="desktop-buttons" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isAdmin ? (
          <button onClick={onLogout} className="btn btn-danger" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
            <LogOut size={16} />
            Chiqish
          </button>
        ) : (
          <button onClick={onLoginClick} className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
            <User size={16} />
            Admin Kirish
          </button>
        )}
      </div>

      {/* Mobile Toggle */}
      <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          margin: '0.5rem 0 0 0',
          background: 'rgba(5, 8, 22, 0.95)',
          borderRadius: '16px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
        }}>
          <span onClick={() => { onHomeClick(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer' }}>Bosh sahifa</span>
          <span onClick={() => { (onStartapClick || onRequestClick)(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', color: 'var(--accent-purple)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Rocket size={16} /> Startap qurish
          </span>
          <span onClick={() => { onRequestClick(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquarePlus size={16} /> Buyurtma berish
          </span>
          <span onClick={() => { onKimYaratadiClick(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', color: '#c084fc', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} /> Kim Yaratadi?
          </span>
          <span onClick={() => { onViewFavorites(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={16} /> Saqlanganlar ({favoritesCount})
          </span>
          {isAdmin && (
            <span onClick={() => { onDashboardClick(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} /> Admin Panel
            </span>
          )}
          <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          {isAdmin ? (
            <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="btn btn-danger" style={{ width: '100%' }}>
              <LogOut size={16} /> Chiqish
            </button>
          ) : (
            <button onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} className="btn btn-secondary" style={{ width: '100%' }}>
              <User size={16} /> Admin Kirish
            </button>
          )}
        </div>
      )}

      {/* Styled JSX to inject responsive styles */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-menu, .desktop-buttons {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        .nav-link:hover {
          color: #fff !important;
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
        }
        .nav-link-special:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.5) !important;
        }
      `}</style>
    </header>
  );
}
