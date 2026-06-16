'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  AlertTriangle, Phone, Calendar, DollarSign,
  CheckCircle, Clock, MessageSquare, Filter, Download, Plus
} from 'lucide-react';
import { mockDebts } from '@/lib/mockData';

export default function DebtsPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'overdue' | 'paid'>('all');
  const [showModal, setShowModal] = useState(false);

  const filtered = mockDebts.filter(d => filter === 'all' || d.status === filter);

  const totalDebt = mockDebts.filter(d => d.status !== 'paid').reduce((s, d) => s + d.amount, 0);
  const overdueDebt = mockDebts.filter(d => d.status === 'overdue').reduce((s, d) => s + d.amount, 0);

  const statusInfo = (s: string) => ({
    pending: { cls: 'badge-warning', label: 'معلق', color: '#f59e0b' },
    overdue: { cls: 'badge-danger', label: 'متأخر', color: '#ef4444' },
    paid: { cls: 'badge-success', label: 'مسدد', color: '#10b981' },
  })[s] || { cls: 'badge-secondary', label: s, color: '#6366f1' };

  const getDaysOverdue = (dueDate: string) => {
    const diff = new Date().getTime() - new Date(dueDate).getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <>
      <Topbar title="إدارة الديون" subtitle="متابعة المديونيات والتحصيل" />
      <div className="page-wrapper">

        {/* Stats */}
        <div className="grid-4 stagger" style={{ marginBottom: 24 }}>
          {[
            { label: 'إجمالي الديون', value: totalDebt + ' ج', color: '#ef4444', icon: AlertTriangle },
            { label: 'ديون متأخرة', value: overdueDebt + ' ج', color: '#f59e0b', icon: Clock },
            { label: 'عملاء مدينون', value: mockDebts.filter(d => d.status !== 'paid').length, color: '#6366f1', icon: DollarSign },
            { label: 'معدل التحصيل', value: '73%', color: '#10b981', icon: CheckCircle },
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

        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { key: 'all', label: 'الكل' },
              { key: 'pending', label: '⏳ معلق' },
              { key: 'overdue', label: '🔴 متأخر' },
              { key: 'paid', label: '✓ مسدد' },
            ].map(f => (
              <button key={f.key} className={`btn btn-sm ${filter === f.key ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter(f.key as any)}>
                {f.label}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn btn-secondary btn-sm"><Download size={13} /> تصدير</button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            <Plus size={13} /> تسجيل دين
          </button>
        </div>

        {/* Debts Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(debt => {
            const { cls, label, color } = statusInfo(debt.status);
            const daysOverdue = debt.status === 'overdue' ? getDaysOverdue(debt.dueDate) : 0;
            return (
              <div key={debt.id} className="card animate-fade-up" style={{
                display: 'grid', gridTemplateColumns: '1fr auto',
                gap: 16, alignItems: 'center',
                borderRight: `4px solid ${color}`,
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, alignItems: 'center' }}>
                  {/* Subscriber */}
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{debt.subscriberName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Phone size={11} /> {debt.subscriberPhone}
                    </div>
                    {debt.notes && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4, fontStyle: 'italic' }}>
                        💬 {debt.notes}
                      </div>
                    )}
                  </div>

                  {/* Amount */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: color }}>{debt.amount}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>جنيه</div>
                  </div>

                  {/* Due Date */}
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={11} /> تاريخ الاستحقاق
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {new Date(debt.dueDate).toLocaleDateString('ar-EG')}
                    </div>
                    {daysOverdue > 0 && (
                      <div style={{ fontSize: '0.7rem', color: 'var(--danger-light)', marginTop: 2 }}>
                        ⚠️ متأخر {daysOverdue} يوم
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={`badge ${cls}`}>{label}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
                  <button className="btn btn-success btn-sm" style={{ gap: 5, whiteSpace: 'nowrap' }}>
                    <CheckCircle size={13} /> تسجيل دفع
                  </button>
                  <button className="btn btn-secondary btn-sm" style={{ gap: 5, whiteSpace: 'nowrap' }}>
                    <MessageSquare size={13} /> إرسال تذكير
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Debt Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal animate-fade-up" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">تسجيل مديونية جديدة</h3>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <div style={{ display: 'grid', gap: 14 }}>
                <div className="input-group">
                  <label className="input-label">المشترك *</label>
                  <select className="input">
                    <option>اختر المشترك...</option>
                    <option>أحمد محمد علي</option>
                    <option>محمد إبراهيم حسن</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">المبلغ (جنيه) *</label>
                  <input type="number" className="input" placeholder="0" />
                </div>
                <div className="input-group">
                  <label className="input-label">تاريخ الاستحقاق *</label>
                  <input type="date" className="input" />
                </div>
                <div className="input-group">
                  <label className="input-label">ملاحظات</label>
                  <input className="input" placeholder="وعد بالسداد، سبب الدين..." />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>إلغاء</button>
                <button className="btn btn-primary"><Plus size={14} /> تسجيل المديونية</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
