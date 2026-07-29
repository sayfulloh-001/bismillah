import React, { useState } from 'react';
import { 
  Users, DollarSign, MessageSquare, Eye, ShieldCheck, Zap, Trash2, Edit, Plus, Check, X,
  Briefcase, MapPin, Upload, Star, Award, TrendingUp, Calendar, AlertCircle, EyeOff, Sparkles
} from 'lucide-react';
import { CATEGORIES, REGIONS } from '../data/mockData';

export default function AdminDashboard({ 
  freelancers, 
  requests, 
  onlineCount, 
  onAddFreelancer, 
  onUpdateFreelancer, 
  onDeleteFreelancer,
  onUpdateRequestStatus,
  onDeleteRequest
}) {
  const [activeSubTab, setActiveSubTab] = useState('stats'); // stats, list, add_edit
  const [editingFreelancer, setEditingFreelancer] = useState(null);

  // Form State for Add / Edit
  const [formState, setFormState] = useState({
    name: '',
    profession: '',
    category: 'Frontend',
    experience: '3',
    age: '25',
    location: 'Toshkent',
    completedJobs: '0',
    successRate: '100',
    shortBio: '',
    aboutMe: '',
    technologies: '',
    skills: '',
    languages: 'O\'zbekcha, Ruscha, Inglizcha',
    phone: '',
    telegram: '',
    email: '',
    github: '',
    linkedin: '',
    avatar: '',
    resumeUrl: '#',
    verified: false,
    premium: false,
    hidden: true // Admin added users hidden by default
  });

  const [formPortfolio, setFormPortfolio] = useState([
    { title: 'Katta Loyiha', description: 'Ushbu loyiha muvaffaqiyatli topshirildi.', tech: 'React, Node.js', link: '#', image: '' }
  ]);

  const [imageFileName, setImageFileName] = useState('');
  const [errors, setErrors] = useState({});

  // Helper to read file as Base64
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (field === 'avatar') {
        setImageFileName(file.name);
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormState({
      name: '',
      profession: '',
      category: 'Frontend',
      experience: '3',
      age: '25',
      location: 'Toshkent',
      hourlyRate: '20',
      monthlyRate: '3000',
      shortBio: '',
      aboutMe: '',
      technologies: '',
      skills: '',
      languages: 'O\'zbekcha, Ruscha, Inglizcha',
      phone: '',
      telegram: '',
      email: '',
      github: '',
      linkedin: '',
      avatar: '',
      resumeUrl: '#',
      verified: false,
      premium: false,
      hidden: true
    });
    setFormPortfolio([
      { title: 'Katta Loyiha', description: 'Ushbu loyiha muvaffaqiyatli topshirildi.', tech: 'React, Node.js', link: '#', image: '' }
    ]);
    setImageFileName('');
    setEditingFreelancer(null);
    setErrors({});
  };

  const handleEditClick = (fl) => {
    setEditingFreelancer(fl);
    setFormState({
      ...fl,
      experience: fl.experience.toString(),
      age: fl.age.toString(),
      completedJobs: (fl.completedJobs ?? 0).toString(),
      successRate: (fl.successRate ?? 100).toString(),
      technologies: Array.isArray(fl.technologies) ? fl.technologies.join(', ') : fl.technologies,
      skills: Array.isArray(fl.skills) ? fl.skills.join(', ') : fl.skills,
      languages: Array.isArray(fl.languages) ? fl.languages.join(', ') : fl.languages,
      hidden: fl.hidden ?? false
    });
    if (fl.portfolio && fl.portfolio.length > 0) {
      setFormPortfolio(fl.portfolio.map(p => ({
        ...p,
        tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech
      })));
    } else {
      setFormPortfolio([{ title: 'Katta Loyiha', description: 'Ushbu loyiha muvaffaqiyatli topshirildi.', tech: 'React, Node.js', link: '#', image: '' }]);
    }
    setActiveSubTab('add_edit');
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formState.name.trim()) tempErrors.name = "Ism kiritilishi shart";
    if (!formState.profession.trim()) tempErrors.profession = "Kasb nomi kiritilishi shart";
    if (!formState.shortBio.trim()) tempErrors.shortBio = "Qisqa bio kiritilishi shart";
    if (!formState.phone.trim()) tempErrors.phone = "Telefon raqami kiritilishi shart";
    if (!formState.telegram.trim()) tempErrors.telegram = "Telegram username kiritilishi shart";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring! (Ism, Mutaxassislik kasbi, Qisqa bio, Telefon raqam, Telegram username)");
      return;
    }

    // Process array fields
    const processedFreelancer = {
      ...formState,
      experience: parseFloat(formState.experience) || 1,
      age: parseInt(formState.age) || 20,
      completedJobs: parseInt(formState.completedJobs) || 0,
      successRate: parseInt(formState.successRate) || 100,
      technologies: formState.technologies.split(',').map(s => s.trim()).filter(Boolean),
      skills: formState.skills.split(',').map(s => s.trim()).filter(Boolean),
      languages: formState.languages.split(',').map(s => s.trim()).filter(Boolean),
      portfolio: formPortfolio.map(p => ({
        ...p,
        tech: typeof p.tech === 'string' ? p.tech.split(',').map(t => t.trim()).filter(Boolean) : p.tech
      }))
    };

    if (editingFreelancer) {
      onUpdateFreelancer(processedFreelancer);
    } else {
      onAddFreelancer(processedFreelancer);
    }
    
    resetForm();
    setActiveSubTab('list');
  };

  // Portfolio items dynamically
  const updatePortfolioField = (index, field, value) => {
    const updated = [...formPortfolio];
    updated[index][field] = value;
    setFormPortfolio(updated);
  };

  const addPortfolioField = () => {
    setFormPortfolio([...formPortfolio, { title: '', description: '', tech: '', link: '#', image: '' }]);
  };

  const removePortfolioField = (index) => {
    setFormPortfolio(formPortfolio.filter((_, i) => i !== index));
  };

  // Calculations for stats (Flat $50 commission per approved project)
  const totalRevenue = requests
    .filter(r => r.status === 'tasdiqlandi')
    .length * 50;

  return (
    <div style={{ paddingBottom: '5rem' }}>
      
      {/* Admin Panel Header / Sub Navigation */}
      <div className="glass-panel" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 2rem',
        marginBottom: '2rem',
        background: 'rgba(10, 15, 30, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={24} color="var(--accent-purple)" />
          Admin Dashboard
        </h2>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => { setActiveSubTab('stats'); resetForm(); }}
            className={`btn ${activeSubTab === 'stats' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
          >
            Statistika & So'rovlar
          </button>
          <button 
            onClick={() => { setActiveSubTab('list'); resetForm(); }}
            className={`btn ${activeSubTab === 'list' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
          >
            Frilanserlar Ro'yxati ({freelancers.length})
          </button>
          <button 
            onClick={() => { resetForm(); setActiveSubTab('add_edit'); }}
            className={`btn ${activeSubTab === 'add_edit' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', background: activeSubTab === 'add_edit' ? 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-blue) 100%)' : 'rgba(255,255,255,0.05)' }}
          >
            <Plus size={16} />
            {editingFreelancer ? "Frilanserni tahrirlash" : "Yangi frilanser"}
          </button>
        </div>
      </div>

      {/* VIEW 1: STATS & REQUESTS */}
      {activeSubTab === 'stats' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
          
          {/* Metrics Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem'
          }} className="metrics-grid">
            
            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '1rem', borderRadius: '20px', color: 'var(--accent-purple)' }}>
                <Users size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Jami Frilanserlar</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{freelancers.length} ta</h3>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '20px', color: 'var(--accent-blue)' }}>
                <MessageSquare size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Loyiha so'rovlari</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{requests.length} ta</h3>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '20px', color: 'var(--accent-green)' }}>
                <DollarSign size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Platforma daromadi</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>${totalRevenue}</h3>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '20px', color: 'var(--accent-orange)' }}>
                <Zap size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Faol Onlayn</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{onlineCount} kishi</h3>
              </div>
            </div>

          </div>

          {/* REQUESTS TABLE */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              Kelib tushgan loyiha so'rovlari ({requests.length})
            </h3>

            {requests.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>Hozircha hech qanday murojaat yo'q.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }} className="admin-table">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Mijoz</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Loyiha Nomi / Ijrochi</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Aloqa</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Vaqti</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Holati</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(req => (
                    <tr key={req.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.85rem' }}>
                      <td style={{ padding: '1rem', fontWeight: 'bold' }}>{req.clientName}</td>
                      <td style={{ padding: '1rem' }}>
                        <div>{req.projectName}</div>
                        {req.creatorInfo && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 600 }}>
                            Ijrochi: {req.creatorInfo}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>{req.phone}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)' }}>@{req.telegram}</span>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {req.createdAt ? new Date(req.createdAt).toLocaleDateString('uz-UZ') : "Bugun"}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge ${req.status === 'tasdiqlandi' ? 'badge-green' : req.status === 'rad etildi' ? 'badge-red' : 'badge-orange'}`}>
                          {req.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          {req.status === 'kutilmoqda' && (
                            <>
                              <button 
                                onClick={() => onUpdateRequestStatus(req.id, 'tasdiqlandi')}
                                style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', border: '1px solid rgba(16, 185, 129, 0.3)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                title="Tasdiqlash"
                              >
                                <Check size={14} />
                              </button>
                              <button 
                                onClick={() => onUpdateRequestStatus(req.id, 'rad etildi')}
                                style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', border: '1px solid rgba(239, 68, 68, 0.3)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                title="Rad etish"
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => { if(confirm("Murojaatni o'chirasizmi?")) onDeleteRequest(req.id); }}
                            style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.08)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            title="O'chirish"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      )}

      {/* VIEW 2: FREELANCER TABLE LIST */}
      {activeSubTab === 'list' && (
        <div className="glass-card animate-fade-in" style={{ padding: '2rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }} className="admin-table">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <th style={{ padding: '1rem' }}>Rasm</th>
                <th style={{ padding: '1rem' }}>Ism-sharif</th>
                <th style={{ padding: '1rem' }}>Kasbi / Kategoriya</th>
                <th style={{ padding: '1rem' }}>Ko'rinish Rejimi</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {freelancers.map(fl => (
                <tr key={fl.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <img 
                      src={fl.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} 
                      alt={fl.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {fl.name}
                      {fl.verified && <ShieldCheck size={14} color="var(--accent-blue)" />}
                      {fl.premium && <Zap size={14} color="var(--accent-purple)" />}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div>{fl.profession}</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{fl.category}</span>
                  </td>

                  {/* Hidden / Public Visibility Column */}
                  <td style={{ padding: '1rem' }}>
                    <button 
                      onClick={() => onUpdateFreelancer({ ...fl, hidden: !fl.hidden })}
                      style={{
                        background: fl.hidden ? 'rgba(168, 85, 247, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                        color: fl.hidden ? '#c084fc' : '#60a5fa',
                        border: '1px solid ' + (fl.hidden ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'),
                        padding: '0.25rem 0.65rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                      title="Bosh sahifada ko'rinish holatini o'zgartirish"
                    >
                      {fl.hidden ? <EyeOff size={12} /> : <Eye size={12} />}
                      {fl.hidden ? "🔒 Yashirin (Kim Yaratadi)" : "👁️ Ommaviy"}
                    </button>
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button 
                        onClick={() => onUpdateFreelancer({ ...fl, verified: !fl.verified })}
                        className={`badge ${fl.verified ? 'badge-blue' : 'badge-orange'}`}
                        style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                      >
                        {fl.verified ? "Tasdiqlangan" : "Kutmoqda"}
                      </button>
                      <button 
                        onClick={() => onUpdateFreelancer({ ...fl, premium: !fl.premium })}
                        className={`badge ${fl.premium ? 'badge-purple' : 'badge-orange'}`}
                        style={{ border: 'none', cursor: 'pointer', outline: 'none', background: !fl.premium ? 'rgba(255,255,255,0.03)' : '', color: !fl.premium ? 'var(--text-muted)' : '', borderColor: !fl.premium ? 'rgba(255,255,255,0.08)' : '' }}
                      >
                        Premium
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleEditClick(fl)}
                        style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', border: '1px solid rgba(59, 130, 246, 0.3)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        title="Tahrirlash"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => { if (confirm(`${fl.name} profili butunlay o'chirilsinmi?`)) onDeleteFreelancer(fl.id); }}
                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', border: '1px solid rgba(239, 68, 68, 0.3)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        title="O'chirish"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 3: ADD OR EDIT FORM */}
      {activeSubTab === 'add_edit' && (
        <div className="glass-card animate-fade-in" style={{ padding: '2.5rem', maxWidth: '850px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
            {editingFreelancer ? `Frilanserni tahrirlash: ${editingFreelancer.name}` : "Yangi foydalanuvchi / frilanser qo'shish"}
          </h3>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Visibility Option Banner */}
            <div style={{
              background: formState.hidden ? 'rgba(168, 85, 247, 0.12)' : 'rgba(59, 130, 246, 0.12)',
              border: '1px solid ' + (formState.hidden ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'),
              borderRadius: '16px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {formState.hidden ? <EyeOff size={18} color="#c084fc" /> : <Eye size={18} color="#60a5fa" />}
                  {formState.hidden ? "🔒 Yashirin Foydalanuvchi (Tavsiya etiladi)" : "👁️ Bosh sahifada ommaviy ko'rinadi"}
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {formState.hidden 
                    ? "Bosh sahifada ko'rinmaydi. Faqat 'Kim Yaratadi?', 'Startap qurish' va 'Buyurtma berish' tugmalari bosilganda ko'rinadi."
                    : "Bosh sahifada barcha foydalanuvchilarga darhol ommaviy ro'yxatda ko'rinadi."}
                </p>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', padding: '0.5rem 1rem', borderRadius: '12px', whiteSpace: 'nowrap' }}>
                <input
                  type="checkbox"
                  checked={formState.hidden}
                  onChange={(e) => setFormState(prev => ({ ...prev, hidden: e.target.checked }))}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Yashirish</span>
              </label>
            </div>

            {/* Row 1: Name, Profession, Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }} className="form-grid-3">
              <div className="form-group">
                <label>Ismi va sharifi *</label>
                <input
                  type="text"
                  placeholder="Masalan: Sardor Karimov"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  className="input-dark"
                  style={{ borderColor: errors.name ? 'var(--accent-red)' : '' }}
                />
                {errors.name && <span style={{ color: 'var(--accent-red)', fontSize: '0.7rem' }}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Mutaxassislik unvoni *</label>
                <input
                  type="text"
                  placeholder="Masalan: Lead Frontend Engineer"
                  value={formState.profession}
                  onChange={(e) => setFormState(prev => ({ ...prev, profession: e.target.value }))}
                  className="input-dark"
                  style={{ borderColor: errors.profession ? 'var(--accent-red)' : '' }}
                />
                {errors.profession && <span style={{ color: 'var(--accent-red)', fontSize: '0.7rem' }}>{errors.profession}</span>}
              </div>

              <div className="form-group">
                <label>Asosiy kategoriya</label>
                <select
                  value={formState.category}
                  onChange={(e) => setFormState(prev => ({ ...prev, category: e.target.value }))}
                  className="input-dark"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Experience, Age, Location, Completed Jobs, Success Rate */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '0.75rem' }} className="form-grid-5">
              <div className="form-group">
                <label>Tajriba (yil)</label>
                <input
                  type="number"
                  min="0"
                  value={formState.experience}
                  onChange={(e) => setFormState(prev => ({ ...prev, experience: e.target.value }))}
                  className="input-dark"
                />
              </div>

              <div className="form-group">
                <label>Yoshi</label>
                <input
                  type="number"
                  min="16"
                  value={formState.age}
                  onChange={(e) => setFormState(prev => ({ ...prev, age: e.target.value }))}
                  className="input-dark"
                />
              </div>

              <div className="form-group">
                <label>Viloyat / Hudud</label>
                <select
                  value={formState.location}
                  onChange={(e) => setFormState(prev => ({ ...prev, location: e.target.value }))}
                  className="input-dark"
                >
                  {REGIONS.filter(r => r !== "Barchasi").map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Bajarilgan ishlar</label>
                <input
                  type="number"
                  min="0"
                  value={formState.completedJobs}
                  onChange={(e) => setFormState(prev => ({ ...prev, completedJobs: e.target.value }))}
                  className="input-dark"
                />
              </div>

              <div className="form-group">
                <label>Muvaffaqiyat (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formState.successRate}
                  onChange={(e) => setFormState(prev => ({ ...prev, successRate: e.target.value }))}
                  className="input-dark"
                />
              </div>
            </div>

            {/* Row 3: Image Upload & File Preview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid-2">
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Upload size={14} />
                  Profil rasmini yuklash (JPG / PNG)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'avatar')}
                  style={{ display: 'none' }}
                  id="avatar-upload"
                />
                <label 
                  htmlFor="avatar-upload"
                  className="input-dark"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderStyle: 'dashed'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {imageFileName || "Rasm tanlang..."}
                  </span>
                  <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>Fayl yuklash</span>
                </label>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Upload size={14} />
                  Rezyume yuklash (PDF Preview)
                </label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleFileChange(e, 'resumeUrl')}
                  style={{ display: 'none' }}
                  id="resume-upload"
                />
                <label 
                  htmlFor="resume-upload"
                  className="input-dark"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderStyle: 'dashed'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {formState.resumeUrl !== '#' ? "Rezyume kiritilgan.pdf" : "PDF fayl tanlang..."}
                  </span>
                  <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>Fayl yuklash</span>
                </label>
              </div>
            </div>

            {/* Row 4: Short Bio & About Me */}
            <div className="form-group">
              <label>Qisqa biografiya (Karta ustida ko'rinadi) *</label>
              <input
                type="text"
                placeholder="Dasturchining 1 qatorlik ta'rifi..."
                value={formState.shortBio}
                onChange={(e) => setFormState(prev => ({ ...prev, shortBio: e.target.value }))}
                className="input-dark"
                style={{ borderColor: errors.shortBio ? 'var(--accent-red)' : '' }}
              />
              {errors.shortBio && <span style={{ color: 'var(--accent-red)', fontSize: '0.7rem' }}>{errors.shortBio}</span>}
            </div>

            <div className="form-group">
              <label>Batafsil ma'lumot (Men haqimda)</label>
              <textarea
                rows={4}
                placeholder="O'zingiz va ish uslubingiz haqida to'liq yozing..."
                value={formState.aboutMe}
                onChange={(e) => setFormState(prev => ({ ...prev, aboutMe: e.target.value }))}
                className="input-dark"
                style={{ resize: 'vertical', borderRadius: '8px' }}
              />
            </div>

            {/* Row 5: Technologies, Skills, Languages */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }} className="form-grid-3">
              <div className="form-group">
                <label>Texnologiyalar (vergul bilan ajrating)</label>
                <input
                  type="text"
                  placeholder="React, NextJS, NodeJS"
                  value={formState.technologies}
                  onChange={(e) => setFormState(prev => ({ ...prev, technologies: e.target.value }))}
                  className="input-dark"
                />
              </div>

              <div className="form-group">
                <label>Ko'nikmalar (vergul bilan ajrating)</label>
                <input
                  type="text"
                  placeholder="CI/CD, API integration, Figma"
                  value={formState.skills}
                  onChange={(e) => setFormState(prev => ({ ...prev, skills: e.target.value }))}
                  className="input-dark"
                />
              </div>

              <div className="form-group">
                <label>Tillar (vergul bilan ajrating)</label>
                <input
                  type="text"
                  placeholder="O'zbekcha (Ona tili), Inglizcha"
                  value={formState.languages}
                  onChange={(e) => setFormState(prev => ({ ...prev, languages: e.target.value }))}
                  className="input-dark"
                />
              </div>
            </div>

            {/* Row 6: Contact links */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '0.75rem' }} className="form-grid-5">
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Telefon raqami *</label>
                <input
                  type="text"
                  placeholder="+998 90 123 45 67"
                  value={formState.phone}
                  onChange={(e) => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                  className="input-dark"
                  style={{ borderColor: errors.phone ? 'var(--accent-red)' : '' }}
                />
                {errors.phone && <span style={{ color: 'var(--accent-red)', fontSize: '0.7rem' }}>{errors.phone}</span>}
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Telegram Username *</label>
                <input
                  type="text"
                  placeholder="telegram_username"
                  value={formState.telegram}
                  onChange={(e) => setFormState(prev => ({ ...prev, telegram: e.target.value }))}
                  className="input-dark"
                  style={{ borderColor: errors.telegram ? 'var(--accent-red)' : '' }}
                />
                {errors.telegram && <span style={{ color: 'var(--accent-red)', fontSize: '0.7rem' }}>{errors.telegram}</span>}
              </div>

              <div className="form-group">
                <label>Elektron pochta</label>
                <input
                  type="email"
                  placeholder="info@gmail.com"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="input-dark"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid-2">
              <div className="form-group">
                <label>GitHub Havolasi</label>
                <input
                  type="text"
                  placeholder="https://github.com/..."
                  value={formState.github}
                  onChange={(e) => setFormState(prev => ({ ...prev, github: e.target.value }))}
                  className="input-dark"
                />
              </div>

              <div className="form-group">
                <label>LinkedIn Havolasi</label>
                <input
                  type="text"
                  placeholder="https://linkedin.com/in/..."
                  value={formState.linkedin}
                  onChange={(e) => setFormState(prev => ({ ...prev, linkedin: e.target.value }))}
                  className="input-dark"
                />
              </div>
            </div>

            {/* Dynamic Portfolio Items */}
            <div style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>Portfolio ishlari ({formPortfolio.length})</h4>
                <button type="button" onClick={addPortfolioField} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: '6px' }}>
                  <Plus size={12} /> Loyiha qo'shish
                </button>
              </div>

              {formPortfolio.map((p, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 30px', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }} className="portfolio-row">
                  <input
                    type="text"
                    placeholder="Loyiha nomi"
                    value={p.title}
                    onChange={(e) => updatePortfolioField(idx, 'title', e.target.value)}
                    className="input-dark"
                    style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Tavsif"
                    value={p.description}
                    onChange={(e) => updatePortfolioField(idx, 'description', e.target.value)}
                    className="input-dark"
                    style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Texnologiyalar"
                    value={p.tech}
                    onChange={(e) => updatePortfolioField(idx, 'tech', e.target.value)}
                    className="input-dark"
                    style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Havola (URL)"
                    value={p.link}
                    onChange={(e) => updatePortfolioField(idx, 'link', e.target.value)}
                    className="input-dark"
                    style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => removePortfolioField(idx)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-red)', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkbox triggers */}
            <div style={{ display: 'flex', gap: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  checked={formState.verified}
                  onChange={(e) => setFormState(prev => ({ ...prev, verified: e.target.checked }))}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                Tasdiqlangan frilanser
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  checked={formState.premium}
                  onChange={(e) => setFormState(prev => ({ ...prev, premium: e.target.checked }))}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                Premium ko'rinish
              </label>
            </div>

            {/* Warning banner if validation failed */}
            {Object.keys(errors).length > 0 && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: 'var(--accent-red)',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textAlign: 'center',
                marginTop: '1rem'
              }}>
                Majburiy maydonlar to'ldirilmagan! Yuqoridagi qizil xatoliklarni tekshiring.
              </div>
            )}

            {/* Form actions */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.85rem' }}>
                {editingFreelancer ? "O'zgarishlarni saqlash" : "Ro'yxatga qo'shish"}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary" style={{ padding: '0.85rem 1.5rem' }}>
                Bekor qilish
              </button>
            </div>

          </form>
        </div>
      )}

      <style>{`
        .admin-table th, .admin-table td {
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .admin-table tr:hover {
          background: rgba(255,255,255,0.01);
        }
        @media (max-width: 900px) {
          .metrics-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .form-grid-3, .form-grid-5, .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
          .portfolio-row {
            grid-template-columns: 1fr !important;
            gap: 0.25rem !important;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            padding-bottom: 0.5rem;
          }
        }
        @media (max-width: 500px) {
          .metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
