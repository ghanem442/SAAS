'use client';
import { useState, useRef, useEffect } from 'react';
import Topbar from '@/components/Topbar';
import {
  Bot, Send, Sparkles, TrendingUp, Users, Wifi,
  AlertTriangle, Zap, ChevronRight, BarChart3, RefreshCw
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  { icon: TrendingUp, text: 'لماذا الشبكة بطيئة اليوم؟', color: '#f59e0b' },
  { icon: Users, text: 'من أكثر العملاء استهلاكاً؟', color: '#6366f1' },
  { icon: AlertTriangle, text: 'ما سبب ارتفاع الاستهلاك هذا الشهر؟', color: '#ef4444' },
  { icon: Wifi, text: 'ما حالة الأجهزة الآن؟', color: '#10b981' },
  { icon: BarChart3, text: 'توقع الأرباح للشهر القادم', color: '#8b5cf6' },
  { icon: Zap, text: 'هل هناك مشكلات متوقعة في الشبكة؟', color: '#06b6d4' },
];

const aiResponses: Record<string, string> = {
  'لماذا الشبكة بطيئة اليوم؟': `🔍 **تحليل بطء الشبكة:**

بناءً على البيانات الحالية، أرصد عدة أسباب محتملة:

**1. ارتفاع الاستهلاك:** الاستهلاك اليوم وصل إلى **2,840 GB** — أعلى بـ23% من المعدل اليومي.

**2. جهاز تحت الضغط:** نقطة توزيع الزقازيق تعمل بحرارة **58°C** وإشارة **45%** فقط — يحتاج صيانة عاجلة.

**3. وقت الذروة:** معظم الاستهلاك بين 8 مساءً و12 ليلاً.

**✅ التوصية:** إعادة تشغيل AP الزقازيق + مراقبة الاستهلاك في الذروة.`,

  'من أكثر العملاء استهلاكاً؟': `📊 **أكثر 5 عملاء استهلاكاً هذا الشهر:**

| المشترك | الاستهلاك | الباقة |
|---------|-----------|--------|
| خالد عبدالرحمن | 320 GB | الألتيميت |
| محمد إبراهيم حسن | 85.2 GB | البريميوم |
| ريم أشرف حمدي | 38.2 GB | 50 جيجا |
| أحمد محمد علي | 18.5 GB | المتوسطة |
| فاطمة علي حسين | 12.1 GB | المتوسطة |

**⚠️ تنبيه:** ريم أشرف استهلكت 76% من باقتها — ستنتهي قريباً.`,

  'توقع الأرباح للشهر القادم': `📈 **توقع الأرباح — يوليو 2026:**

بناءً على نمو المشتركين الحالي (+143 شهرياً) والمعدل الحالي:

- **المتوقع:** 95,000 — 102,000 جنيه
- **السيناريو المتفائل:** 108,000 جنيه (مع حملة اشتراكات)
- **السيناريو المتشائم:** 88,000 جنيه (مع زيادة الإلغاءات)

**💡 اقتراح:** الاتصال بـ 60 مشترك منتهية باقاتهم قبل نهاية يونيو سيضيف ~9,000 جنيه.`,
};

