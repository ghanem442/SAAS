'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  Package, Plus, Edit2, Trash2, Users, Wifi, Clock,
  DollarSign, ToggleLeft, ToggleRight, Zap, Star
} from 'lucide-react';
import { mockPackages } from '@/lib/mockData';

export default function PackagesPage() {
  const [showModal, setShowModal] = useState(false);

  const typeLabel = (t: string) => ({
    monthly: 'شهرية', weekly: 'أسبوعية', daily: 'يومية',
    data: 'حجم بيانات', time: 'وقت', unlimited: 'مفتوحة', custom: 'مخصصة'
  })[t] || t;

  const totalRevenue = mockPackages.reduce((s, p) => s + p.price * p.subscribersCount, 0);

  return (
    <>
      <Topbar title="إدارة الباقات" subtitle={`${mockPackages.length} باقة متاحة`} />
      <div className="page-wrapper">

        {/* Summary */}
        <div className="grid-4 stagger" style={{ marginBottom: 24 }}>
          {[
            { label: 'إجمالي الباقات', value: mockPackages.length, color: '#6366f1', icon: Package },
            { label: 'باقات نشطة', value: mockPackages.filter(p => p.isActive).length, color: '#10b981', icon: Zap },
            { label: 'إجمالي المشتركين', value: mockPackages.reduce((s, p) => s + p.subscribersCount, 0), color: '#06b6d4', icon: Users },
            { label: 'إيرادات الباقات/شهر', value: totalRevenue.toLocaleString('ar-EG') + ' ج', color: '#f59e0b', icon: DollarSign },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="stat-card animate-fade-up">
                <div className="stat-icon" style={{ background: `${s.color}18` }}>
                  <Icon size={18} color={s.color} />
                </div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Header */}
        <div className="page-header">
          <div>
            <h2 className="page-title">الباقات المتاحة</h2>
            <p className="page-subtitle">إدارة باقات الإنترنت المقدمة للعملاء</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15} /> باقة جديدة
          </button>
        </div>

        {/* Packages Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {mockPackages.map((pkg, i) => (
            <div key={pkg.id} className="card animate-fade-up" style={{
              border: `1px solid ${pkg.color}30`,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Top gradient bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: pkg.color }} />

              {/* Popular badge */}
              {i === 1 && (
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                  color: 'white', fontSize: '0.65rem', fontWeight: 700,
                  padding: '3px 8px', borderRadius: 'var(--radius-full)',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <Star size={9} fill="white" /> الأكثر طلباً
                </div>
              )}

              <div style={{ marginTop: i === 1 ? 24 : 0 }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div style={{
                      width: 40, height: 40, borderRadius: 'var(--radius-md)',
                      background: `${pkg.color}18`, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', marginBottom: 10,
                    }}>
                      <Package size={18} color={pkg.color} />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
                      {pkg.name}
                    </h3>
                    <span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>{typeLabel(pkg.type)}</span>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: pkg.color, lineHeight: 1 }}>{pkg.price}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>جنيه/{pkg.durationUnit === 'days' && pkg.duration === 30 ? 'شهر' : pkg.duration + ' يوم'}</div>
                  </div>
                </div>

                {/* Specs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 3 }}>
                      <Wifi size={10} style={{ display: 'inline', marginLeft: 3 }} />سرعة التحميل
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{pkg.downloadSpeed} <span style={{ fontSize: '0.7rem', fontWeight: 400 }}>Mbps</span></div>
                  </div>
                  <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 3 }}>
                      <Clock size={10} style={{ display: 'inline', marginLeft: 3 }} />المدة
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{pkg.duration} <span style={{ fontSize: '0.7rem', fontWeight: 400 }}>يوم</span></div>
                  </div>
                  <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 3 }}>
                      <Users size={10} style={{ display: 'inline', marginLeft: 3 }} />المشتركين
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: pkg.color }}>{pkg.subscribersCount}</div>
                  </div>
                  <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 3 }}>حد البيانات</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {pkg.dataLimit ? pkg.dataLimit + ' GB' : '∞ مفتوحة'}
                    </div>
                  </div>
                </div>

                {/* Subscriber bar */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>الإشغال</span>
                    <span>{Math.round((pkg.subscribersCount / 500) * 100)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min((pkg.subscribersCount / 500) * 100, 100)}%`, background: pkg.color }} />
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-secondary btn-sm" style={{ gap: 5 }}>
                      <Edit2 size={13} /> تعديل
                    </button>
                    <button className="btn btn-ghost btn-sm" style={{ gap: 5, color: 'var(--danger)' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <button className={`btn btn-sm ${pkg.isActive ? 'btn-success' : 'btn-secondary'}`} style={{ gap: 5 }}>
                    {pkg.isActive ? <><ToggleRight size={14} /> نشطة</> : <><ToggleLeft size={14} /> معطلة</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Package Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal animate-fade-up" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">إضافة باقة جديدة</h3>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label">اسم الباقة *</label>
                  <input className="input" placeholder="مثال: باقة بريميوم" />
                </div>
                <div className="input-group">
                  <label className="input-label">نوع الباقة *</label>
                  <select className="input">
                    <option value="monthly">شهرية</option>
                    <option value="weekly">أسبوعية</option>
                    <option value="daily">يومية</option>
                    <option value="data">حجم بيانات</option>
                    <option value="unlimited">مفتوحة</option>
                    <option value="custom">مخصصة</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">السعر (جنيه) *</label>
                  <input type="number" className="input" placeholder="250" />
                </div>
                <div className="input-group">
                  <label className="input-label">سرعة التحميل (Mbps) *</label>
                  <input type="number" className="input" placeholder="25" />
                </div>
                <div className="input-group">
                  <label className="input-label">سرعة الرفع (Mbps)</label>
                  <input type="number" className="input" placeholder="5" />
                </div>
                <div className="input-group">
                  <label className="input-label">المدة (أيام) *</label>
                  <input type="number" className="input" placeholder="30" />
                </div>
                <div className="input-group">
                  <label className="input-label">حد التحميل (GB)</label>
                  <input type="number" className="input" placeholder="فارغ = مفتوحة" />
                </div>
                <div className="input-group">
                  <label className="input-label">لون الباقة</label>
                  <input type="color" className="input" defaultValue="#6366f1" style={{ height: 42, padding: '4px 8px', cursor: 'pointer' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>إلغاء</button>
                <button className="btn btn-primary"><Plus size={14} /> إضافة الباقة</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
