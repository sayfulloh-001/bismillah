import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, Sparkles, ArrowRight, Mic, 
  Paperclip, Smile, Trash2, Play, Pause, X, CheckCheck, 
  FileText, Image as ImageIcon, RotateCcw 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Helper component to render Telegram voice message note
function VoiceMessageItem({ msg, isUser }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (msg.audioUrl) {
      audioRef.current = new Audio(msg.audioUrl);
      const audio = audioRef.current;

      const handleTimeUpdate = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setProgress(audio.currentTime / audio.duration);
        }
      };
      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
      };
    }
  }, [msg.audioUrl]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.play().catch(err => console.log("Audio play warning:", err));
      setIsPlaying(true);
    }
  };

  const changeSpeed = (e) => {
    e.stopPropagation();
    const rates = [1, 1.5, 2];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const formatDuration = (secs) => {
    const s = Math.floor(secs || 0);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const bars = [40, 75, 45, 90, 60, 30, 85, 100, 70, 50, 95, 65, 40, 80, 55, 90, 70, 45];

  return (
    <div className="tg-voice-player-card">
      <button 
        type="button" 
        onClick={togglePlay} 
        className={`tg-voice-play-btn ${isUser ? 'user-play' : 'bot-play'}`}
        title={isPlaying ? "Pauza" : "Eshitish"}
      >
        {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: '2px' }} />}
      </button>

      <div className="tg-voice-info-body">
        <div className="tg-voice-waveform-container">
          {bars.map((h, i) => {
            const barProgress = i / bars.length;
            const isActive = barProgress <= progress;
            return (
              <span
                key={i}
                className={`tg-wave-bar ${isActive ? 'active' : ''}`}
                style={{ height: `${h}%` }}
              />
            );
          })}
        </div>

        <div className="tg-voice-meta-row">
          <span className="tg-voice-time-label">
            {formatDuration((msg.duration || 5) * (isPlaying ? progress : 1))}
          </span>
          <button type="button" onClick={changeSpeed} className="tg-voice-speed-chip">
            {playbackRate}x
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectOrderChat({ onSubmitOrder }) {
  const { t, lang } = useLanguage();

  // Messages state
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(1); // 1: Select Service, 2: Description, 3: Deadline, 4: Name & Phone, 5: Submitted

  // Order fields
  const [selectedService, setSelectedService] = useState(null);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [urgency, setUrgency] = useState('');
  const [deadlineInputVal, setDeadlineInputVal] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('+998 ');

  // Input bar state
  const [inputVal, setInputVal] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);
  const recordingTimeRef = useRef(0);

  // File input ref
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const submittingRef = useRef(false);

  // Format timestamp like Telegram (08:14)
  const getTgTimestamp = () => {
    const d = new Date();
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const formatDateUz = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
    return `${d.getDate()}-${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Initial bot message setup
  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        timestamp: getTgTimestamp(),
        text: t('botGreeting') || "Assalomu alaykum! Loyihangiz uchun qaysi xizmat turini tanlaysiz?",
        type: 'options',
        options: [
          { id: 'bot', title: t('tgBotTitle') || "🤖 Telegram Bot", price: t('tgBotPrice') || "50$ +", desc: t('tgBotDesc') || "Tezkor, avtomatlashtirilgan va moslashuvchan botlar" },
          { id: 'website', title: t('websiteTitle') || "🌐 Veb-sayt yasash", price: t('websitePrice') || "200$ +", desc: t('websiteDesc') || "Zamonaviy, responsive va tezkor veb platformalar" },
          { id: 'startup', title: t('startupTitle') || "🚀 Startap yaratish", price: t('startupPrice') || "400$ +", desc: t('startupDesc') || "To'liq arxitektura, MVP, AI va Full-Stack yechimlar" }
        ]
      }
    ]);
  }, [lang, t]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, step, isRecording, selectedFile]);

  // Clean up recording stream on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Handler: Select Service Option
  const handleSelectService = (service) => {
    setSelectedService(service);
    
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      timestamp: getTgTimestamp(),
      text: `${service.title} (${service.price})`
    };

    const botMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      timestamp: getTgTimestamp(),
      text: `Ajoyib tanlov! ${service.title} bo'yicha loyihangiz haqida qisqacha ma'lumot yoki talablaringizni yozing (yoki Ovozli xabar 🎙️ yuboring):`
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setStep(2);
  };

  // Handler: Send Text or File Message
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();

    const text = inputVal.trim();
    if (!text && !selectedFile) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      timestamp: getTgTimestamp(),
      text: text,
      file: selectedFile ? { ...selectedFile } : null
    };

    const updatedMessages = [...messages, userMsg];

    if (step === 2) {
      const descText = text || (selectedFile ? `Fayl biriktirildi: ${selectedFile.name}` : "Loyiha talablari yuborildi");
      setDescription(descText);

      let defaultDays = 10;
      let defaultLabel = '10 kun';
      if (selectedService) {
        if (selectedService.id === 'bot' || selectedService.title.toLowerCase().includes('bot')) {
          defaultDays = 5;
          defaultLabel = '5 kun';
        } else if (selectedService.id === 'startup' || selectedService.title.toLowerCase().includes('startap')) {
          defaultDays = 30;
          defaultLabel = '1 oy (30 kun)';
        }
      }

      const startStr = formatDateUz(0);
      const endStr = formatDateUz(defaultDays);
      const autoDeadlineText = `${startStr} dan ${endStr} gacha (${defaultLabel})`;
      setDeadline(autoDeadlineText);

      const botNext = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        timestamp: getTgTimestamp(),
        text: "⚡ Loyihangiz tayyorlanish rejimini tanlang: Shoshilinch (Tezkor) yoki Shoshilinch emas (yoki o'z muhlatingizni yozing):"
      };

      setMessages([...updatedMessages, botNext]);
      setStep(3);
    } else {
      setMessages(updatedMessages);
    }

    setInputVal('');
    setSelectedFile(null);
    setShowEmojiPicker(false);
  };

  // Voice Recording Functions
  const startRecording = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
          const url = URL.createObjectURL(blob);
          finishVoiceRecording(url, recordingTimeRef.current);
        };

        recorder.start();
        setIsRecording(true);
        setRecordingTime(0);
        recordingTimeRef.current = 0;
        
        recordingTimerRef.current = setInterval(() => {
          setRecordingTime(prev => {
            recordingTimeRef.current = prev + 1;
            return prev + 1;
          });
        }, 1000);
      } else {
        startFallbackRecording();
      }
    } catch (err) {
      console.warn("Microphone permission denied or unsupported, using audio simulator fallback:", err);
      startFallbackRecording();
    }
  };

  // Fallback voice simulator when microphone hardware is unavailable
  const startFallbackRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingTimeRef.current = 0;
    
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        recordingTimeRef.current = prev + 1;
        return prev + 1;
      });
    }, 1000);
  };

  const stopAndSendRecording = () => {
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    } else {
      // Create synthetic playable sound blob for fallback
      const durationSecs = Math.max(recordingTimeRef.current, 3);
      const audioUrl = createSyntheticAudioUrl(durationSecs);
      finishVoiceRecording(audioUrl, durationSecs);
    }

    setIsRecording(false);
  };

  const cancelRecording = () => {
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
    setRecordingTime(0);
    recordingTimeRef.current = 0;
  };

  const finishVoiceRecording = (audioUrl, duration) => {
    const userVoiceMsg = {
      id: Date.now().toString(),
      sender: 'user',
      timestamp: getTgTimestamp(),
      type: 'voice',
      audioUrl: audioUrl,
      duration: duration || 5,
      text: '🎤 Ovozli xabar'
    };

    const updatedMessages = [...messages, userVoiceMsg];

    if (step === 2) {
      setDescription(`🎤 Ovozli xabar yuborildi (${duration || 5} sek)`);

      let defaultDays = 10;
      let defaultLabel = '10 kun';
      if (selectedService) {
        if (selectedService.id === 'bot' || selectedService.title.toLowerCase().includes('bot')) {
          defaultDays = 5;
          defaultLabel = '5 kun';
        } else if (selectedService.id === 'startup' || selectedService.title.toLowerCase().includes('startap')) {
          defaultDays = 30;
          defaultLabel = '1 oy (30 kun)';
        }
      }

      const startStr = formatDateUz(0);
      const endStr = formatDateUz(defaultDays);
      const autoDeadlineText = `${startStr} dan ${endStr} gacha (${defaultLabel})`;
      setDeadline(autoDeadlineText);

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        timestamp: getTgTimestamp(),
        text: "🎤 Ovozli xabaringiz qabul qilindi! Mutaxassislarimiz uni tinglab chiqishadi.\n\n⚡ Endi loyihangiz tayyorlanish rejimini tanlang: Shoshilinch (Tezkor) yoki Shoshilinch emas:"
      };

      setMessages([...updatedMessages, botMsg]);
      setStep(3);
    } else {
      const botAck = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        timestamp: getTgTimestamp(),
        text: "🎤 Ovozli xabar qabul qilindi va saqlandi!"
      };
      setMessages([...updatedMessages, botAck]);
    }
  };

  // Helper to generate a clean playable audio sound for browsers without mic
  const createSyntheticAudioUrl = (durationSec = 4) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return '';
      const ctx = new AudioCtx();
      const sr = ctx.sampleRate;
      const length = sr * durationSec;
      const buffer = ctx.createBuffer(1, length, sr);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) {
        const t = i / sr;
        data[i] = Math.sin(2 * Math.PI * 523.25 * t) * Math.exp(-t * 0.5) * 0.2;
      }
      return audioBufferToDataUrl(buffer, sr);
    } catch {
      return '';
    }
  };

  const audioBufferToDataUrl = (buffer, sr) => {
    const wavBytes = getWavBytes(buffer.getChannelData(0), sr);
    const blob = new Blob([wavBytes], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  };

  const getWavBytes = (samples, sampleRate) => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, 'RIFF');
    /* RIFF chunk length */
    view.setUint32(4, 36 + samples.length * 2, true);
    /* RIFF type */
    writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, 1, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * 2, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return buffer;
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // Step 3 Handler: Deadline
  const handleSendDeadline = (presetDeadline, presetUrgency = null) => {
    const val = (presetDeadline || deadlineInputVal || deadline).trim();
    if (!val) {
      alert("Iltimos, topshirish muddatini tanlang yoki yozing!");
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
      timestamp: getTgTimestamp(),
      text: `⏱ Topshirish muddati: ${val}\n⚡ Rejim: ${urgencyTag}`
    };

    const botMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      timestamp: getTgTimestamp(),
      text: "Tushundim! Siz bilan bog'lanishimiz uchun ismingiz va telefon raqamingizni yozing:"
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setStep(4);
  };

  // Step 4 Handler: Final Submission
  const handleSubmitFinal = (e) => {
    if (e) e.preventDefault();
    if (submittingRef.current) return;

    const nameVal = clientName.trim();
    const phoneVal = phone.trim();

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
      timestamp: getTgTimestamp(),
      text: `👤 Ism: ${nameVal}\n📞 Tel: ${phoneVal}`
    };

    const botSuccessMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      timestamp: getTgTimestamp(),
      text: `✅ Rahmat! Buyurtmangiz Telegram botimizga muvaffaqiyatli jo'natildi.\n⏱ Topshirish muddati: ${deadline || 'Ko\'rsatilmadi'}\nMutaxassislarimiz tez orada ushbu raqam orqali bog'lanishadi! 🚀`,
      type: 'success'
    };

    setMessages(prev => [...prev, userMsg, botSuccessMsg]);
    setStep(5);

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

  // File Picker Handler
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImg = file.type.startsWith('image/');
    const fileObj = {
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type,
      isImage: isImg,
      url: URL.createObjectURL(file)
    };

    setSelectedFile(fileObj);
  };

  const handleAddEmoji = (emoji) => {
    setInputVal(prev => prev + emoji);
  };

  const popularEmojis = ['👍', '❤️', '🔥', '🚀', '😊', '🤖', '💻', '📱', '⚡', '🎉', '💬', '✨', '✅', '📊', '🎯', '👌', '💯', '🌟'];

  return (
    <div className="tg-chat-app-wrapper animate-fade-in">
      <div className="tg-chat-frame">

        {/* Telegram Header */}
        <div className="tg-chat-header">
          <div className="tg-header-left">
            <div className="tg-avatar-container">
              <Bot size={22} color="#ffffff" />
              <span className="tg-online-badge-dot" />
            </div>
            <div className="tg-header-info">
              <h3 className="tg-header-title">
                Telegram Assistant <Sparkles size={14} className="tg-sparkle-icon" />
              </h3>
              <span className="tg-header-status">
                bot • online (avto-yordamchi)
              </span>
            </div>
          </div>

          <div className="tg-header-right">
            {step === 5 && (
              <button 
                type="button" 
                onClick={() => {
                  setStep(1);
                  setSelectedService(null);
                  setDescription('');
                  setDeadline('');
                  setClientName('');
                  setPhone('+998 ');
                  setMessages([{
                    id: Date.now().toString(),
                    sender: 'bot',
                    timestamp: getTgTimestamp(),
                    text: "Assalomu alaykum! Yana boshqa turdagi loyihaga buyurtma bermoqchimisiz? 🚀",
                    type: 'options',
                    options: [
                      { id: 'bot', title: '🤖 Telegram Bot yasash', price: '50$ +', desc: 'Tezkor, avtomatlashtirilgan va moslashuvchan botlar' },
                      { id: 'website', title: '🌐 Veb-sayt yasash', price: '200$ +', desc: 'Zamonaviy, responsive va tezkor veb platformalar' },
                      { id: 'startup', title: '🚀 Startap yaratish', price: '400$ +', desc: 'To\'liq arxitektura, MVP, AI va Full-Stack yechimlar' }
                    ]
                  }]);
                }}
                className="tg-reset-btn"
                title="Qayta boshlash"
              >
                <RotateCcw size={15} /> Yangi Buyurtma
              </button>
            )}
            <div className="tg-status-tag">
              💬 Telegram Chat
            </div>
          </div>
        </div>

        {/* Telegram Chat Wallpaper Body */}
        <div className="tg-chat-body">
          
          {/* Telegram Date Divider */}
          <div className="tg-date-divider">
            <span>Bugun</span>
          </div>

          {/* Chat Messages */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`tg-msg-row ${isUser ? 'tg-msg-user' : 'tg-msg-bot'}`}
              >
                <div className={`tg-msg-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
                  
                  {/* File / Image Attachment View */}
                  {msg.file && (
                    <div className="tg-attached-media">
                      {msg.file.isImage ? (
                        <img src={msg.file.url} alt={msg.file.name} className="tg-attached-img" />
                      ) : (
                        <div className="tg-file-card">
                          <FileText size={24} color="#38bdf8" />
                          <div className="tg-file-info">
                            <span className="tg-file-name">{msg.file.name}</span>
                            <span className="tg-file-size">{msg.file.size}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Voice Message View */}
                  {msg.type === 'voice' ? (
                    <VoiceMessageItem msg={msg} isUser={isUser} />
                  ) : (
                    msg.text && <div className="tg-msg-text">{msg.text}</div>
                  )}

                  {/* Message Timestamp & Checkmarks */}
                  <div className="tg-msg-footer">
                    <span className="tg-msg-time">{msg.timestamp || '08:15'}</span>
                    {isUser && <CheckCheck size={15} className="tg-check-icon" />}
                  </div>

                  {/* Inline Keyboard Options (Service Selection) */}
                  {msg.type === 'options' && step === 1 && (
                    <div className="tg-inline-options-grid">
                      {msg.options.map((opt) => (
                        <div
                          key={opt.id}
                          onClick={() => handleSelectService(opt)}
                          className="tg-inline-card"
                        >
                          <div className="tg-card-header">
                            <span className="tg-card-title">{opt.title}</span>
                            <span className="tg-card-price">{opt.price}</span>
                          </div>
                          <p className="tg-card-desc">{opt.desc}</p>
                          <button className="tg-card-select-btn">
                            Tanlash <ArrowRight size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={chatEndRef} />
        </div>

        {/* Step 3 & Step 4 Form overlays inside Telegram chat */}
        {step === 3 && (
          <div className="tg-step-action-panel">
            <div className="tg-action-title">
              ⏱ Topshirish muddatini tanlang yoki yozing:
            </div>
            <div className="tg-chips-row">
              <button
                type="button"
                onClick={() => handleSendDeadline("⚡ TEZKOR (Shoshilinch - Eng qisqa muddatda)", "🚨 TEZKOR (Shoshilinch)")}
                className="tg-chip-btn chip-urgent"
              >
                🚨 SHOSHILINCH (TEZKOR)
              </button>
              <button
                type="button"
                onClick={() => handleSendDeadline("⏳ Shoshilinch emas (Oddiy rejim)", "⏳ Shoshilinch emas")}
                className="tg-chip-btn chip-normal"
              >
                ⏳ SHOSHILINCH EMAS
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="tg-step-action-panel">
            <form onSubmit={handleSubmitFinal} className="tg-contact-form">
              <div className="tg-inputs-grid">
                <div>
                  <label className="tg-field-label">Ismingiz:</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Masalan: Sayfulloh Zokirov"
                    className="tg-text-field"
                  />
                </div>
                <div>
                  <label className="tg-field-label">Telefon raqamingiz:</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="tg-text-field"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="tg-submit-order-btn"
              >
                {isSubmitting ? 'Yuborilmoqda...' : '🚀 Buyurtmani Telegram Botga Yuborish'}
              </button>
            </form>
          </div>
        )}

        {/* Selected File Preview Box */}
        {selectedFile && (
          <div className="tg-attachment-preview-bar">
            <div className="tg-preview-item">
              {selectedFile.isImage ? (
                <ImageIcon size={18} color="#38bdf8" />
              ) : (
                <FileText size={18} color="#38bdf8" />
              )}
              <span className="tg-preview-name">{selectedFile.name}</span>
              <span className="tg-preview-size">({selectedFile.size})</span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="tg-remove-file-btn"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* Popover Emoji Picker */}
        {showEmojiPicker && (
          <div className="tg-emoji-popover animate-fade-in">
            <div className="tg-emoji-header">
              <span>Emojilar</span>
              <button type="button" onClick={() => setShowEmojiPicker(false)} className="tg-close-emoji">
                <X size={14} />
              </button>
            </div>
            <div className="tg-emoji-grid">
              {popularEmojis.map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddEmoji(emoji)}
                  className="tg-emoji-btn"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Telegram Input Bar (Paperclip, Input, Emoji, Mic/Send) */}
        <div className="tg-input-bar-container">
          
          {isRecording ? (
            /* Live Voice Recording UI Bar */
            <div className="tg-recording-bar">
              <div className="tg-rec-indicator">
                <span className="tg-rec-dot" />
                <span className="tg-rec-timer">
                  00:{recordingTime < 10 ? `0${recordingTime}` : recordingTime}
                </span>
                <span className="tg-rec-label">Ovoz yozilmoqda...</span>
              </div>

              {/* Dynamic Waveform Bars */}
              <div className="tg-rec-waveform">
                <span className="tg-rec-bar b1" />
                <span className="tg-rec-bar b2" />
                <span className="tg-rec-bar b3" />
                <span className="tg-rec-bar b4" />
                <span className="tg-rec-bar b5" />
              </div>

              <div className="tg-rec-actions">
                <button
                  type="button"
                  onClick={cancelRecording}
                  className="tg-rec-cancel-btn"
                  title="Bekor qilish"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  type="button"
                  onClick={stopAndSendRecording}
                  className="tg-rec-send-btn"
                  title="Ovozni yuborish"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          ) : (
            /* Normal Telegram Input Bar */
            <form onSubmit={handleSendMessage} className="tg-input-form">
              
              {/* Paperclip File Attachment Icon */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="tg-input-icon-btn"
                title="Fayl yoki rasm biriktirish"
              >
                <Paperclip size={20} color="#7f91a4" />
              </button>

              {/* Main Text Input */}
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Xabar yozing..."
                className="tg-chat-input-field"
              />

              {/* Emoji Picker Toggle Button */}
              <button
                type="button"
                onClick={() => setShowEmojiPicker(prev => !prev)}
                className="tg-input-icon-btn"
                title="Emoji"
              >
                <Smile size={20} color="#7f91a4" />
              </button>

              {/* Mic / Send Button Switcher */}
              {inputVal.trim() || selectedFile ? (
                <button
                  type="submit"
                  className="tg-send-action-btn"
                  title="Xabarni yuborish"
                >
                  <Send size={18} color="#ffffff" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startRecording}
                  className="tg-mic-action-btn"
                  title="Ovozli xabar yozish"
                >
                  <Mic size={20} color="#ffffff" />
                </button>
              )}
            </form>
          )}
        </div>

      </div>

      {/* Styled CSS scoped for Authentic Telegram Dark Desktop/Mobile UI */}
      <style>{`
        .tg-chat-app-wrapper {
          max-width: 820px;
          margin: 1.5rem auto;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .tg-chat-frame {
          background: #0e1621;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          height: 650px;
          max-height: 85vh;
          position: relative;
          overflow: hidden;
        }

        /* Telegram Top Header */
        .tg-chat-header {
          background: #17212b;
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
        }

        .tg-header-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .tg-avatar-container {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2b689a 0%, #2aabee 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 0 10px rgba(42, 171, 238, 0.3);
        }

        .tg-online-badge-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #00c853;
          border: 2px solid #17212b;
        }

        .tg-header-info {
          display: flex;
          flex-direction: column;
        }

        .tg-header-title {
          font-size: 1.02rem;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .tg-sparkle-icon {
          color: #2aabee;
        }

        .tg-header-status {
          font-size: 0.76rem;
          color: #7f91a4;
        }

        .tg-header-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .tg-status-tag {
          background: rgba(42, 171, 238, 0.12);
          border: 1px solid rgba(42, 171, 238, 0.25);
          color: #2aabee;
          font-size: 0.75rem;
          padding: 0.3rem 0.7rem;
          border-radius: 12px;
          font-weight: 600;
        }

        .tg-reset-btn {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #e4ecf5;
          font-size: 0.78rem;
          padding: 0.4rem 0.85rem;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.2s ease;
        }

        .tg-reset-btn:hover {
          background: rgba(255, 255, 255, 0.16);
        }

        /* Telegram Wallpaper & Chat Body */
        .tg-chat-body {
          flex: 1;
          background: #0e1621;
          background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0);
          background-size: 24px 24px;
          padding: 1.25rem 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          scroll-behavior: smooth;
        }

        .tg-date-divider {
          text-align: center;
          margin: 0.25rem 0 0.5rem;
        }

        .tg-date-divider span {
          background: rgba(23, 33, 43, 0.85);
          color: #7f91a4;
          font-size: 0.74rem;
          padding: 0.25rem 0.85rem;
          border-radius: 12px;
          font-weight: 600;
        }

        /* Telegram Message Rows & Bubbles */
        .tg-msg-row {
          display: flex;
          width: 100%;
        }

        .tg-msg-bot {
          justify-content: flex-start;
        }

        .tg-msg-user {
          justify-content: flex-end;
        }

        .tg-msg-bubble {
          max-width: 82%;
          padding: 0.65rem 0.95rem;
          position: relative;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .bot-bubble {
          background: #182533;
          color: #f5f5f5;
          border-radius: 14px 14px 14px 3px;
        }

        .user-bubble {
          background: #2b5278;
          color: #ffffff;
          border-radius: 14px 14px 3px 14px;
        }

        .tg-msg-text {
          font-size: 0.92rem;
          line-height: 1.45;
          white-space: pre-line;
          word-break: break-word;
        }

        .tg-msg-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.3rem;
          margin-top: 0.35rem;
          float: right;
          margin-left: 0.75rem;
        }

        .tg-msg-time {
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.55);
        }

        .tg-check-icon {
          color: #2aabee;
        }

        /* Attachment Media Views */
        .tg-attached-media {
          margin-bottom: 0.4rem;
        }

        .tg-attached-img {
          max-width: 260px;
          border-radius: 10px;
          display: block;
        }

        .tg-file-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(0,0,0,0.2);
          padding: 0.6rem 0.85rem;
          border-radius: 10px;
        }

        .tg-file-info {
          display: flex;
          flex-direction: column;
        }

        .tg-file-name {
          font-size: 0.84rem;
          font-weight: 600;
          color: #ffffff;
        }

        .tg-file-size {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.6);
        }

        /* Inline Keyboard Cards */
        .tg-inline-options-grid {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-top: 0.75rem;
          width: 100%;
        }

        .tg-inline-card {
          background: rgba(23, 33, 43, 0.95);
          border: 1px solid rgba(42, 171, 238, 0.3);
          border-radius: 12px;
          padding: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tg-inline-card:hover {
          border-color: #2aabee;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(42, 171, 238, 0.25);
        }

        .tg-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.3rem;
        }

        .tg-card-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #ffffff;
        }

        .tg-card-price {
          font-size: 0.88rem;
          font-weight: 800;
          color: #00c853;
        }

        .tg-card-desc {
          font-size: 0.76rem;
          color: #7f91a4;
          margin-bottom: 0.5rem;
          line-height: 1.35;
        }

        .tg-card-select-btn {
          width: 100%;
          background: #2b689a;
          color: #ffffff;
          border: none;
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .tg-card-select-btn:hover {
          background: #2aabee;
        }

        /* Voice Player Styling */
        .tg-voice-player-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.35rem 0.1rem;
          min-width: 220px;
        }

        .tg-voice-play-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .tg-voice-play-btn:hover {
          transform: scale(1.05);
        }

        .user-play {
          background: #ffffff;
          color: #2b5278;
        }

        .bot-play {
          background: #2aabee;
          color: #ffffff;
        }

        .tg-voice-info-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .tg-voice-waveform-container {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 24px;
        }

        .tg-wave-bar {
          flex: 1;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          transition: background 0.2s ease;
        }

        .tg-wave-bar.active {
          background: #2aabee;
        }

        .user-bubble .tg-wave-bar.active {
          background: #ffffff;
        }

        .tg-voice-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tg-voice-time-label {
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
        }

        .tg-voice-speed-chip {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #ffffff;
          font-size: 0.68rem;
          padding: 0.1rem 0.4rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
        }

        /* Step Action Overlays */
        .tg-step-action-panel {
          background: #17212b;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.85rem 1.25rem;
        }

        .tg-action-title {
          font-size: 0.82rem;
          color: #2aabee;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }

        .tg-chips-row {
          display: flex;
          gap: 0.65rem;
        }

        .tg-chip-btn {
          flex: 1;
          padding: 0.65rem 0.85rem;
          border-radius: 10px;
          border: none;
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .tg-chip-btn:hover {
          opacity: 0.9;
        }

        .chip-urgent {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        .chip-normal {
          background: linear-gradient(135deg, #2b689a 0%, #2aabee 100%);
        }

        .tg-contact-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .tg-inputs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .tg-field-label {
          font-size: 0.76rem;
          color: #7f91a4;
          margin-bottom: 0.25rem;
          display: block;
        }

        .tg-text-field {
          width: 100%;
          background: #0e1621;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 0.65rem 0.85rem;
          color: #ffffff;
          font-size: 0.88rem;
          outline: none;
        }

        .tg-text-field:focus {
          border-color: #2aabee;
        }

        .tg-submit-order-btn {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #00c853 0%, #2aabee 100%);
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
        }

        /* File Attachment Preview Bar */
        .tg-attachment-preview-bar {
          background: #17212b;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.5rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tg-preview-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: #ffffff;
        }

        .tg-preview-name {
          font-weight: 600;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tg-preview-size {
          color: #7f91a4;
          font-size: 0.74rem;
        }

        .tg-remove-file-btn {
          background: transparent;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 0.2rem;
        }

        /* Emoji Popover */
        .tg-emoji-popover {
          position: absolute;
          bottom: 70px;
          right: 20px;
          background: #17212b;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          padding: 0.75rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          z-index: 50;
          width: 260px;
        }

        .tg-emoji-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          color: #7f91a4;
          margin-bottom: 0.5rem;
          padding-bottom: 0.3rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .tg-close-emoji {
          background: transparent;
          border: none;
          color: #7f91a4;
          cursor: pointer;
        }

        .tg-emoji-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.4rem;
        }

        .tg-emoji-btn {
          background: transparent;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 6px;
          transition: background 0.15s ease;
        }

        .tg-emoji-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* Telegram Bottom Input Bar */
        .tg-input-bar-container {
          background: #17212b;
          padding: 0.65rem 1rem;
          border-top: 1px solid rgba(0, 0, 0, 0.3);
          z-index: 10;
        }

        .tg-input-form {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .tg-input-icon-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s ease;
        }

        .tg-input-icon-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .tg-chat-input-field {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 0.94rem;
          padding: 0.4rem 0.2rem;
        }

        .tg-chat-input-field::placeholder {
          color: #7f91a4;
        }

        .tg-send-action-btn, .tg-mic-action-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          background: #2aabee;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(42, 171, 238, 0.4);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .tg-send-action-btn:hover, .tg-mic-action-btn:hover {
          transform: scale(1.05);
          background: #2b689a;
        }

        /* Live Voice Recording UI Bar */
        .tg-recording-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.2rem 0.4rem;
        }

        .tg-rec-indicator {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .tg-rec-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 10px #ef4444;
          animation: recPulse 1s infinite alternate;
        }

        @keyframes recPulse {
          from { opacity: 0.4; }
          to { opacity: 1; }
        }

        .tg-rec-timer {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ef4444;
          font-family: monospace;
        }

        .tg-rec-label {
          font-size: 0.82rem;
          color: #7f91a4;
        }

        .tg-rec-waveform {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 20px;
        }

        .tg-rec-bar {
          width: 4px;
          background: #2aabee;
          border-radius: 2px;
          animation: barOscillate 0.6s infinite alternate;
        }

        .b1 { height: 8px; animation-delay: 0.1s; }
        .b2 { height: 16px; animation-delay: 0.2s; }
        .b3 { height: 22px; animation-delay: 0.3s; }
        .b4 { height: 12px; animation-delay: 0.4s; }
        .b5 { height: 18px; animation-delay: 0.5s; }

        @keyframes barOscillate {
          0% { height: 6px; }
          100% { height: 22px; }
        }

        .tg-rec-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .tg-rec-cancel-btn {
          background: transparent;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 50%;
        }

        .tg-rec-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          background: #00c853;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 200, 83, 0.4);
        }

        /* Mobile Responsiveness */
        @media (max-width: 640px) {
          .tg-chat-app-wrapper {
            margin: 0;
            max-width: 100vw;
          }
          .tg-chat-frame {
            border-radius: 0;
            height: 100dvh;
            max-height: 100dvh;
          }
          .tg-inputs-grid {
            grid-template-columns: 1fr;
          }
          .tg-msg-bubble {
            max-width: 90%;
          }
          .tg-emoji-popover {
            right: 10px;
            left: 10px;
            width: auto;
          }
        }
      `}</style>

    </div>
  );
}
