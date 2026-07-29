import React from 'react';
import { Heart, MapPin, Briefcase, ShieldCheck, Zap, ArrowRight, Star, Sparkles } from 'lucide-react';

export default function FreelancerCard({ 
  freelancer, 
  isFavorite, 
  onToggleFavorite, 
  onCardClick 
}) {
  const {
    id,
    name,
    profession,
    experience,
    location,
    shortBio,
    avatar,
    verified,
    premium,
    status
  } = freelancer;

  const handleAction = (e, callback) => {
    e.stopPropagation();
    callback();
  };

  return (
    <div 
      onClick={() => onCardClick(freelancer)}
      className="glass-card animate-scale-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '24px',
        padding: '0.95rem',
        border: premium ? '1px solid rgba(168, 85, 247, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
        background: premium 
          ? 'linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, rgba(13, 18, 41, 0.7) 100%)' 
          : 'rgba(13, 18, 41, 0.65)',
        boxShadow: premium ? '0 10px 30px 0 rgba(168, 85, 247, 0.2)' : '0 8px 25px 0 rgba(0, 0, 0, 0.35)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Save Button (Absolute top-right of image) */}
      <button
        onClick={(e) => handleAction(e, () => onToggleFavorite(id))}
        style={{
          position: 'absolute',
          top: '1.4rem',
          right: '1.4rem',
          background: 'rgba(5, 8, 22, 0.82)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '50%',
          width: '34px',
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isFavorite ? 'var(--accent-purple)' : 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'var(--transition-smooth)',
          zIndex: 10
        }}
        className="favorite-btn"
      >
        <Heart size={16} fill={isFavorite ? 'var(--accent-purple)' : 'transparent'} color={isFavorite ? 'var(--accent-purple)' : 'currentColor'} />
      </button>

      {/* Profile Image Section */}
      <div style={{ position: 'relative', width: '100%', height: '170px', borderRadius: '18px', overflow: 'hidden', marginBottom: '0.85rem' }}>
        <img 
          src={avatar || "/logo-lightning.png"} 
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          className="card-avatar"
        />
        
        {/* Glow overlay for premium freelancers */}
        {premium && (
          <div style={{
            position: 'absolute',
            inset: 0,
            border: '1.5px solid rgba(168, 85, 247, 0.5)',
            borderRadius: '18px',
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 15px rgba(168, 85, 247, 0.3)'
          }} />
        )}

        {/* Status indicator (Pulsing Green for online) */}
        <div style={{
          position: 'absolute',
          bottom: '0.6rem',
          left: '0.6rem',
          background: 'rgba(5, 8, 22, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '0.25rem 0.6rem',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.68rem',
          fontWeight: 600,
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: status === 'online' ? '#10b981' : '#64748b',
            boxShadow: status === 'online' ? '0 0 8px #10b981' : 'none',
            display: 'inline-block'
          }} className={status === 'online' ? 'status-pulse' : ''} />
          <span style={{ color: status === 'online' ? '#34d399' : 'var(--text-muted)' }}>
            {status === 'online' ? 'Onlayn' : 'Oflayn'}
          </span>
        </div>

        {/* Badges Container */}
        <div style={{
          position: 'absolute',
          top: '0.6rem',
          left: '0.6rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem'
        }}>
          {verified && (
            <span className="badge badge-blue" style={{ backdropFilter: 'blur(8px)', gap: '0.2rem', fontSize: '0.62rem', padding: '0.2rem 0.55rem' }}>
              <ShieldCheck size={11} /> Tasdiqlangan
            </span>
          )}
          {premium && (
            <span className="badge badge-purple" style={{ backdropFilter: 'blur(8px)', gap: '0.2rem', fontSize: '0.62rem', padding: '0.2rem 0.55rem' }}>
              <Zap size={11} /> Premium
            </span>
          )}
        </div>
      </div>

      {/* Bio Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 0.25rem' }}>
        
        {/* Name and Professional Badge */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {name}
        </h3>
        
        <p style={{ color: 'var(--accent-blue)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.6rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {profession}
        </p>

        {/* Quick Meta Stats */}
        <div style={{
          display: 'flex',
          gap: '0.85rem',
          fontSize: '0.72rem',
          color: 'var(--text-secondary)',
          marginBottom: '0.6rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          paddingBottom: '0.6rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Briefcase size={13} color="var(--accent-purple)" />
            <span>{experience} yil tajriba</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <MapPin size={13} color="var(--accent-blue)" />
            <span>{location}</span>
          </div>
        </div>

        {/* Short Bio description clamped to 2 lines */}
        <p style={{
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.45,
          marginBottom: '0.85rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flex: 1
        }}>
          {shortBio}
        </p>

        {/* Bottom row: Price status and Quick Contact Action */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '0.65rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 500 }}>Tarif</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-green)' }}>Kelishuv asosida</span>
          </div>
          
          <button
            onClick={(e) => handleAction(e, () => onCardClick(freelancer))}
            style={{
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: '#fff',
              borderRadius: '12px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(168, 85, 247, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>Batafsil</span>
            <ArrowRight size={12} />
          </button>
        </div>

      </div>

      <style>{`
        .favorite-btn:hover {
          transform: scale(1.1);
          border-color: var(--accent-purple) !important;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }
        .glass-card:hover .card-avatar {
          transform: scale(1.06);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .status-pulse {
          animation: pulse 1.8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
