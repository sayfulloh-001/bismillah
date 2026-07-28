import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle, Award, Briefcase, Smile, Calendar } from 'lucide-react';

const CountUp = ({ end, duration = 1.5, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endValue = parseInt(end, 10);
    if (isNaN(endValue) || endValue === 0) {
      setCount(end);
      return;
    }
    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / endValue), 30);
    
    const timer = setInterval(() => {
      start += Math.ceil(endValue / 30);
      if (start >= endValue) {
        clearInterval(timer);
        setCount(endValue);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

export default function Hero({ onBrowseClick, onContactAdminClick }) {
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
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(59, 130, 246, 0.05) 70%, transparent 100%)',
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
          O'zbekistondagi Top Freelance Platformasi
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
            eng yaxshi
          </span>{' '}
          frilanserlarni toping
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto 3rem auto',
          fontWeight: '400',
          lineHeight: 1.6
        }}>
          Professional dasturchilar, dizaynerlar va sun'iy intellekt (AI) mutaxassislari loyihalaringizni o'z vaqtida va mukammal bajarishga tayyor.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.25rem',
          marginBottom: '1rem'
        }}>
          <button onClick={onBrowseClick} className="btn btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}>
            Frilanserlarni ko'rish
            <ArrowRight size={18} />
          </button>
          <button onClick={onContactAdminClick} className="btn btn-secondary" style={{ padding: '1rem 2.25rem', fontSize: '1rem' }}>
            <MessageCircle size={18} />
            Admin bilan bog'lanish
          </button>
        </div>
      </div>
    </section>
  );
}
