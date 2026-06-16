'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  CreditCard, Plus, Download, Printer, Copy, CheckCircle,
  Clock, XCircle, Search, Wifi, Zap, Calendar, User
} from 'lucide-react';
import { mockCards } from '@/lib/mockData';

export default function CardsPage() {
  const [tab, setTab] = useState<'all' | 'unused' | 'used' | 'expired'>('all');
  const [search, setSearch] = useState('');
  const [showGenModal, setShowGenModal] = useState(false);
  const [genCount, setGenCount] = useState(10);

  const filtered = mockCards.filter(c => {
    const matchSearch = c.code.includes(search.toUpperCase());
    const matchTab = tab === 'all' || c.status === tab;
    return matchSearch && matchTab;
  });

  const counts = {
    all: mockCards.length,
    unused: mockCards.filter(c => c.status === 'unused').length,
    used: mockCards.filter(c => c.status === 'used').length,
    expired: mockCards.filter(c => c.status === 'expired').length,
  };

  const getStatusInfo = (status: string) => {
    if (status === 'unused') return { cls: 'badge-success', label: 'غير مستخدم', icon: CheckCircle, color: 'var(--success)' };
    if (status === 'used') return { cls: 'badge-primary', label: 'مستخدم', icon: User, color: 'var(--primary)' };
    return { cls: 'badge-danger', label: 'منتهي', icon: XCircle, color: 'var(--danger)' };
  };

  return (
    <>
      <Topbar title="إدارة الكروت" subtitle={`${counts.all} كارت إجمالي`} />
      <div className="page-wrapper">

        {/* Stats */}
        <div className="grid-4 stagger" style={{ marginBottom: 24 }}>
          {[
            { key: 'all', label: 'الإجمالي', color: '#6366f1', icon: CreditCard },
            { key: 'unused', label: 'غير مستخدمة', color: '#10b981', icon: CheckCircle },
            { key: 'used', label: 'مستخدمة', color: '#06b6d4', icon: User },
            { key: 'expired', label: 'منتهية', color: '#ef4444', icon: XCircle },
          ].map((s: any) => {
            const Icon = s.icon;
            return (
              <button key={s.key} className="stat-card animate-fade-up"
                onClick={() => setTab(s.key)}
                style={{ cursor: 'pointer', textAlign: 'right', border: tab === s.key ? `1px solid ${s.color}40` : '1px solid var(--border)', background: tab === s.key ? `${s.color}08` : 'var(--bg-card)' }}>
                <div className="stat-icon" style={{ background: `${s.color}18`, marginBottom: 12 }}>
                  <Icon size={18} color={s.color} />
                </div>
                <div className="stat-value">{counts[s.key as keyof typeof counts]}</div>
                <div className="stat-label">{s.label}</div>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="search-wrapper" style={{ flex: 1, minWidth: 250 }}>
            <Search size={15} className="search-icon" />
            <input className="search-input" placeholder="ابحث برقم الكارت..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-secondary" style={{ gap: 6 }}><Download size={15} /> تصدير PDF</button>
          <button className="btn btn-secondary" style={{ gap: 6 }}><Printer size={15} /> طباعة</button>
          <button className="btn btn-primary" style={{ gap: 6 }} onClick={() => setShowGenModal(true)}>
            <Plus size={15} /> إنشاء كروت
          </button>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {filtered.map(card => {
            const { cls, label, icon: StatusIcon, color } = getStatusInfo(card.status);
            return (
              <div key={card.id} className="animate-fade-up" style={{
                background: 'linear-gradient(135deg, var(--bg-card), var(--bg-elevated))',
                border: `1px solid ${card.status === 'unused' ? 'rgba(16,185,129,0.2)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '18px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.2s',
              }}>
                {/* Background glow */}
                <div style={{
                  position: 'absolute', top: -20, right: -20, width: 80, height: 80,
                  borderRadius: '50%', background: color, opacity: 0.06, filter: 'blur(20px)'
                }} />

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CreditCard size={15} color={color} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>كارت إنترنت</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>GHANEM ISP</div>
                    </div>
                  </div>
                  <span className={`badge ${cls}`} style={{ fontSize: '0.65rem' }}>{label}</span>
                </div>

                {/* Code */}
                <div style={{
                  fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 800,
                  color: card.status === 'unused' ? 'var(--text-primary)' : 'var(--text-muted)',
                  letterSpacing: '0.1em', marginBottom: 14,
                  background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-md)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  {card.code}
                  {card.status === 'unused' && (
                    <button className="btn btn-ghost btn-icon btn-sm" title="نسخ" onClick={() => navigator.clipboard.writeText(card.code)}>
                      <Copy size={13} />
                    </button>
                  )}
                </div>

                {/* Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', padding: '8px 10px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>السعر</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--success-light)' }}>{card.price} ج</div>
                  </div>
                  <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', padding: '8px 10px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>المدة</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{card.duration} {card.durationUnit === 'days' ? 'يوم' : 'ساعة'}</div>
                  </div>
                  <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', padding: '8px 10px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>السرعة</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-light)' }}>
                      <Wifi size={11} style={{ display: 'inline', marginLeft: 2 }} />
                      {card.downloadSpeed}M
                    </div>
                  </div>
                  <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', padding: '8px 10px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>تاريخ الإنشاء</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                      {new Date(card.createdAt).toLocaleDateString('ar-EG')}
                    </div>
                  </div>
                </div>

                {card.usedBy && (
                  <div style={{ marginTop: 10, padding: '8px 10px', background: 'rgba(99,102,241,0.08)', borderRadius: 'var(--radius-sm)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <User size={10} style={{ display: 'inline', marginLeft: 4 }} />
                    استخدمه: {card.usedBy} — {card.usedAt ? new Date(card.usedAt).toLocaleDateString('ar-EG') : ''}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Generate Modal */}
        {showGenModal && (
          <div className="modal-overlay" onClick={() => setShowGenModal(false)}>
            <div className="modal animate-fade-up" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">إنشاء كروت جديدة</h3>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowGenModal(false)}>✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label">عدد الكروت</label>
                  <input type="number" className="input" value={genCount} onChange={e => setGenCount(+e.target.value)} min={1} max={1000} />
                </div>
                <div className="input-group">
                  <label className="input-label">السعر (جنيه)</label>
                  <input type="number" className="input" placeholder="100" />
                </div>
                <div className="input-group">
                  <label className="input-label">سرعة التحميل (Mbps)</label>
                  <input type="number" className="input" placeholder="25" />
                </div>
                <div className="input-group">
                  <label className="input-label">المدة</label>
                  <input type="number" className="input" placeholder="30" />
                </div>
                <div className="input-group">
                  <label className="input-label">وحدة المدة</label>
                  <select className="input">
                    <option value="days">يوم</option>
                    <option value="hours">ساعة</option>
                  </select>
                </div>
                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label">حد التحميل (GB) — اتركه فارغاً للباقة المفتوحة</label>
                  <input type="number" className="input" placeholder="غير محدود" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setShowGenModal(false)}>إلغاء</button>
                <button className="btn btn-primary">
                  <Zap size={15} /> إنشاء {genCount} كارت
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
