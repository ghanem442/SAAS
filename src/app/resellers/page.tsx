'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  Store, Plus, TrendingUp, Users, DollarSign,
  Phone, Mail, Percent, ChevronRight, BarChart3, Edit2, Eye
} from 'lucide-react';
import { mockResellers } from '@/lib/mockData';

export default function ResellersPage() {
  const [showModal, setShowModal] = useState(false);

  const totalSales = mockResellers.reduce((s, r) => s + r.totalSales, 0);
  const totalSubs = mockResellers.reduce((s, r) => s + r.subscribersCount, 0);

  const avatarColors = ['#6366f1', '#10b981', '#06b6d4', '#f59e0b', '#8b5cf6'];

  return (
    <>
      <Topbar title="نظام الموزعين" subtitle={`${mockResellers.length} موزعين نشطين`} />
      <div className="page-wrapper">

        {/* Stats */}
        <div className="grid-4 stagger" style={{ marginBottom: 24 }}>
          {[
            { label: 'إجمالي الموزعين', value: mockResellers.length, color: '#6366f1', icon: Store },
            { label: 'إجمالي المبيعات', value: totalSales.toLocaleString('ar-EG') + ' ج', color: '#10b981', icon: TrendingUp },
            { label: 'مشتركو الموزعين', value: totalSubs, color: '#06b6d4', icon: Users },
            { label: 'عمولات مستحقة', value: mockResellers.reduce((s, r) => s + r.balance, 0).toLocaleString('ar-EG') + ' ج', color: '#f59e0b', icon: DollarSign },
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

        <div className="page-header">
          <div>
            <h2 className="page-title">الموزعون</h2>
            <p className="page-subtitle">إدارة شبكة الموزعين ومتابعة أداء مبيعاتهم</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15} /> موزع جديد
          </button>
        </div>

        {/* Resellers List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mockResellers.map((reseller, i) => (
            <div key={reseller.id} className="card animate-fade-up" style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr auto',
              gap: 20, alignItems: 'center',
              borderRight: '3px solid var(--primary)',
            }}>
              {/* Avatar */}
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: `linear-gradient(135deg, ${avatarColors[i % avatarColors.length]}, ${avatarColors[(i + 2) % avatarColors.length]})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', fontWeight: 700, color: 'white',
                boxShadow: `0 0 20px ${avatarColors[i % avatarColors.length]}40`,
                flexShrink: 0,
              }}>
                {reseller.name.charAt(0)}
              </div>

              {/* Info */}
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 4 }}>{reseller.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Phone size={11} /> {reseller.phone}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Mail size={11} /> {reseller.email}
                </div>
                <span className={`badge ${reseller.status === 'active' ? 'badge-success' : 'badge-secondary'}`} style={{ fontSize: '0.65rem', marginTop: 6 }}>
                  {reseller.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>

              {/* Sales */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981' }}>{reseller.totalSales.toLocaleString('ar-EG')}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>إجمالي المبيعات</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 4 }}>جنيه</div>
              </div>

              {/* Subscribers */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#6366f1' }}>{reseller.subscribersCount}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>مشترك</div>
                <div style={{ height: 4, background: 'var(--bg-elevated)', borderRadius: 9999, marginTop: 8, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(reseller.subscribersCount / totalSubs) * 100}%`, background: '#6366f1', borderRadius: 9999 }} />
                </div>
              </div>

              {/* Balance + Commission */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f59e0b' }}>{reseller.balance.toLocaleString('ar-EG')} ج</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>رصيد مستحق</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 6 }}>
                  <Percent size={11} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>عمولة {reseller.commission}%</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, flexDirection: 'column' }}>
                <button className="btn btn-primary btn-sm" style={{ gap: 5, whiteSpace: 'nowrap' }}>
                  <DollarSign size={12} /> صرف عمولة
                </button>
                <button className="btn btn-secondary btn-sm" style={{ gap: 5, whiteSpace: 'nowrap' }}>
                  <BarChart3 size={12} /> التقرير
                </button>
                <button className="btn btn-ghost btn-sm" style={{ gap: 5, whiteSpace: 'nowrap' }}>
                  <Edit2 size={12} /> تعديل
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal animate-fade-up" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">إضافة موزع جديد</h3>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="input-group" style={{ gridColumn: '1/-1' }}>
                  <label className="input-label">اسم الموزع / الشركة *</label>
                  <input className="input" placeholder="اسم الموزع" />
                </div>
                <div className="input-group">
                  <label className="input-label">رقم الهاتف *</label>
                  <input type="tel" className="input" placeholder="01xxxxxxxxx" />
                </div>
                <div className="input-group">
                  <label className="input-label">البريد الإلكتروني</label>
                  <input type="email" className="input" placeholder="email@example.com" />
                </div>
                <div className="input-group">
                  <label className="input-label">نسبة العمولة (%) *</label>
                  <input type="number" className="input" placeholder="15" min={1} max={50} />
                </div>
                <div className="input-group">
                  <label className="input-label">رصيد ابتدائي (جنيه)</label>
                  <input type="number" className="input" placeholder="0" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>إلغاء</button>
                <button className="btn btn-primary"><Plus size={14} /> إضافة الموزع</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
