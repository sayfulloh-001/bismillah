import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, CheckCircle2, Sparkles, MessageSquare, Phone, Globe, Rocket, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectOrderChat({ onSubmitOrder }) {
  const { t, lang } = useLanguage();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: t('botGreeting'),
        type: 'options',
        options: [
          { id: 'bot', title: t('tgBotTitle'), price: t('tgBotPrice'), desc: t('tgBotDesc') },
          { id: 'website', title: t('websiteTitle'), price: t('websitePrice'), desc: t('websiteDesc') },
          { id: 'startup', title: t('startupTitle'), price: t('startupPrice'), desc: t('startupDesc') }
        ]
      }
    ]);
  }, [lang]);

  const [step, setStep] = useState(1); // 1: Select Service, 2: Description, 3: Name & Phone, 4: Submitted
  const [selectedService, setSelectedService] = useState(null);
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [inputVal, setInputVal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, step]);

  const handleSelectService = (service) => {
    setSelectedService(service);
    
    // User message
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: `${service.title} (${service.price})`
    };

    // Bot next question
    const botMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: `Ajoyib tanlov! ${service.title} bo'yicha loyihangiz haqida qisqacha ma'lumot yoki talablaringizni yozib qoldiring:`
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setStep(2);
  };

  const handleSendDescription = (e) => {
    if (e) e.preventDefault();
    const text = inputVal.trim();
    if (!text) {
      alert("Iltimos, loyihangiz haqida ma'lumot kiriting!");
      return;
    }

    setDescription(text);
    setInputVal('');

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text
    };

    const botMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: "Tushundim! Endi siz bilan bog'lanishimiz uchun ismingiz va telefon raqamingizni kiriting:"
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setStep(3);
  };

  const submittingRef = useRef(false);

  const handleSubmitFinal = (e) => {
    if (e) e.preventDefault();
    if (submittingRef.current) return;
    
    const nameVal = clientName.trim();
    const phoneVal = phone.trim();

    const count = parseInt(localStorage.getItem('user_submission_count') || '0', 10);
    if (count >= 100) {
      alert("Siz maksimal 100 ta buyurtma yuborishingiz mumkin!");
      return;
    }

    if (!nameVal) {
      alert("Iltimos, ismingizni kiriting!");
      return;
    }

    if (phoneVal === '+998' || phoneVal === '+998 ' || phoneVal.length < 9) {
      alert("Iltimos, to'liq telefon raqamingizni kiriting!");
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    const orderData = {
      serviceType: selectedService ? selectedService.title : 'Loyiha',
      price: selectedService ? selectedService.price : '',
      description: description,
      clientName: nameVal,
      phone: phoneVal,
      createdAt: new Date().toISOString()
    };

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: `Ism: ${nameVal}\nTel: ${phoneVal}`
    };

    const botSuccessMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: "✅ Rahmat! Buyurtmangiz muvaffaqiyatli qabul qilindi.\nMutaxassislarimiz va asoschilarimiz siz ko'rsatgan telefon raqami orqali tez orada bog'lanishadi! 🚀",
      type: 'success'
    };

    // Update messages and set step immediately without waiting!
    setMessages(prev => [...prev, userMsg, botSuccessMsg]);
    setStep(4);

    // Call submit handler in the background
    if (onSubmitOrder) {
      onSubmitOrder(orderData)
        .catch(err => console.error("Error submitting chat order in background:", err))
        .finally(() => {
          submittingRef.current = false;
          setIsSubmitting(false);
        });
    } else {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleKeyDownFinal = (e) => {
    if (e.key === 'Enter') {
      handleSubmitFinal(e);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }} className="animate-fade-in">
      <div className="glass-card" style={{
        borderRadius: '24px',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        background: 'linear-gradient(145deg, rgba(14, 18, 36, 0.95) 0%, rgba(6, 9, 20, 0.98) 100%)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(168, 85, 247, 0.15)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '650px'
      }}>

        {/* Chat Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          background: 'rgba(168, 85, 247, 0.12)',
          borderBottom: '1px solid rgba(168, 85, 247, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              color: '#fff',
              boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)'
            }}>
              <Bot size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Loyiha Buyurtma Chati <Sparkles size={16} color="#c084fc" />
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} /> Avto-Assistant Online
              </span>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '0.35rem 0.85rem',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)'
          }}>
            Tezkor & Avtomatik
          </div>
        </div>

        {/* Chat Messages Body */}
        <div style={{
          flex: 1,
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                gap: '0.5rem'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                maxWidth: '85%'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, #38bdf8 0%, #10b981 100%)' : 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  color: '#fff',
                  flexShrink: 0
                }}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>

                <div style={{
                  background: msg.sender === 'user'
                    ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
                    : 'rgba(20, 26, 48, 0.9)',
                  border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  padding: '0.9rem 1.2rem',
                  color: '#fff',
                  fontSize: '0.92rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}>
                  {msg.text}
                </div>
              </div>

              {/* Service Options Cards inside chat */}
              {msg.type === 'options' && step === 1 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '0.85rem',
                  width: '100%',
                  marginTop: '0.5rem',
                  paddingLeft: '2.5rem'
                }}>
                  {msg.options.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectService(opt)}
                      className="glass-card"
                      style={{
                        padding: '1.1rem',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        background: 'linear-gradient(145deg, rgba(20, 28, 55, 0.8) 0%, rgba(10, 15, 30, 0.9) 100%)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        transition: 'all 0.25s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justify: 'space-between',
                        gap: '0.65rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#c084fc';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>
                          {opt.title}
                        </h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {opt.desc}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#10b981' }}>
                          {opt.price}
                        </span>
                        <button className="btn btn-primary" style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}>
                          Tanlash <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Controls */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'rgba(10, 14, 28, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {step === 2 && (
            <form onSubmit={handleSendDescription} style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                required
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Loyihangiz haqida ma'lumot kiriting..."
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '16px',
                  padding: '0.85rem 1.25rem',
                  color: '#fff',
                  fontSize: '0.92rem'
                }}
                autoFocus
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.5rem', borderRadius: '16px' }}
              >
                Yuborish <Send size={16} />
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmitFinal} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>Ismingiz:</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onKeyDown={handleKeyDownFinal}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Masalan: Sayfulloh Zokirov"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '14px',
                      padding: '0.75rem 1rem',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>Telefon raqamingiz:</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onKeyDown={handleKeyDownFinal}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '14px',
                      padding: '0.75rem 1rem',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '0.95rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                  fontWeight: 700
                }}
              >
                {isSubmitting ? 'Yuborilmoqda...' : '🚀 Buyurtmani Yuborish (Telegram xabar yuboriladi)'}
              </button>
            </form>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedService(null);
                  setDescription('');
                  setClientName('');
                  setPhone('+998 ');
                  setMessages([{
                    id: Date.now().toString(),
                    sender: 'bot',
                    text: "Assalomu alaykum! Yana boshqa turdagi loyihaga buyurtma bermoqchimisiz? 🚀",
                    type: 'options',
                    options: [
                      { id: 'bot', title: '🤖 Telegram Bot yasash', price: '50$ +', desc: 'Tezkor, avtomatlashtirilgan va moslashuvchan botlar' },
                      { id: 'website', title: '🌐 Veb-sayt yasash', price: '200$ +', desc: 'Zamonaviy, responsive va tezkor veb platformalar' },
                      { id: 'startup', title: '🚀 Startap yaratish', price: '400$ +', desc: 'To\'liq arxitektura, MVP, AI va Full-Stack yechimlar' }
                    ]
                  }]);
                }}
                className="btn btn-secondary"
                style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}
              >
                Yangi Buyurtma Berish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
