import React, { useState } from 'react';
import { 
  X, MapPin, Briefcase, DollarSign, Send, Phone, Globe, ShieldCheck, 
  Zap, Calendar, BookOpen, Award, FileText, Star, ThumbsUp, CheckCircle, Mail 
} from 'lucide-react';

const Github = ({ size = 20, ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ display: 'inline-block', verticalAlign: 'middle', ...props.style }}
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ProfileModal({ freelancer, onClose, onFavoriteToggle, isFav, onHireClick }) {
  const [activeTab, setActiveTab] = useState('info'); // info, portfolio, reviews

  if (!freelancer) return null;

  const {
    name,
    profession,
    experience,
    age,
    location,
    hourlyRate,
    monthlyRate,
    aboutMe,
    technologies,
    skills,
    languages,
    education,
    certificates,
    workExperience,
    portfolio,
    reviews,
    avatar,
    verified,
    premium,
    status,
    phone,
    telegram,
    email,
    github,
    linkedin,
    successRate,
    completedJobs
  } = freelancer;

  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < Math.floor(count) ? "var(--accent-orange)" : "transparent"} 
        color={i < Math.floor(count) ? "var(--accent-orange)" : "var(--text-muted)"} 
      />
    ));
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      background: 'rgba(5, 8, 22, 0.85)',
      backdropFilter: 'blur(16px)',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      {/* Modal Card container */}
      <div className="glass-panel animate-scale-in" style={{
        width: '100%',
        maxWidth: '1000px',
        height: '90vh',
        background: 'rgba(10, 15, 30, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'var(--transition-smooth)'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.2)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
        >
          <X size={20} />
        </button>

        {/* Modal Content Scroll Area */}
        <div style={{ 
          display: 'flex', 
          height: '100%', 
          overflow: 'hidden' 
        }} className="modal-body-wrapper">
          
          {/* LEFT PANEL: General profile details */}
          <div style={{
            width: '350px',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            overflowY: 'auto',
            background: 'rgba(5, 8, 22, 0.5)'
          }} className="left-panel">
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', marginBottom: '1rem', border: '3px solid var(--accent-purple)' }}>
                <img src={avatar || "/logo-lightning.png"} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {status === 'online' && (
                  <span style={{
                    position: 'absolute',
                    bottom: '5px',
                    right: '5px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    border: '3px solid #050816',
                    boxShadow: '0 0 10px #10b981'
                  }} />
                )}
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {name}
              </h2>
              <p style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>{profession}</p>

              {/* Status Badges */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '0.5rem' }}>
                {verified && <span className="badge badge-blue"><ShieldCheck size={12} /> Tasdiqlangan</span>}
                {premium && <span className="badge badge-purple"><Zap size={12} /> Premium</span>}
              </div>
            </div>

            {/* Quick stats box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '20px',
              padding: '1.25rem',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Muvaffaqiyat:</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-green)' }}>{successRate}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Bajarilgan ishlar:</span>
                <span style={{ fontWeight: 700 }}>{completedJobs} ta</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Viloyat:</span>
                <span style={{ fontWeight: 700 }}>{location}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Yosh:</span>
                <span style={{ fontWeight: 700 }}>{age} yosh</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Bandlik statusi:</span>
                <span style={{ fontWeight: 700, color: status === 'online' ? 'var(--accent-green)' : 'inherit' }}>
                  {status === 'online' ? 'Band emas (Faol)' : 'Band'}
                </span>
              </div>
            </div>
            {/* Pricing details */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.05)',
              border: '1px solid rgba(59, 130, 246, 0.15)',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Loyihalar tarifi:</span>
              <span style={{ fontWeight: 800, color: 'var(--accent-blue)', fontSize: '0.95rem' }}>Kelishuv asosida</span>
            </div>
            {/* Contact info list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
              <a href={`tel:${phone}`} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>
                <Phone size={16} /> {phone}
              </a>
              <a href={`https://t.me/${telegram}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }}>
                <Send size={16} /> @{telegram}
              </a>
              {email && (
                <a href={`mailto:${email}`} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', border: '1px dashed rgba(255,255,255,0.08)' }}>
                  <Mail size={16} /> {email}
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>
                  <Github size={16} /> GitHub Profil
                </a>
              )}
              
              <button 
                onClick={onHireClick} 
                className="btn btn-primary" 
                style={{ 
                  width: '100%', 
                  marginTop: '0.5rem',
                  background: 'linear-gradient(135deg, var(--accent-green) 0%, var(--accent-blue) 100%)',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                }}
              >
                Bog'lanish / Yollash
              </button>
            </div>

          </div>

          {/* RIGHT PANEL: Details tabs */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }} className="right-panel">
            
            {/* Tabs Header */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(5, 8, 22, 0.3)',
              padding: '0.75rem 2rem 0 2rem'
            }}>
              {[
                { id: 'info', label: 'Ma\'lumot va Tajriba', icon: <Briefcase size={16} /> },
                { id: 'portfolio', label: 'Portfolio va Rezyume', icon: <FileText size={16} /> },
                { id: 'reviews', label: `Sharhlar (${reviews?.length || 0})`, icon: <Star size={16} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid var(--accent-purple)' : '2px solid transparent',
                    background: 'transparent',
                    color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                    fontWeight: activeTab === tab.id ? '600' : '400',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tabs Content */}
            <div style={{
              flex: 1,
              padding: '2.5rem 2rem',
              overflowY: 'auto'
            }} className="tab-content-scroll">
              
              {/* TAB 1: Biography, skills, experience, education */}
              {activeTab === 'info' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="tab-pane">
                  
                  {/* About Me */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={18} color="var(--accent-purple)" />
                      Biografiya
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{aboutMe}</p>
                  </div>

                  {/* Skills tags */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Texnologiyalar va Ko'nikmalar</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {technologies.map(tech => (
                        <span key={tech} className="badge badge-purple" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>{tech}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {skills.map(skill => (
                        <span key={skill} className="badge badge-blue" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Tillar</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {languages.map(lang => (
                        <span key={lang} style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#fff',
                          padding: '0.4rem 1rem',
                          borderRadius: '10px',
                          fontSize: '0.85rem'
                        }}>{lang}</span>
                      ))}
                    </div>
                  </div>

                  {/* Work Experience Timeline */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Briefcase size={18} color="var(--accent-blue)" />
                      Ish tajribasi
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {workExperience && workExperience.length > 0 ? (
                        workExperience.map((exp, index) => (
                          <div key={index} style={{
                            borderLeft: '2px solid var(--accent-purple)',
                            paddingLeft: '1.25rem',
                            position: 'relative'
                          }}>
                            {/* Dot indicator */}
                            <span style={{
                              position: 'absolute',
                              left: '-5px',
                              top: '5px',
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: 'var(--accent-purple)'
                            }} />
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{exp.position}</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                              <span>{exp.company}</span>
                              <span>{exp.period}</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{exp.description}</p>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ma'lumot mavjud emas.</p>
                      )}
                    </div>
                  </div>

                  {/* Education & Certificates */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="edu-grid">
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BookOpen size={18} color="var(--accent-blue)" />
                        Ta'lim
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {education && education.length > 0 ? (
                          education.map((edu, index) => (
                            <div key={index}>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{edu.degree}</h4>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{edu.institution}</p>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{edu.period}</span>
                            </div>
                          ))
                        ) : (
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ma'lumot mavjud emas.</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Award size={18} color="var(--accent-purple)" />
                        Sertifikatlar
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {certificates && certificates.length > 0 ? (
                          certificates.map((cert, index) => (
                            <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                              <Award size={14} style={{ color: 'var(--accent-purple)', marginTop: '0.2rem' }} />
                              <div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{cert.name}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{cert.issuer} ({cert.year})</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ma'lumot mavjud emas.</p>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: Portfolio Gallery and Resume Reader */}
              {activeTab === 'portfolio' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  
                  {/* Portfolio Gallery */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Loyiha ishlari (Portfolio)</h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1.5rem'
                    }} className="portfolio-grid">
                      {portfolio && portfolio.length > 0 ? (
                        portfolio.map((project, index) => (
                          <div key={index} className="glass-card" style={{ padding: '1rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ width: '100%', height: '150px', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                              <img src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>{project.title}</h4>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', flex: 1 }}>{project.description}</p>
                            
                            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                              {project.tech.map(t => (
                                <span key={t} className="badge badge-blue" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>{t}</span>
                              ))}
                            </div>

                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', padding: '0.4rem', fontSize: '0.75rem', borderRadius: '8px' }}>
                              <Globe size={12} /> Loyihani ko'rish
                            </a>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Portfolio ishlari yuklanmagan.</p>
                      )}
                    </div>
                  </div>

                  {/* Resume Viewer Section */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1.0rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={18} color="var(--accent-purple)" />
                      Kasbiy Rezyume (Resume Preview)
                    </h3>

                    {/* Mock Resume visual reader layout */}
                    <div className="glass-card" style={{
                      background: '#ffffff',
                      color: '#0f172a',
                      borderRadius: '16px',
                      padding: '2.5rem',
                      fontFamily: 'sans-serif',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                      border: '1px solid rgba(0,0,0,0.1)',
                      lineHeight: '1.5'
                    }}>
                      <div style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h1 style={{ fontSize: '1.6rem', color: '#1e293b', fontWeight: 'bold' }}>{name}</h1>
                          <p style={{ fontSize: '0.95rem', color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', marginTop: '0.25rem' }}>{profession}</p>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#64748b' }}>
                          <p>{phone}</p>
                          <p>{email}</p>
                          <p>t.me/{telegram}</p>
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.25rem' }}>
                        <h3 style={{ fontSize: '1rem', color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>XULOSA</h3>
                        <p style={{ fontSize: '0.85rem', color: '#334155' }}>
                          {aboutMe} Professional darajada topshiriqlarni sifatli va muddatida topshirish.
                        </p>
                      </div>

                      <div style={{ marginBottom: '1.25rem' }}>
                        <h3 style={{ fontSize: '1rem', color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>TEXNIK BILIMLAR</h3>
                        <p style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>
                          {technologies.join(', ')}
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                        <a href="#" onClick={(e) => { e.preventDefault(); alert("Rezyume yuklab olindi (Fayl formati: PDF)"); }} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', borderRadius: '8px' }}>
                          Rezyumeni yuklab olish (PDF)
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: Reviews and rating statistics */}
              {activeTab === 'reviews' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  
                  {/* Rating summary */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gap: '2rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }} className="reviews-summary-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.08)' }} className="summary-left">
                      <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-orange)' }}>5.0</h2>
                      <div style={{ display: 'flex', gap: '0.1rem', marginBottom: '0.5rem' }}>{renderStars(5)}</div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Umumiy reyting</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem' }}>
                        <span style={{ width: '80px', color: 'var(--text-secondary)' }}>Muvaffaqiyat</span>
                        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ width: `${successRate}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-green))' }} />
                        </div>
                        <span style={{ width: '40px', fontWeight: 'bold', textAlign: 'right' }}>{successRate}%</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem' }}>
                        <span style={{ width: '80px', color: 'var(--text-secondary)' }}>Aloqa</span>
                        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-green))' }} />
                        </div>
                        <span style={{ width: '40px', fontWeight: 'bold', textAlign: 'right' }}>100%</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem' }}>
                        <span style={{ width: '80px', color: 'var(--text-secondary)' }}>Sifat</span>
                        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ width: '98%', height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-green))' }} />
                        </div>
                        <span style={{ width: '40px', fontWeight: 'bold', textAlign: 'right' }}>98%</span>
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Mijozlar sharhlari</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {reviews && reviews.length > 0 ? (
                        reviews.map((rev, index) => (
                          <div key={index} className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                              <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{rev.author}</h4>
                                <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)' }}>{rev.company} &bull; Loyiha: {rev.project}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '0.1rem' }}>
                                {renderStars(rev.stars)}
                              </div>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                              "{rev.text}"
                            </p>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hozircha sharhlar yozilmagan.</p>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .modal-body-wrapper {
            flex-direction: column !important;
            overflow-y: auto !important;
          }
          .left-panel {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08) !important;
            overflow-y: visible !important;
            padding: 1.5rem !important;
          }
          .right-panel {
            overflow-y: visible !important;
          }
          .tab-content-scroll {
            overflow-y: visible !important;
            padding: 1.5rem !important;
          }
          .glass-panel {
            height: 95vh !important;
          }
          .edu-grid, .portfolio-grid {
            grid-template-columns: 1fr !important;
          }
          .reviews-summary-grid {
            grid-template-columns: 1fr !important;
          }
          .summary-left {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08) !important;
            padding-bottom: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
