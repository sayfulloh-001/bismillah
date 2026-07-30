import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User, Phone, MessageSquare, Sparkles, UserCheck, Rocket } from 'lucide-react';

export default function StartupRequestForm({ 
  onClose, 
  onSubmitSuccess, 
  formTitle = "Buyurtma berish",
  formSubtitle = "Telegram bot yozish, veb-sayt yaratish yoki startap loyihangiz bo'yicha ma'lumot qoldiring. Mutaxassislarimiz zudlik bilan ko'rib chiqadi.",
  selectedCreator = null,
  onOpenKimYaratadi
}) {
  const [formData, setFormData] = useState({
    clientName: '',
    projectName: '',
    phone: '',
    telegram: '',
    assignedCreator: selectedCreator ? selectedCreator.name : ''
  });

  const submittingRef = useRef(false);

  useEffect(() => {
    if (selectedCreator) {
      setFormData(prev => ({
        ...prev,
        assignedCreator: selectedCreator.name
      }));
    }
  }, [selectedCreator]);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!formData.clientName.trim()) tempErrors.clientName = "Ism va familiyangizni kiriting";
    if (!formData.projectName.trim()) tempErrors.projectName = "Loyiha nomini kiriting (masalan: E-commerce, Telegram bot)";
    if (!formData.phone.trim()) tempErrors.phone = "Telefon raqamingizni kiriting";
    if (!formData.telegram.trim()) tempErrors.telegram = "Telegram username kiriting";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submittingRef.current) return;
    if (validate()) {
      submittingRef.current = true;
      onSubmitSuccess({
        ...formData,
        creatorInfo: selectedCreator ? `${selectedCreator.name} (${selectedCreator.profession})` : "Admin tayinlaydi"
      });
    }
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
      <div className="glass-panel animate-scale-in" style={{
        width: '90%',
        maxWidth: '520px',
        background: 'rgba(10, 15, 30, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '30px',
        padding: '2.5rem',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
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
            width: '36px',
            height: '36px',
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
          <X size={18} />
        </button>

        {/* Form Title */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Rocket size={22} color="var(--accent-purple)" />
            {formTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            {formSubtitle}
          </p>
        </div>

        {/* Selected Creator Section / Kim Yaratadi */}
        <div style={{
          background: 'rgba(168, 85, 247, 0.08)',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          borderRadius: '16px',
          padding: '0.85rem 1.1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}>
          {selectedCreator ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src={(selectedCreator.avatar && selectedCreator.avatar.startsWith('data:image')) ? selectedCreator.avatar : '/logo-pencil.jpg'} 
                alt={selectedCreator.name}
                style={{ width: '40px', height: '40px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--accent-purple)' }}
              />
              <div>
                <span style={{ fontSize: '0.7rem', color: '#c084fc', fontWeight: 'bold', display: 'block', textTransform: 'uppercase' }}>
                  Kim Yaratadi (Tanlangan ijrochi)
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>
                  {selectedCreator.name}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Sparkles size={18} color="#c084fc" />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 'bold', display: 'block' }}>
                  Kim Yaratadi? (Ijrochi tanlash)
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Loyihani qaysi mutaxassis yaratadi?
                </span>
              </div>
            </div>
          )}

          {onOpenKimYaratadi && (
            <button
              type="button"
              onClick={onOpenKimYaratadi}
              style={{
                background: 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)',
                color: '#fff',
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <UserCheck size={14} />
              {selectedCreator ? "O'zgartirish" : "Tanlash"}
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          
          {/* Client Name Input */}
          <div className="form-group">
            <label htmlFor="clientName">Ismingiz va familiyangiz *</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                id="clientName"
                name="clientName"
                required
                placeholder="Masalan: Sardor Rahimov"
                value={formData.clientName}
                onChange={handleChange}
                className="input-dark"
                style={{
                  paddingLeft: '2.25rem',
                  borderColor: errors.clientName ? 'var(--accent-red)' : 'var(--glass-border)'
                }}
              />
            </div>
            {errors.clientName && <span style={{ color: 'var(--accent-red)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.clientName}</span>}
          </div>

          {/* Project Name Input */}
          <div className="form-group">
            <label htmlFor="projectName">Loyiha nomi / Vazifa *</label>
            <div style={{ position: 'relative' }}>
              <MessageSquare size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                id="projectName"
                name="projectName"
                required
                placeholder="Nima yaratmoqchisiz? (masalan: FinTech Startap, E-Commerce)"
                value={formData.projectName}
                onChange={handleChange}
                className="input-dark"
                style={{
                  paddingLeft: '2.25rem',
                  borderColor: errors.projectName ? 'var(--accent-red)' : 'var(--glass-border)'
                }}
              />
            </div>
            {errors.projectName && <span style={{ color: 'var(--accent-red)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.projectName}</span>}
          </div>

          {/* Phone Input */}
          <div className="form-group">
            <label htmlFor="phone">Telefon raqam *</label>
            <div style={{ position: 'relative' }}>
              <Phone size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                id="phone"
                name="phone"
                required
                placeholder="Masalan: +998 90 123 45 67"
                value={formData.phone}
                onChange={handleChange}
                className="input-dark"
                style={{
                  paddingLeft: '2.25rem',
                  borderColor: errors.phone ? 'var(--accent-red)' : 'var(--glass-border)'
                }}
              />
            </div>
            {errors.phone && <span style={{ color: 'var(--accent-red)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
          </div>

          {/* Telegram Input */}
          <div className="form-group">
            <label htmlFor="telegram">Telegram Username *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'bold' }}>@</span>
              <input
                type="text"
                id="telegram"
                name="telegram"
                required
                placeholder="startup_owner"
                value={formData.telegram}
                onChange={handleChange}
                className="input-dark"
                style={{
                  paddingLeft: '1.75rem',
                  borderColor: errors.telegram ? 'var(--accent-red)' : 'var(--glass-border)'
                }}
              />
            </div>
            {errors.telegram && <span style={{ color: 'var(--accent-red)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.telegram}</span>}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              marginTop: '0.5rem',
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)'
            }}
          >
            <Send size={16} /> Loyihani yuborish
          </button>

        </form>

      </div>
    </div>
  );
}
