import React from 'react';
import { Rocket } from 'lucide-react';
import { FOUNDER_ENGINEER_IMG, FOUNDER_FULLSTACK_IMG } from './founderImages';

export default function Hero({ onStartapClick, onBuyurmaClick }) {
  return (
    <section className="animate-fade-in" style={{
      padding: '4rem 0 3rem 0',
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
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.1) 70%, transparent 100%)',
        filter: 'blur(60px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div className="container">
        {/* Founders Badge with Face Photos */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(10, 16, 32, 0.85)',
          border: '1px solid rgba(168, 85, 247, 0.35)',
          padding: '0.45rem 1.25rem 0.45rem 0.65rem',
          borderRadius: '35px',
          marginBottom: '2rem',
          fontSize: '0.88rem',
          color: '#fff',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(168, 85, 247, 0.25)',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={FOUNDER_ENGINEER_IMG} 
              alt="Samandar Nabiyev" 
              style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                border: '2px solid #a855f7', 
                objectFit: 'cover',
                boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)' 
              }} 
              title="Samandar Nabiyev (Software Engineer)" 
            />
            <img 
              src={FOUNDER_FULLSTACK_IMG} 
              alt="Sayfulloh Zokirov" 
              style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                border: '2px solid #38bdf8', 
                objectFit: 'cover', 
                marginLeft: '-12px',
                boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)' 
              }} 
              title="Sayfulloh Zokirov (Full Stack Developer)" 
            />
          </div>
          <span style={{ fontWeight: 600 }}>
            Platforma Asoschilari: <strong style={{ color: '#c084fc' }}>Samandar Nabiyev</strong> & <strong style={{ color: '#38bdf8' }}>Sayfulloh Zokirov</strong>
          </span>
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
              padding: '0.95rem 2.5rem', 
              fontSize: '1.08rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.45)',
              fontWeight: 700
            }}
          >
            <Rocket size={20} />
            Loyiha topshirish (Bot, Sayt, Startap)
          </button>
        </div>
      </div>
    </section>
  );
}
