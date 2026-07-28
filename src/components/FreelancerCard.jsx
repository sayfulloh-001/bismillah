import React from 'react';
import { Heart, MapPin, Briefcase, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

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

  // Handle clicking buttons to prevent event bubbling
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
        borderRadius: '20px',
        padding: '0.85rem',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        background: 'rgba(10, 15, 30, 0.55)',
        boxShadow: premium ? '0 6px 20px 0 rgba(168, 85, 247, 0.12)' : '0 6px 20px 0 rgba(0, 0, 0, 0.25)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Save Button (Absolute top-right of image) */}
      <button
        onClick={(e) => handleAction(e, () => onToggleFavorite(id))}
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          background: 'rgba(10, 15, 30, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
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
        <Heart size={15} fill={isFavorite ? 'var(--accent-purple)' : 'transparent'} />
      </button>

      {/* Profile Image Section */}
      <div style={{ position: 'relative', width: '100%', height: '160px', borderRadius: '14px', overflow: 'hidden', marginBottom: '0.75rem' }}>
        <img 
          src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"} 
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Glow overlay for premium freelancers */}
        {premium && (
          <div style={{
            position: 'absolute',
            inset: 0,
            border: '1.5px solid var(--accent-purple)',
            borderRadius: '14px',
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 12px rgba(168, 85, 247, 0.25)'
          }} />
        )}

        {/* Status indicator (Pulsing Green for online) */}
        <div style={{
          position: 'absolute',
          bottom: '0.5rem',
          left: '0.5rem',
          background: 'rgba(5, 8, 22, 0.85)',
          padding: '0.2rem 0.5rem',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.65rem',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: status === 'online' ? '#10b981' : '#64748b',
            boxShadow: status === 'online' ? '0 0 6px #10b981' : 'none',
            display: 'inline-block'
          }} className={status === 'online' ? 'status-pulse' : ''} />
          {status === 'online' ? 'Onlayn' : 'Oflayn'}
        </div>

        {/* Badges Container */}
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          left: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem'
        }}>
          {verified && (
            <span className="badge badge-blue" style={{ backdropFilter: 'blur(4px)', gap: '0.15rem', fontSize: '0.6rem', padding: '0.15rem 0.4rem' }}>
              <ShieldCheck size={10} /> Tasdiqlangan
            </span>
          )}
          {premium && (
            <span className="badge badge-purple" style={{ backdropFilter: 'blur(4px)', gap: '0.15rem', fontSize: '0.6rem', padding: '0.15rem 0.4rem' }}>
              <Zap size={10} /> Premium
            </span>
          )}
        </div>
      </div>

      {/* Bio Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 0.25rem' }}>
        
        {/* Name and Professional Badge */}
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {name}
        </h3>
        
        <p style={{ color: 'var(--accent-blue)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {profession}
        </p>

        {/* Quick Meta Stats */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          fontSize: '0.7rem',
          color: 'var(--text-secondary)',
          marginBottom: '0.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
            <Briefcase size={12} />
            <span>{experience} yil tajriba</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
            <MapPin size={12} />
            <span>{location}</span>
          </div>
        </div>

        {/* Short Bio description clamped to 2 lines */}
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.4,
          marginBottom: '0.75rem',
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
          paddingTop: '0.6rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)' }}>Xizmat tarifi</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-green)' }}>Kelishuv asosida</span>
          </div>
          
          <button
            onClick={(e) => handleAction(e, () => onCardClick(freelancer))}
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              color: 'var(--accent-blue)',
              borderRadius: '8px',
              padding: '0.35rem 0.6rem',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-blue)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
              e.currentTarget.style.color = 'var(--accent-blue)';
            }}
          >
            <span>Aloqa</span>
            <ArrowRight size={10} />
          </button>
        </div>

      </div>

      <style>{`
        .favorite-btn:hover {
          transform: scale(1.1);
          border-color: var(--accent-purple) !important;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
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
