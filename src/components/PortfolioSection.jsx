import React, { useState } from 'react';
import { Briefcase, ExternalLink, Tag, Code, CheckCircle, Sparkles, Filter, Rocket, Globe, Bot, ShieldCheck } from 'lucide-react';

export default function PortfolioSection({ projects = [], onOrderClick }) {
  const [activeCategory, setActiveCategory] = useState('Barchasi');

  const categories = ['Barchasi', 'Veb-sayt', 'Telegram Bot', 'Startap'];

  const filteredProjects = activeCategory === 'Barchasi'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div style={{ padding: '2.5rem 0' }} className="animate-fade-in">
      
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '0.4rem 1.1rem', borderRadius: '30px', color: '#c084fc', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <Sparkles size={16} /> Muvaffaqiyatli topshirilgan loyihalar
        </div>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>
          Qilingan Ishlar & Portfolio
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Asoschilarimiz hamda jamoamiz tomonidan yaratilgan zamonaviy veb-saytlar, avtomatlashtirilgan Telegram botlar va yirik startap ekotizimlari bilan tanishing.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)' : 'rgba(255,255,255,0.05)',
              color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
              border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
              padding: '0.6rem 1.4rem',
              borderRadius: '20px',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              boxShadow: activeCategory === cat ? '0 5px 20px rgba(168, 85, 247, 0.4)' : 'none'
            }}
          >
            {cat === 'Veb-sayt' && <Globe size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />}
            {cat === 'Telegram Bot' && <Bot size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />}
            {cat === 'Startap' && <Rocket size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />}
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
          <Briefcase size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Ushbu bo'limda loyihalar hali yo'q</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Admin panel orqali yangi qilingan ishlarni qo'shishingiz mumkin.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredProjects.map(proj => (
            <div 
              key={proj.id} 
              className="glass-card project-hover-card"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(12, 16, 32, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
            >
              {/* Project Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: '#0a0d1a' }}>
                <img 
                  src={proj.image || 'https://images.unsplash.com/photo-1556742049-0a6756574f8b?w=600'} 
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="project-img"
                />
                
                {/* Category Badge */}
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: proj.category === 'Startap' ? 'rgba(168, 85, 247, 0.9)' : proj.category === 'Telegram Bot' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(59, 130, 246, 0.9)',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.85rem',
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  {proj.category === 'Telegram Bot' ? <Bot size={13} /> : proj.category === 'Startap' ? <Rocket size={13} /> : <Globe size={13} />}
                  {proj.category}
                </span>

                {/* Price Badge */}
                {proj.price && (
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '0.3rem 0.85rem',
                    borderRadius: '12px',
                    backdropFilter: 'blur(8px)'
                  }}>
                    {proj.price}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {proj.title}
                  </h3>
                  {proj.clientName && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-purple)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                      🏢 Mijoz / Buyurtmachi: {proj.clientName}
                    </span>
                  )}
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {proj.description}
                  </p>
                </div>

                {/* Tech Badges */}
                {proj.technologies && proj.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {(Array.isArray(proj.technologies) ? proj.technologies : String(proj.technologies).split(',')).map((tech, idx) => (
                      <span 
                        key={idx} 
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#e2e8f0',
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '8px',
                          fontWeight: 500
                        }}
                      >
                        {String(tech).trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {proj.demoLink && proj.demoLink !== '#' ? (
                    <a
                      href={proj.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{
                        padding: '0.45rem 1rem',
                        fontSize: '0.8rem',
                        borderRadius: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        textDecoration: 'none'
                      }}
                    >
                      <ExternalLink size={14} /> Ko'rish
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle size={14} /> Muvaffaqiyatli topshirilgan
                    </span>
                  )}

                  <button
                    onClick={onOrderClick}
                    className="btn btn-primary"
                    style={{
                      padding: '0.45rem 1.1rem',
                      fontSize: '0.8rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                      fontWeight: 700
                    }}
                  >
                    Shunga o'xshash buyurtma
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CSS Hover Styling */}
      <style>{`
        .project-hover-card:hover {
          transform: translateY(-6px);
          border-color: rgba(168, 85, 247, 0.4) !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(168, 85, 247, 0.2);
        }
        .project-hover-card:hover .project-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
