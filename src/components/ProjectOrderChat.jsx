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

  const [step, setStep] = useState(1); // 1: Select Service, 2: Description, 3: Deadline, 4: Name & Phone, 5: Submitted
  const [selectedService, setSelectedService] = useState(null);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [urgency, setUrgency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deadlineInputVal, setDeadlineInputVal] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [inputVal, setInputVal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const chatEndRef = useRef(null);

  const formatDateUz = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
    return `${d.getDate()}-${months[d.getMonth()]} ${d.getFullYear()}`;
  };

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

    let defaultDays = 10;
    let defaultLabel = '10 kun';
    if (selectedService) {
      if (selectedService.id === 'bot' || selectedService.title.toLowerCase().includes('bot')) {
        defaultDays = 5;
        defaultLabel = '5 kun';
      } else if (selectedService.id === 'startup' || selectedService.title.toLowerCase().includes('startap')) {
        defaultDays = 30;
        defaultLabel = '1 oy (30 kun)';
      } else {
        defaultDays = 10;
        defaultLabel = '10 kun';
      }
    }

    const startStr = formatDateUz(0);
    const endStr = formatDateUz(defaultDays);
    setStartDate(startStr);
    setEndDate(endStr);
    const autoDeadlineText = `${startStr} dan ${endStr} gacha (${defaultLabel})`;
    setDeadline(autoDeadlineText);

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text
    };

    const botMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: "⚡ Loyihangiz tayyorlanish rejimini tanlang: Shoshilinch (Tezkor) yoki Shoshilinch emas (yoki o'z muhlatingizni kiriting):"
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setStep(3);
  };

  const handleSendDeadline = (presetDeadline, presetUrgency = null) => {
    const val = (presetDeadline || deadlineInputVal || deadline).trim();
    if (!val) {
      alert("Iltimos, topshirish muddatini tanlang yoki kiriting!");
      return;
    }

    let urgencyTag = presetUrgency;
    if (!urgencyTag) {
      if (val.toLowerCase().includes('shoshilinch emas')) urgencyTag = '⏳ Shoshilinch emas';
      else if (val.toLowerCase().includes('shoshilinch') || val.toLowerCase().includes('tezkor')) urgencyTag = '🚨 TEZKOR (Shoshilinch)';
      else urgencyTag = 'Standard';
    }

    setDeadline(val);
    setUrgency(urgencyTag);
    setDeadlineInputVal('');

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: `⏱ Topshirish muddati: ${val}\n⚡ Rejim: ${urgencyTag}`
    };

    const botMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: "Tushundim! Endi siz bilan bog'lanishimiz uchun ismingiz va telefon raqamingizni kiriting:"
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setStep(4);
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
      deadline: deadline || 'Ko\'rsatilmadi',
      urgency: urgency || 'Standard',
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
      text: `✅ Rahmat! Buyurtmangiz muvaffaqiyatli qabul qilindi.\n⏱ Topshirish muddati: ${deadline || 'Ko\'rsatilmadi'}\nMutaxassislarimiz va asoschilarimiz siz ko'rsatgan telefon raqami orqali tez orada bog'lanishadi! 🚀`,
      type: 'success'
    };

    // Update messages and set step immediately without waiting!
    setMessages(prev => [...prev, userMsg, botSuccessMsg]);
    setStep(5);

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
    <div className="project-order-chat-container animate-fade-in">
      <div className="glass-card project-order-chat-card">

        {/* Chat Header */}
        <div className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="chat-bot-avatar">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="chat-title">
                Loyiha Buyurtma Chati <Sparkles size={16} className="chat-sparkle-icon" />
              </h3>
              <span className="chat-online-badge">
                <span className="online-dot" /> Avto-Assistant Online
              </span>
            </div>
          </div>

          <div className="chat-tag">
            Tezkor & Avtomatik
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="chat-messages-body">
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
                maxWidth: '88%'
              }}>
                <div className={msg.sender === 'user' ? 'chat-avatar-user' : 'chat-avatar-bot'}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>

                <div 
                  className={msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}
                >
                  {msg.text}
                </div>
              </div>

              {/* Service Options Cards inside chat */}
              {msg.type === 'options' && step === 1 && (
                <div className="chat-options-wrapper">
                  {msg.options.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectService(opt)}
                      className="glass-card chat-service-card"
                    >
                      <div>
                        <h4 className="chat-service-title">
                          {opt.title}
                        </h4>
                        <p className="chat-service-desc">
                          {opt.desc}
                        </p>
                      </div>

                      <div className="chat-service-footer">
                        <span className="chat-service-price">
                          {opt.price}
                        </span>
                        <button className="btn chat-service-btn">
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
        <div className="chat-input-area">
          {step === 2 && (
            <form onSubmit={handleSendDescription} className="chat-form-step2">
              <input
                type="text"
                required
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Loyihangiz haqida ma'lumot kiriting..."
                className="chat-text-input"
                autoFocus
              />
              <button
                type="submit"
                className="btn chat-submit-btn"
              >
                Yuborish <Send size={16} />
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="chat-deadline-area">
              <div className="chat-deadline-label">
                <span>⏱ Topshirish muddatini tasdiqlang yoki boshqasini tanlang:</span>
              </div>
              <div className="chat-deadline-chips">
                <button
                  type="button"
                  onClick={() => handleSendDeadline("⚡ TEZKOR (Shoshilinch - Eng qisqa muddatda)", "🚨 TEZKOR (Shoshilinch)")}
                  className="deadline-chip"
                  style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', borderColor: '#f87171', color: '#fff', fontWeight: 'bold', flex: 1, minWidth: '140px', textAlign: 'center', padding: '0.75rem' }}
                >
                  🚨 SHOSHILINCH (TEZKOR)
                </button>
                <button
                  type="button"
                  onClick={() => handleSendDeadline("⏳ Shoshilinch emas (Oddiy rejim)", "⏳ Shoshilinch emas")}
                  className="deadline-chip"
                  style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderColor: '#60a5fa', color: '#fff', fontWeight: 'bold', flex: 1, minWidth: '140px', textAlign: 'center', padding: '0.75rem' }}
                >
                  ⏳ SHOSHILINCH EMAS
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSendDeadline(); }} className="chat-form-step2" style={{ marginTop: '0.65rem' }}>
                <input
                  type="text"
                  value={deadlineInputVal}
                  onChange={(e) => setDeadlineInputVal(e.target.value)}
                  placeholder="Yoki o'zingiz muddat yozing (masalan: 10 kun ichida)..."
                  className="chat-text-input"
                  autoFocus
                />
                <button
                  type="submit"
                  className="btn chat-submit-btn"
                >
                  Yuborish <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmitFinal} className="chat-form-step3">
              <div className="chat-inputs-grid">
                <div>
                  <label className="chat-input-label">Ismingiz:</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onKeyDown={handleKeyDownFinal}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Masalan: Sayfulloh Zokirov"
                    className="chat-text-input"
                  />
                </div>
                <div>
                  <label className="chat-input-label">Telefon raqamingiz:</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onKeyDown={handleKeyDownFinal}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="chat-text-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn chat-final-submit-btn"
              >
                {isSubmitting ? 'Yuborilmoqda...' : '🚀 Buyurtmani Yuborish (Telegram xabar yuboriladi)'}
              </button>
            </form>
          )}

          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '0.35rem 0' }}>
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedService(null);
                  setDescription('');
                  setDeadline('');
                  setDeadlineInputVal('');
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
                className="btn btn-secondary chat-reset-btn"
              >
                Yangi Buyurtma Berish
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* ====================================================== */
        /* BASE & NOTEBOOK / DESKTOP STYLES (min-width: 1025px) */
        /* ====================================================== */
        .project-order-chat-container {
          max-width: 720px;
          margin: 1rem auto;
          width: 100%;
        }
        .project-order-chat-card {
          border-radius: 20px;
          border: 1px solid rgba(168, 85, 247, 0.35);
          background: linear-gradient(145deg, rgba(14, 18, 36, 0.96) 0%, rgba(6, 9, 20, 0.98) 100%);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(168, 85, 247, 0.15);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: auto;
          min-height: 320px;
          max-height: 580px;
        }
        .chat-header {
          padding: 0.85rem 1.25rem;
          background: rgba(168, 85, 247, 0.12);
          border-bottom: 1px solid rgba(168, 85, 247, 0.25);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .chat-bot-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
          flex-shrink: 0;
        }
        .chat-title {
          font-size: 1rem;
          font-weight: 800;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .chat-sparkle-icon {
          color: #c084fc;
        }
        .chat-online-badge {
          font-size: 0.74rem;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-weight: 600;
        }
        .online-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
          box-shadow: 0 0 8px #10b981;
        }
        .chat-tag {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 0.25rem 0.75rem;
          font-size: 0.74rem;
          color: var(--text-secondary);
        }
        .chat-messages-body {
          flex: 1;
          padding: 1rem 1.25rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        .chat-avatar-user {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8 0%, #10b981 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        .chat-avatar-bot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        .chat-bubble-bot {
          background: rgba(20, 26, 48, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px 16px 16px 4px;
          padding: 0.75rem 1rem;
          color: #ffffff;
          font-size: 0.88rem;
          line-height: 1.45;
          white-space: pre-line;
          box-shadow: 0 3px 12px rgba(0,0,0,0.2);
        }
        .chat-bubble-user {
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          border-radius: 16px 16px 4px 16px;
          padding: 0.75rem 1rem;
          color: #ffffff;
          font-size: 0.88rem;
          line-height: 1.45;
          white-space: pre-line;
          box-shadow: 0 3px 12px rgba(37, 99, 235, 0.25);
        }
        .chat-options-wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 0.65rem;
          width: 100%;
          margin-top: 0.35rem;
          padding-left: 2rem;
        }
        .chat-service-card {
          padding: 0.85rem;
          border-radius: 14px;
          cursor: pointer;
          background: linear-gradient(145deg, rgba(20, 28, 55, 0.85) 0%, rgba(10, 15, 30, 0.95) 100%);
          border: 1px solid rgba(168, 85, 247, 0.3);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .chat-service-card:hover {
          border-color: #c084fc;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(168, 85, 247, 0.25);
        }
        .chat-service-title {
          font-size: 0.9rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.2rem;
        }
        .chat-service-desc {
          font-size: 0.74rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }
        .chat-service-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.3rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 0.4rem;
        }
        .chat-service-price {
          font-size: 0.92rem;
          font-weight: 800;
          color: #10b981;
        }
        .chat-service-btn {
          padding: 0.22rem 0.65rem;
          font-size: 0.72rem;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          color: #fff;
          border-radius: 16px;
        }
        .chat-input-area {
          padding: 0.85rem 1.25rem;
          background: rgba(10, 14, 28, 0.96);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .chat-form-step2 {
          display: flex;
          gap: 0.75rem;
        }
        .chat-text-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          padding: 0.85rem 1.25rem;
          color: #ffffff;
          font-size: 0.92rem;
          outline: none;
          transition: all 0.25s ease;
        }
        .chat-text-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 16px rgba(59, 130, 246, 0.35);
        }
        .chat-submit-btn {
          padding: 0.85rem 1.5rem;
          border-radius: 16px;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #10b981 100%);
          color: #fff;
        }
        .chat-form-step3 {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .chat-inputs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .chat-input-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
          display: block;
        }
        .chat-final-submit-btn {
          width: 100%;
          padding: 0.85rem;
          font-size: 0.95rem;
          background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
          font-weight: 700;
          color: #fff;
          border-radius: 14px;
        }
        .chat-deadline-area {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .chat-deadline-label {
          font-size: 0.78rem;
          color: #c084fc;
          font-weight: 700;
        }
        .chat-deadline-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .deadline-chip {
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.3);
          color: #ffffff;
          padding: 0.45rem 0.85rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .deadline-chip:hover {
          background: rgba(168, 85, 247, 0.3);
          border-color: #c084fc;
          transform: translateY(-1px);
        }
        .chat-reset-btn {
          padding: 0.65rem 1.5rem;
          font-size: 0.85rem;
        }

        /* ====================================================== */
        /* PLANSHETLAR / TABLET DESIGN (641px - 1024px)          */
        /* ====================================================== */
        @media (min-width: 641px) and (max-width: 1024px) {
          .project-order-chat-container {
            max-width: 95%;
            margin: 1.25rem auto;
          }
          .project-order-chat-card {
            border-radius: 20px;
            height: auto;
            min-height: 340px;
            max-height: 580px;
            background: linear-gradient(145deg, rgba(8, 25, 42, 0.96) 0%, rgba(5, 15, 28, 0.98) 100%);
            border: 1px solid rgba(6, 182, 212, 0.35);
            box-shadow: 0 16px 45px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.2);
          }
          .chat-header {
            background: rgba(6, 182, 212, 0.12);
            border-bottom: 1px solid rgba(6, 182, 212, 0.25);
            padding: 1.1rem 1.4rem;
          }
          .chat-bot-avatar {
            background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
          }
          .chat-sparkle-icon {
            color: #38bdf8;
          }
          .chat-bubble-bot {
            background: rgba(12, 30, 48, 0.95);
            border-color: rgba(6, 182, 212, 0.25);
          }
          .chat-bubble-user {
            background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);
          }
          .chat-avatar-bot {
            background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          }
          .chat-avatar-user {
            background: linear-gradient(135deg, #38bdf8 0%, #10b981 100%);
          }
          .chat-options-wrapper {
            grid-template-columns: repeat(2, 1fr);
            padding-left: 1.5rem;
          }
          .chat-service-card {
            background: linear-gradient(145deg, rgba(12, 34, 56, 0.85) 0%, rgba(6, 20, 36, 0.95) 100%);
            border: 1px solid rgba(6, 182, 212, 0.3);
          }
          .chat-service-card:hover {
            border-color: #38bdf8;
          }
          .chat-service-btn {
            background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);
          }
        }

        /* ====================================================== */
        /* TELEFONLAR / MOBILE OQ-YASHIL DESIGN (<= 640px)       */
        /* ====================================================== */
        @media (max-width: 640px) {
          .project-order-chat-container {
            margin: 0 !important;
            padding: 0 !important;
            max-width: 100vw !important;
            width: 100vw !important;
          }
          .project-order-chat-card {
            border-radius: 0px !important;
            /* HEIGHT FIX: Fixed percentage/vh so height doesn't shift up and down on scroll */
            height: clamp(500px, 72dvh, 600px) !important;
            max-height: 72dvh !important;
            margin: 0 !important;
            border: none !important;
            /* MOBILE OQ-YASHIL LIGHT SLATE / EMERALD DARK THEME */
            background: linear-gradient(160deg, #021a14 0%, #052a20 50%, #02140f 100%) !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(16, 185, 129, 0.25) !important;
            touch-action: pan-y;
          }
          .chat-header {
            background: rgba(16, 185, 129, 0.16) !important;
            border-bottom: 1px solid rgba(16, 185, 129, 0.3) !important;
            padding: 0.85rem 1rem !important;
          }
          .chat-bot-avatar {
            width: 36px !important;
            height: 36px !important;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            box-shadow: 0 0 12px rgba(16, 185, 129, 0.5) !important;
          }
          .chat-title {
            font-size: 0.98rem !important;
            color: #ffffff !important;
          }
          .chat-sparkle-icon {
            color: #34d399 !important;
          }
          .chat-tag {
            font-size: 0.7rem !important;
            padding: 0.25rem 0.6rem !important;
            border-color: rgba(16, 185, 129, 0.3) !important;
            color: #a7f3d0 !important;
            background: rgba(16, 185, 129, 0.1) !important;
          }
          .chat-messages-body {
            padding: 1rem 0.85rem !important;
            gap: 1rem !important;
            /* Lock internal vertical scroll, avoid body bounce */
            overscroll-behavior: contain !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .chat-avatar-bot {
            width: 28px !important;
            height: 28px !important;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
          }
          .chat-avatar-user {
            width: 28px !important;
            height: 28px !important;
            background: linear-gradient(135deg, #ffffff 0%, #34d399 100%) !important;
            color: #042f22 !important;
          }
          .chat-bubble-bot {
            background: rgba(4, 38, 29, 0.95) !important;
            border: 1px solid rgba(16, 185, 129, 0.3) !important;
            color: #ffffff !important;
            font-size: 0.88rem !important;
            padding: 0.75rem 1rem !important;
            border-radius: 16px 16px 16px 4px !important;
          }
          .chat-bubble-user {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            color: #ffffff !important;
            border: none !important;
            font-size: 0.88rem !important;
            padding: 0.75rem 1rem !important;
            border-radius: 16px 16px 4px 16px !important;
            box-shadow: 0 3px 12px rgba(16, 185, 129, 0.35) !important;
          }
          .chat-options-wrapper {
            display: flex !important;
            flex-direction: column !important;
            padding-left: 0 !important;
            gap: 0.75rem !important;
            width: 100% !important;
          }
          .chat-service-card {
            background: linear-gradient(145deg, rgba(6, 44, 34, 0.9) 0%, rgba(3, 26, 20, 0.95) 100%) !important;
            border: 1px solid rgba(16, 185, 129, 0.4) !important;
            width: 100% !important;
            padding: 0.95rem !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4) !important;
          }
          .chat-service-title {
            color: #ffffff !important;
            font-size: 0.92rem !important;
          }
          .chat-service-desc {
            color: #d1fae5 !important;
            font-size: 0.76rem !important;
          }
          .chat-service-price {
            color: #34d399 !important;
            font-size: 0.95rem !important;
          }
          .chat-service-btn {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            color: #ffffff !important;
            border: none !important;
            box-shadow: 0 2px 10px rgba(16, 185, 129, 0.4) !important;
          }
          .chat-input-area {
            background: rgba(2, 20, 15, 0.98) !important;
            border-top: 1px solid rgba(16, 185, 129, 0.25) !important;
            padding: 0.85rem 1rem !important;
          }
          /* Stack inputs vertically on mobile in Step 3 */
          .chat-inputs-grid {
            grid-template-columns: 1fr !important;
            gap: 0.6rem !important;
          }
          .chat-input-label {
            color: #a7f3d0 !important;
          }
          .chat-text-input {
            background: rgba(255, 255, 255, 0.08) !important;
            border: 1px solid rgba(16, 185, 129, 0.35) !important;
            color: #ffffff !important;
            padding: 0.75rem 1rem !important;
            font-size: 0.88rem !important;
            border-radius: 12px !important;
          }
          .chat-text-input:focus {
            border-color: #34d399 !important;
            box-shadow: 0 0 12px rgba(52, 211, 153, 0.4) !important;
            outline: none;
          }
          .chat-submit-btn {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            color: #ffffff !important;
            padding: 0.75rem 1.25rem !important;
            border-radius: 12px !important;
          }
          .chat-final-submit-btn {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            color: #ffffff !important;
            padding: 0.8rem !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4) !important;
          }
        }
      `}</style>
    </div>
  );
}
