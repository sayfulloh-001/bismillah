import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle, Award, Rocket, Sparkles, MessageSquarePlus } from 'lucide-react';

export default function Hero({ onStartapClick, onBuyurmaClick, onKimYaratadiClick }) {
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
          O'zbekistondagi Top Freelance va Startap Platformasi
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '1.5rem',
          letterSpacing: '-0.03em'
        }}>
          Startapingiz uchun{' '}
          <span style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative'
          }}>
            eng kuchli
          </span>{' '}
          yaratuvchilarni toping
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--text-secondary)',
          maxWidth: '720px',
          margin: '0 auto 3rem auto',
          fontWeight: '400',
          lineHeight: 1.6
        }}>
          Startap qurish, buyurtma berish va professional dasturchilarni jalb qilish. Admin tomonidan tayyorlangan mutaxassislar loyihangizni mukammal bajarishga tayyor.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {/* Startap & Buyurtma berish */}
          <button 
            onClick={onStartapClick || onBuyurmaClick} 
            className="btn btn-primary" 
            style={{ 
              padding: '0.9rem 2.2rem', 
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
              boxShadow: '0 0 25px rgba(168, 85, 247, 0.4)'
            }}
          >
            <Rocket size={18} />
            Startap & Buyurtma berish
          </button>

          {/* Kim Yaratadi? */}
          <button 
            onClick={onKimYaratadiClick} 
            className="btn" 
            style={{ 
              padding: '0.9rem 2rem', 
              fontSize: '1rem',
              background: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
              fontWeight: 600
            }}
          >
            <Sparkles size={18} color="#c084fc" />
            Kim Yaratadi?
          </button>
        </div>
      </div>
    </section>
  );
}
