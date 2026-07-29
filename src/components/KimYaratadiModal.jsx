import React, { useState } from 'react';
import { X, Search, UserCheck, Sparkles, ShieldCheck, Eye } from 'lucide-react';

export default function KimYaratadiModal({ 
  freelancers, 
  onClose, 
  onSelectCreator, 
  onViewProfile 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');

  const categories = ['Barchasi', 'Full Stack', 'UI UX', 'AI Engineer', 'Backend', 'Frontend'];

  const filtered = freelancers.filter(fl => {
    const matchesSearch = 
      fl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fl.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (fl.technologies && fl.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = 
      selectedCategory === 'Barchasi' || 
      fl.category === selectedCategory ||
      fl.profession.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1050,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      background: 'rgba(5, 8, 22, 0.88)',
      backdropFilter: 'blur(20px)',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      <div className="glass-panel animate-scale-in" style={{
        width: '95%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(10, 15, 30, 0.96)',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        borderRadius: '28px',
        boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(168, 85, 247, 0.15)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '1.75rem 2rem 1.25rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, transparent 100%)'
        }}>
          <button 
            onClick={onClose} 
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          >
            <X size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
              padding: '0.5rem',
              borderRadius: '12px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.6rem', 
                fontWeight: 800, 
                background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>
                Kim Yaratadi? (Loyihani amalga oshiruvchi mutaxassislar)
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
                Admin tomonidan tayyorlangan va loyihangizni noldan yaratishga mos keladigan barcha ijrochilar ro'yxati.
              </p>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="text"
                placeholder="Mutaxassis ismi yoki ko'nikmasi bo'yicha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-dark"
                style={{ paddingLeft: '2.5rem', width: '100%', height: '42px', fontSize: '0.85rem', borderRadius: '14px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '2px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: selectedCategory === cat ? '600' : '400',
                    background: selectedCategory === cat ? 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)' : 'rgba(255,255,255,0.05)',
                    color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                    border: '1px solid ' + (selectedCategory === cat ? 'transparent' : 'rgba(255,255,255,0.08)'),
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div style={{
          padding: '1.5rem 2rem',
          overflowY: 'auto',
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <UserCheck size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Ushbu so'rov bo'yicha hech qanday yaratuvchi topilmadi.</p>
            </div>
          ) : (
            filtered.map(creator => (
              <div 
                key={creator.id}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  background: 'rgba(13, 18, 38, 0.75)',
                  border: creator.hidden ? '1px dashed rgba(168, 85, 247, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  position: 'relative',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {/* Badges */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {creator.hidden && (
                    <span style={{
                      background: 'rgba(168, 85, 247, 0.2)',
                      color: '#c084fc',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <ShieldCheck size={12} /> Yashirin Yaratuvchi
                    </span>
                  )}
                  <span style={{
                    background: 'rgba(59, 130, 246, 0.15)',
                    color: '#60a5fa',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontWeight: 600
                  }}>
                    {creator.category || 'Mutaxassis'}
                  </span>
                </div>

                {/* Info Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img 
                    src={(creator.avatar && creator.avatar.startsWith('data:image')) ? creator.avatar : '/logo-lightning.png'} 
                    alt={creator.name}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '16px',
                      objectFit: 'contain',
                      background: 'rgba(168, 85, 247, 0.1)',
                      padding: '4px',
                      border: '2px solid rgba(168, 85, 247, 0.4)'
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                      {creator.name}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {creator.profession}
                    </p>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                      ⚡ Tajriba: {creator.experience} yil
                    </span>
                  </div>
                </div>

                {/* Short Bio */}
                <p style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  flex: 1
                }}>
                  {creator.shortBio || creator.aboutMe || "Loyiha va startaplarni sifatli ishlab chiquvchi ijrochi."}
                </p>

                {/* Tech Badges */}
                {creator.technologies && creator.technologies.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {creator.technologies.slice(0, 3).map((t, idx) => (
                      <span key={idx} style={{
                        background: 'rgba(255,255,255,0.04)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.68rem',
                        padding: '2px 6px',
                        borderRadius: '6px'
                      }}>
                        {t}
                      </span>
                    ))}
                    {creator.technologies.length > 3 && (
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        +{creator.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                  <button
                    onClick={() => onViewProfile(creator)}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.45rem', fontSize: '0.75rem', justifyContent: 'center' }}
                  >
                    <Eye size={14} /> Profil
                  </button>
                  <button
                    onClick={() => onSelectCreator(creator)}
                    className="btn btn-primary"
                    style={{ flex: 1.3, padding: '0.45rem', fontSize: '0.75rem', justifyContent: 'center', background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)' }}
                  >
                    <UserCheck size={14} /> Tanlash
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(5, 8, 22, 0.8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)'
        }}>
          <span>Jami yaratuvchilar: <strong style={{ color: '#fff' }}>{filtered.length} ta</strong></span>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.4rem 1.25rem', fontSize: '0.8rem' }}>
            Yopish
          </button>
        </div>

      </div>
    </div>
  );
}
