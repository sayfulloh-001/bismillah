import React, { useState } from 'react';
import { ShieldCheck, Heart, User, LogOut, MessageSquarePlus, Menu, X, Rocket, Sparkles } from 'lucide-react';

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
      top: '0.75rem',
      zIndex: 100,
      margin: '0.75rem auto',
      width: '94%',
      maxWidth: '1240px',
      borderRadius: '24px',
      padding: '0.65rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(6, 6, 9, 0.92)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)'
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
          alt="Freelancer Hub Uz Logo" 
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
          FREELANCER HUB <span style={{ color: '#fff', WebkitTextFillColor: '#fff', fontSize: '0.75rem', verticalAlign: 'middle', border: '1px solid #a855f7', padding: '1px 5px', borderRadius: '4px', marginLeft: '4px' }}>UZ</span>
        </span>
      </div>

      {/* Desktop Menu */}
      <nav className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', flexWrap: 'nowrap' }}>
        <span 
          onClick={onHomeClick}
          style={{ 
            color: currentView === 'home' ? '#fff' : 'var(--text-secondary)',
            fontWeight: currentView === 'home' ? '700' : '500',
            cursor: 'pointer',
            fontSize: '0.88rem',
            whiteSpace: 'nowrap',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-link"
        >
          Bosh sahifa
        </span>

        {/* Startap & Buyurtma berish */}
        <span 
          onClick={onStartapClick || onRequestClick}
          style={{ 
            color: '#c084fc',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.88rem',
            whiteSpace: 'nowrap',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-link"
        >
          <Rocket size={15} color="#c084fc" />
          Startap & Buyurtma berish
        </span>



        {/* Saqlanganlar */}
        <span 
          onClick={onViewFavorites}
          style={{ 
            color: currentView === 'favorites' ? '#fff' : 'var(--text-secondary)',
            fontWeight: currentView === 'favorites' ? '700' : '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.88rem',
            whiteSpace: 'nowrap',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-link"
        >
          <Heart size={15} fill={favoritesCount > 0 ? "var(--accent-purple)" : "transparent"} color={favoritesCount > 0 ? "var(--accent-purple)" : "currentColor"} />
          Saqlanganlar
          {favoritesCount > 0 && (
            <span style={{
              background: 'var(--accent-purple)',
              color: '#fff',
              fontSize: '0.7rem',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              marginLeft: '2px'
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
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.88rem',
              whiteSpace: 'nowrap',
              transition: 'var(--transition-smooth)'
            }}
            className="nav-link"
          >
            <ShieldCheck size={15} />
            Admin Panel
          </span>
        )}
      </nav>

      {/* Buttons */}
      <div className="desktop-buttons" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        {isAdmin ? (
          <button onClick={onLogout} className="btn btn-danger" style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem' }}>
            <LogOut size={15} />
            Chiqish
          </button>
        ) : (
          <button onClick={onLoginClick} className="btn btn-secondary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem' }}>
            <User size={15} />
            Admin Kirish
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
          <span onClick={() => { onHomeClick(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600 }}>Bosh sahifa</span>
          <span onClick={() => { (onStartapClick || onRequestClick)(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', color: '#c084fc', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
            <Rocket size={18} /> Startap & Buyurtma berish
          </span>

          <span onClick={() => { onViewFavorites(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
            <Heart size={18} /> Saqlanganlar ({favoritesCount})
          </span>
          {isAdmin && (
            <span onClick={() => { onDashboardClick(); setMobileMenuOpen(false); }} style={{ cursor: 'pointer', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', fontWeight: 700 }}>
              <ShieldCheck size={18} /> Admin Panel
            </span>
          )}
          <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          {isAdmin ? (
            <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="btn btn-danger" style={{ width: '100%', padding: '0.65rem' }}>
              <LogOut size={16} /> Chiqish
            </button>
          ) : (
            <button onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} className="btn btn-secondary" style={{ width: '100%', padding: '0.65rem' }}>
              <User size={16} /> Admin Kirish
            </button>
          )}
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1120px) {
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
        .nav-link-special:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.6) !important;
        }
      `}</style>
    </header>
  );
}