const defaultResponse = (q: string) =>
  `🤖 **تحليل AI لسؤالك:** "${q}"

أقوم بتحليل بيانات شبكتك الآن...

📊 بناءً على الإحصائيات الحالية:
- **1,247** مشترك إجمالي
- **842** جلسة نشطة الآن
- **87,600 جنيه** إيرادات الشهر

للحصول على تحليل أدق، يرجى ربط النظام بالباك إند لاستقاء البيانات الفعلية من السيرفرات.

هل تريد تحليل جانب معين من الشبكة؟`;

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: `مرحباً! أنا **مساعد NetFlow الذكي** 🤖

يمكنني مساعدتك في:
- 📊 تحليل بيانات الشبكة والأداء
- 💰 توقع الإيرادات والاستهلاك
- ⚠️ كشف المشكلات قبل حدوثها
- 👤 تحليل سلوك المشتركين

اسألني أي شيء عن شبكتك!`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const q = text || input.trim();
    if (!q) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: q, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = aiResponses[q] || defaultResponse(q);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const renderMessage = (content: string) => {
    // Simple markdown-like rendering
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
      .replace(/^- (.*?)(<br\/>|$)/gm, '• $1$2');
  };

  return (
    <>
      <Topbar title="مساعد الذكاء الاصطناعي" subtitle="تحليل ذكي لبيانات شبكتك" />
      <div className="page-wrapper" style={{ display: 'flex', gap: 20, height: 'calc(100vh - 120px)', minHeight: 600 }}>

        {/* Sidebar: Quick questions + Stats */}
        <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>

          {/* AI Status */}
          <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%', margin: '0 auto 12px',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(99,102,241,0.4)',
            }}>
              <Bot size={28} color="white" />
            </div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>NetFlow AI</div>
            <div className="badge badge-success" style={{ margin: '0 auto' }}>
              <span className="status-dot online" style={{ width: 6, height: 6 }} /> نشط
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 8 }}>
              متصل بـ 1,247 مشترك
            </div>
          </div>

          {/* Quick Questions */}
          <div className="card" style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={14} color="var(--warning)" /> أسئلة سريعة
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {quickQuestions.map((q, i) => {
                const Icon = q.icon;
                return (
                  <button
                    key={i}
                    onClick={() => sendMessage(q.text)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)', padding: '9px 12px',
                      cursor: 'pointer', transition: 'all 0.15s', textAlign: 'right',
                      color: 'var(--text-secondary)', fontSize: '0.78rem', fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = q.color + '50'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                  >
                    <Icon size={14} color={q.color} style={{ flexShrink: 0 }} />
                    <span style={{ flex: 1, lineHeight: 1.3 }}>{q.text}</span>
                    <ChevronRight size={12} style={{ opacity: 0.4, flexShrink: 0 }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Capabilities */}
          <div className="card" style={{ padding: '14px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 10 }}>قدرات النظام</div>
            {[
              { label: 'تحليل البيانات', pct: 95, color: '#6366f1' },
              { label: 'كشف الأعطال', pct: 88, color: '#10b981' },
              { label: 'التنبؤ بالاستهلاك', pct: 82, color: '#06b6d4' },
              { label: 'كشف التلاعب', pct: 91, color: '#ef4444' },
            ].map((cap, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{cap.label}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: cap.color }}>{cap.pct}%</span>
                </div>
                <div className="progress-bar" style={{ height: 4 }}>
                  <div className="progress-fill" style={{ width: `${cap.pct}%`, background: cap.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {/* Chat Header */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>NetFlow AI Assistant</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--success-light)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span className="status-dot online" style={{ width: 6, height: 6 }} /> يحلل بيانات شبكتك المباشرة
              </div>
            </div>
            <button className="btn btn-ghost btn-sm btn-icon" style={{ marginRight: 'auto' }} title="مسح المحادثة">
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                gap: 10, marginBottom: 16, alignItems: 'flex-start',
              }}>
                {msg.role === 'assistant' && (
                  <div className="ai-avatar" style={{ flexShrink: 0 }}>
                    <Bot size={15} color="white" />
                  </div>
                )}
                <div style={{
                  maxWidth: '75%',
                  background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-elevated)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(99,102,241,0.3)' : 'var(--border)'}`,
                  borderRadius: msg.role === 'user' ? 'var(--radius-lg) 4px var(--radius-lg) var(--radius-lg)' : '4px var(--radius-lg) var(--radius-lg) var(--radius-lg)',
                  padding: '12px 16px',
                  fontSize: '0.85rem',
                  color: msg.role === 'user' ? 'white' : 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}>
                  <span dangerouslySetInnerHTML={{ __html: renderMessage(msg.content) }} />
                  <div style={{ fontSize: '0.65rem', color: msg.role === 'user' ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', marginTop: 6, textAlign: 'left' }}>
                    {msg.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16 }}>
                <div className="ai-avatar">
                  <Bot size={15} color="white" />
                </div>
                <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px var(--radius-lg) var(--radius-lg) var(--radius-lg)', padding: '14px 18px' }}>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)',
                        animation: 'blink 1.4s ease infinite',
                        animationDelay: `${i * 0.2}s`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="اسأل عن شبكتك... (Enter للإرسال، Shift+Enter لسطر جديد)"
                style={{
                  flex: 1, background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)', padding: '10px 14px',
                  color: 'var(--text-primary)', fontSize: '0.875rem', fontFamily: 'inherit',
                  resize: 'none', outline: 'none', minHeight: 44, maxHeight: 120,
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                rows={1}
              />
              <button
                className="btn btn-primary"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                style={{ padding: '10px 16px', height: 44 }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
