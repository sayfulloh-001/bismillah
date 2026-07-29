import React from 'react';
import { Award, Rocket } from 'lucide-react';

export default function Hero({ onStartapClick, onBuyurmaClick }) {
  return (
    <section className="animate-fade-in" style={{
      padding: '4.5rem 0 3rem 0',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glowing ambient light */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(59, 130, 246, 0.08) 70%, transparent 100%)',
        filter: 'blur(60px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div className="container">
        {/* Verified Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.4rem 1rem',
          borderRadius: '30px',
          marginBottom: '2rem',
          fontSize: '0.85rem',
          color: '#c084fc',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          <Award size={14} className="verified-glow" />
          O'zbekistondagi Top IT Loyihalar va Dasturchilar Platformasi
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.8vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '1.5rem',
          letterSpacing: '-0.03em'
        }}>
          Telegram bot, Veb-sayt va Startaplar uchun{' '}
          <span style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative'
          }}>
            eng kuchli
          </span>{' '}
          dasturchilarni toping
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-secondary)',
          maxWidth: '750px',
          margin: '0 auto 3rem auto',
          fontWeight: '400',
          lineHeight: 1.6
        }}>
          Telegram botlar yozish, zamonaviy veb-saytlar va murakkab startap loyihalarini hayotga tatbiq etish. Professional dasturchilarimiz va dizaynerlarimiz loyihangizni sifatli bajarishga tayyor.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <button 
            onClick={onStartapClick || onBuyurmaClick} 
            className="btn btn-primary" 
            style={{ 
              padding: '0.9rem 2.2rem', 
              fontSize: '1.05rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
              boxShadow: '0 0 25px rgba(168, 85, 247, 0.4)'
            }}
          >
            <Rocket size={18} />
            Loyiha topshirish (Bot, Sayt, Startap)
          </button>
        </div>
      </div>
    </section>
  );
}
