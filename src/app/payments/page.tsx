'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  DollarSign, TrendingUp, CreditCard, Banknote, Smartphone,
  ArrowUpCircle, ArrowDownCircle, Filter, Download, Plus, CheckCircle, XCircle, Clock
} from 'lucide-react';
import { mockPayments, mockDashboardStats } from '@/lib/mockData';

export default function PaymentsPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [showModal, setShowModal] = useState(false);

  const filtered = mockPayments.filter(p => filter === 'all' || p.status === filter);

  const totalCompleted = mockPayments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const totalPending = mockPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);

  const methodIcon = (method: string) => {
    if (method === 'cash') return <Banknote size={14} color="var(--success)" />;
    if (method === 'instapay') return <Smartphone size={14} color="var(--primary)" />;
    if (method === 'bank_transfer') return <CreditCard size={14} color="var(--accent)" />;
    return <Smartphone size={14} color="var(--secondary)" />;
  };

  const methodLabel = (m: string) => ({
    cash: 'نقدي', instapay: 'InstaPay', bank_transfer: 'تحويل بنكي', wallet: 'محفظة', card: 'بطاقة'
  })[m] || m;

  const statusInfo = (s: string) => {
    if (s === 'completed') return { cls: 'badge-success', label: 'مكتمل', icon: CheckCircle };
    if (s === 'pending') return { cls: 'badge-warning', label: 'معلق', icon: Clock };
    return { cls: 'badge-danger', label: 'فشل', icon: XCircle };
  };

  return (
    <>
      <Topbar title="المدفوعات" subtitle="سجل جميع المعاملات المالية" />
      <div className="page-wrapper">

        {/* Stats */}
        <div className="grid-4 stagger" style={{ marginBottom: 24 }}>
          {[
            { label: 'إيرادات اليوم', value: mockDashboardStats.todayRevenue + ' ج', color: '#10b981', icon: TrendingUp, change: '+7 مشتركين' },
            { label: 'إيرادات الشهر', value: mockDashboardStats.monthRevenue.toLocaleString('ar-EG') + ' ج', color: '#6366f1', icon: DollarSign, change: '+12.4%' },
            { label: 'مكتملة', value: totalCompleted.toLocaleString('ar-EG') + ' ج', color: '#06b6d4', icon: CheckCircle, change: mockPayments.filter(p => p.status === 'completed').length + ' عملية' },
            { label: 'معلقة', value: totalPending + ' ج', color: '#f59e0b', icon: Clock, change: mockPayments.filter(p => p.status === 'pending').length + ' عملية' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="stat-card animate-fade-up">
                <div className="stat-icon" style={{ background: `${s.color}18` }}>
                  <Icon size={18} color={s.color} />
                </div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-change up" style={{ fontSize: '0.72rem' }}>{s.change}</div>
              </div>
            );
          })}
        </div>

        {/* Payment Methods Distribution */}
        <div className="card animate-fade-up" style={{ marginBottom: 24 }}>
          <div className="card-header">
            <span className="card-title"><CreditCard size={15} color="var(--primary)" /> توزيع طرق الدفع</span>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: 'نقدي', count: 3, pct: 38, color: '#10b981', icon: Banknote },
              { label: 'InstaPay', count: 2, pct: 25, color: '#6366f1', icon: Smartphone },
              { label: 'تحويل بنكي', count: 1, pct: 12, color: '#06b6d4', icon: CreditCard },
              { label: 'محفظة', count: 1, pct: 12, color: '#8b5cf6', icon: Smartphone },
              { label: 'بطاقة', count: 1, pct: 13, color: '#f59e0b', icon: CreditCard },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} style={{ flex: 1, minWidth: 120, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', padding: '14px', textAlign: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: `${m.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                    <Icon size={16} color={m.color} />
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: m.color }}>{m.pct}%</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{m.label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{m.count} عمليات</div>
                  <div className="progress-bar" style={{ marginTop: 8 }}>
                    <div className="progress-fill" style={{ width: `${m.pct}%`, background: m.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { key: 'all', label: 'الكل' },
              { key: 'completed', label: '✓ مكتمل' },
              { key: 'pending', label: '⏳ معلق' },
              { key: 'failed', label: '✗ فشل' },
            ].map(f => (
              <button key={f.key} className={`btn btn-sm ${filter === f.key ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter(f.key as any)}>
                {f.label}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn btn-secondary btn-sm" style={{ gap: 6 }}><Download size={13} /> تصدير</button>
          <button className="btn btn-primary btn-sm" style={{ gap: 6 }} onClick={() => setShowModal(true)}>
            <Plus size={13} /> تسجيل دفعة
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper animate-fade-up">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>المشترك</th>
                <th>المبلغ</th>
                <th>طريقة الدفع</th>
                <th>التاريخ</th>
                <th>جُمع بواسطة</th>
                <th>الحالة</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pay, i) => {
                const { cls, label, icon: StatusIcon } = statusInfo(pay.status);
                return (
                  <tr key={pay.id}>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>#{i + 1}</td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{pay.subscriberName}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: pay.status === 'failed' ? 'var(--danger-light)' : 'var(--success-light)' }}>
                        {pay.amount} ج
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {methodIcon(pay.method)}
                        <span style={{ fontSize: '0.8rem' }}>{methodLabel(pay.method)}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {new Date(pay.date).toLocaleDateString('ar-EG')}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {pay.collectedBy || '—'}
                    </td>
                    <td><span className={`badge ${cls}`}>{label}</span></td>
                    <td>
                      <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem' }}>عرض الفاتورة</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Payment Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal animate-fade-up" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">تسجيل دفعة جديدة</h3>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <div style={{ display: 'grid', gap: 16 }}>
                <div className="input-group">
                  <label className="input-label">المشترك <span style={{ color: 'var(--danger)' }}>*</span></label>
                  <select className="input">
                    <option>اختر المشترك...</option>
                    <option>أحمد محمد علي</option>
                    <option>محمد إبراهيم حسن</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">المبلغ (جنيه) <span style={{ color: 'var(--danger)' }}>*</span></label>
                  <input type="number" className="input" placeholder="0" />
                </div>
                <div className="input-group">
                  <label className="input-label">طريقة الدفع <span style={{ color: 'var(--danger)' }}>*</span></label>
                  <select className="input">
                    <option value="cash">💵 نقدي</option>
                    <option value="instapay">📱 InstaPay</option>
                    <option value="bank_transfer">🏦 تحويل بنكي</option>
                    <option value="wallet">👛 محفظة إلكترونية</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">ملاحظات</label>
                  <input type="text" className="input" placeholder="ملاحظات اختيارية..." />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>إلغاء</button>
                <button className="btn btn-success">
                  <CheckCircle size={15} /> تسجيل الدفعة
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
