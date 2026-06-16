'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  MessageSquare, AlertTriangle, Wifi, DollarSign, Wrench,
  Clock, CheckCircle, XCircle, User, ArrowRight, Filter,
  Plus, ChevronDown, Star
} from 'lucide-react';
import { mockTickets } from '@/lib/mockData';

export default function TicketsPage() {
  const [selected, setSelected] = useState(mockTickets[0]);
  const [filter, setFilter] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');

  const filtered = mockTickets.filter(t => filter === 'all' || t.status === filter);

  const typeInfo = (type: string) => ({
    slow_internet: { label: 'بطء الإنترنت', icon: Wifi, color: '#f59e0b' },
    disconnection: { label: 'انقطاع الخدمة', icon: XCircle, color: '#ef4444' },
    payment: { label: 'مشكلة دفع', icon: DollarSign, color: '#6366f1' },
    device_issue: { label: 'عطل جهاز', icon: Wrench, color: '#8b5cf6' },
    other: { label: 'أخرى', icon: MessageSquare, color: '#06b6d4' },
  })[type] || { label: type, icon: MessageSquare, color: '#6366f1' };

  const statusInfo = (s: string) => ({
    open: { cls: 'badge-danger', label: 'مفتوح' },
    in_progress: { cls: 'badge-warning', label: 'جاري المعالجة' },
    resolved: { cls: 'badge-success', label: 'محلول' },
    closed: { cls: 'badge-secondary', label: 'مغلق' },
  })[s] || { cls: 'badge-secondary', label: s };

  const priorityInfo = (p: string) => ({
    urgent: { color: '#ef4444', label: 'عاجل' },
    high: { color: '#f59e0b', label: 'مرتفع' },
    medium: { color: '#6366f1', label: 'متوسط' },
    low: { color: '#10b981', label: 'منخفض' },
  })[p] || { color: '#6366f1', label: p };

  return (
    <>
      <Topbar title="الشكاوى والدعم الفني" subtitle={`${mockTickets.filter(t => t.status === 'open').length} تذكرة مفتوحة`} />
      <div className="page-wrapper">

        {/* Stats */}
        <div className="grid-4 stagger" style={{ marginBottom: 24 }}>
          {[
            { label: 'مفتوحة', value: mockTickets.filter(t => t.status === 'open').length, color: '#ef4444', icon: AlertTriangle },
            { label: 'جاري المعالجة', value: mockTickets.filter(t => t.status === 'in_progress').length, color: '#f59e0b', icon: Clock },
            { label: 'محلولة', value: mockTickets.filter(t => t.status === 'resolved').length, color: '#10b981', icon: CheckCircle },
            { label: 'إجمالي', value: mockTickets.length, color: '#6366f1', icon: MessageSquare },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="stat-card animate-fade-up">
                <div className="stat-icon" style={{ background: `${s.color}18` }}>
                  <Icon size={18} color={s.color} />
                </div>
                <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Split View */}
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 16, height: 'calc(100vh - 300px)', minHeight: 500 }}>

          {/* Ticket List */}
          <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 4, flex: 1 }}>
                {['all', 'open', 'in_progress', 'resolved'].map(f => (
                  <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                    onClick={() => setFilter(f as any)}>
                    {{ all: 'الكل', open: 'مفتوح', in_progress: 'جاري', resolved: 'محلول' }[f]}
                  </button>
                ))}
              </div>
              <button className="btn btn-primary btn-sm" style={{ gap: 4, fontSize: '0.75rem' }}>
                <Plus size={13} /> جديد
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filtered.map(ticket => {
                const type = typeInfo(ticket.type);
                const status = statusInfo(ticket.status);
                const priority = priorityInfo(ticket.priority);
                const TypeIcon = type.icon;
                return (
                  <div key={ticket.id}
                    onClick={() => setSelected(ticket)}
                    style={{
                      padding: '14px 16px',
                      borderBottom: '1px solid var(--border)',
                      cursor: 'pointer',
                      background: selected?.id === ticket.id ? 'var(--primary-glow)' : 'transparent',
                      borderRight: selected?.id === ticket.id ? '3px solid var(--primary)' : '3px solid transparent',
                      transition: 'all 0.15s',
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <TypeIcon size={13} color={type.color} />
                        <span style={{ fontSize: '0.72rem', color: type.color }}>{type.label}</span>
                      </div>
                      <span className={`badge ${status.cls}`} style={{ fontSize: '0.6rem' }}>{status.label}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: 4 }}>
                      {ticket.title}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        <User size={9} style={{ display: 'inline' }} /> {ticket.subscriberName.split(' ')[0]}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: priority.color, fontWeight: 600 }}>
                        ● {priority.label}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>
                      {new Date(ticket.createdAt).toLocaleString('ar-EG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Detail */}
          {selected ? (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ borderBottom: '1px solid var(--border)', padding: '0 0 16px 0', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4, display: 'block' }}>#{selected.ticketNumber}</span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{selected.title}</h3>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span className={statusInfo(selected.status).cls.replace('badge-', 'badge badge-')}
                      style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem' }}>
                      {statusInfo(selected.status).label}
                    </span>
                    <span style={{
                      padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem',
                      background: `${priorityInfo(selected.priority).color}18`,
                      color: priorityInfo(selected.priority).color,
                      border: `1px solid ${priorityInfo(selected.priority).color}30`
                    }}>
                      {priorityInfo(selected.priority).label}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {[
                    { label: 'المشترك', value: selected.subscriberName },
                    { label: 'الهاتف', value: selected.subscriberPhone },
                    { label: 'المسند إلى', value: selected.assignedTo || 'غير محدد' },
                  ].map((info, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 2 }}>{info.label}</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-primary)' }}>{info.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>الوصف</div>
                <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '14px', fontSize: '0.85rem', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                  {selected.description}
                </div>
              </div>

              {/* Rating */}
              {selected.rating && (
                <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>تقييم الخدمة:</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill={i < selected.rating! ? '#f59e0b' : 'none'} color={i < selected.rating! ? '#f59e0b' : 'var(--text-muted)'} />
                  ))}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10, marginTop: 'auto', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-sm" style={{ gap: 6 }}>
                  <User size={13} /> تعيين لفني
                </button>
                <button className="btn btn-success btn-sm" style={{ gap: 6 }}>
                  <CheckCircle size={13} /> تحديد كمحلول
                </button>
                <button className="btn btn-secondary btn-sm">تغيير الأولوية</button>
                <button className="btn btn-danger btn-sm" style={{ gap: 6 }}>
                  <XCircle size={13} /> إغلاق
                </button>
              </div>

              {/* Reply Box */}
              <div style={{ marginTop: 16, padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <textarea
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '0.85rem', resize: 'none', fontFamily: 'inherit', minHeight: 60 }}
                  placeholder="اكتب ردك هنا..."
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                  <button className="btn btn-primary btn-sm">إرسال الرد</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="empty-state">
                <div className="empty-icon"><MessageSquare size={28} /></div>
                <h3>اختر تذكرة</h3>
                <p>اختر تذكرة من القائمة لعرض تفاصيلها</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
