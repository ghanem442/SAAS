'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  Search, Plus, Filter, Download, Users, CheckCircle,
  XCircle, Clock, ChevronRight, Phone, MapPin, Wifi,
  Edit2, Trash2, RefreshCw, Eye, MoreVertical
} from 'lucide-react';
import { mockSubscribers } from '@/lib/mockData';
import { Subscriber } from '@/types';

type FilterStatus = 'all' | 'active' | 'suspended' | 'expired';

export default function SubscribersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subscriber | null>(null);

  const filtered = mockSubscribers.filter(s => {
    const matchSearch = s.name.includes(search) || s.phone.includes(search) || s.address.includes(search);
    const matchFilter = filter === 'all' || s.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: mockSubscribers.length,
    active: mockSubscribers.filter(s => s.status === 'active').length,
    suspended: mockSubscribers.filter(s => s.status === 'suspended').length,
    expired: mockSubscribers.filter(s => s.status === 'expired').length,
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') return { cls: 'badge-success', label: 'نشط' };
    if (status === 'suspended') return { cls: 'badge-warning', label: 'موقوف' };
    return { cls: 'badge-danger', label: 'منتهي' };
  };

  const getDataUsagePercent = (s: Subscriber) => {
    if (s.totalData === -1) return -1;
    return Math.round((s.usedData / s.totalData) * 100);
  };

  const getDaysLeft = (expiryDate: string) => {
    const diff = new Date(expiryDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <>
      <Topbar title="إدارة المشتركين" subtitle={`${counts.all} مشترك مسجل`} />

      <div className="page-wrapper">
        {/* Summary Tabs */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {([
            { key: 'all', label: 'الكل', icon: Users, color: 'var(--primary)' },
            { key: 'active', label: 'نشط', icon: CheckCircle, color: 'var(--success)' },
            { key: 'suspended', label: 'موقوف', icon: XCircle, color: 'var(--warning)' },
            { key: 'expired', label: 'منتهي', icon: Clock, color: 'var(--danger)' },
          ] as { key: FilterStatus; label: string; icon: any; color: string }[]).map(tab => {
            const Icon = tab.icon;
            const active = filter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="card"
                style={{
                  flex: 1, minWidth: 140, cursor: 'pointer', padding: '14px 18px',
                  border: active ? `1px solid ${tab.color}40` : '1px solid var(--border)',
                  background: active ? `${tab.color}10` : 'var(--bg-card)',
                  display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: `${tab.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color={tab.color} />
                </div>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: active ? tab.color : 'var(--text-primary)' }}>{counts[tab.key]}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tab.label}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-wrapper" style={{ flex: 1, minWidth: 250 }}>
            <Search size={15} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="ابحث بالاسم أو الهاتف أو العنوان..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary" style={{ gap: 6 }}>
            <Filter size={15} /> فلترة
          </button>
          <button className="btn btn-secondary" style={{ gap: 6 }}>
            <Download size={15} /> تصدير
          </button>
          <button className="btn btn-primary" style={{ gap: 6 }} onClick={() => setShowModal(true)}>
            <Plus size={15} /> مشترك جديد
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper animate-fade-up">
          <table>
            <thead>
              <tr>
                <th>المشترك</th>
                <th>الباقة</th>
                <th>الحالة</th>
                <th>الاستهلاك</th>
                <th>ينتهي في</th>
                <th>الرصيد</th>
                <th>آخر ظهور</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => {
                const { cls, label } = getStatusBadge(sub.status);
                const pct = getDataUsagePercent(sub);
                const daysLeft = getDaysLeft(sub.expiryDate);
                return (
                  <tr key={sub.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="avatar" style={{ width: 34, height: 34, fontSize: '0.75rem', flexShrink: 0 }}>
                          {sub.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{sub.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Phone size={10} /> {sub.phone}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <MapPin size={10} /> {sub.address.split('،')[0]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.82rem' }}>{sub.package.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        <Wifi size={10} style={{ display: 'inline' }} /> {sub.downloadSpeed}M/{sub.uploadSpeed}M
                      </div>
                    </td>
                    <td><span className={`badge ${cls}`}>{label}</span></td>
                    <td style={{ minWidth: 120 }}>
                      {pct === -1 ? (
                        <span style={{ fontSize: '0.75rem', color: 'var(--success-light)' }}>غير محدود</span>
                      ) : (
                        <>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                            {sub.usedData} / {sub.totalData} GB ({pct}%)
                          </div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{
                              width: `${pct}%`,
                              background: pct > 80 ? 'var(--danger)' : pct > 60 ? 'var(--warning)' : 'linear-gradient(90deg, var(--primary), var(--accent))'
                            }} />
                          </div>
                        </>
                      )}
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.82rem', fontWeight: 600,
                        color: daysLeft <= 3 ? 'var(--danger-light)' : daysLeft <= 7 ? 'var(--warning-light)' : 'var(--text-primary)'
                      }}>
                        {daysLeft > 0 ? `${daysLeft} يوم` : 'منتهي'}
                      </span>
                    </td>
                    <td>
                      {sub.debt > 0 ? (
                        <span style={{ color: 'var(--danger-light)', fontWeight: 600, fontSize: '0.82rem' }}>
                          -{sub.debt} ج
                        </span>
                      ) : (
                        <span style={{ color: 'var(--success-light)', fontWeight: 600, fontSize: '0.82rem' }}>مسدد</span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {sub.lastSeen ? new Date(sub.lastSeen).toLocaleString('ar-EG', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }) : '—'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-ghost btn-icon btn-sm" title="عرض">
                          <Eye size={14} />
                        </button>
                        <button className="btn btn-ghost btn-icon btn-sm" title="تعديل">
                          <Edit2 size={14} />
                        </button>
                        {sub.status === 'active' ? (
                          <button className="btn btn-ghost btn-icon btn-sm" title="إيقاف" style={{ color: 'var(--warning)' }}>
                            <XCircle size={14} />
                          </button>
                        ) : (
                          <button className="btn btn-ghost btn-icon btn-sm" title="تفعيل" style={{ color: 'var(--success)' }}>
                            <RefreshCw size={14} />
                          </button>
                        )}
                        <button className="btn btn-ghost btn-icon btn-sm" title="حذف" style={{ color: 'var(--danger)' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon"><Users size={28} /></div>
              <h3>لا توجد نتائج</h3>
              <p>جرب تغيير الفلاتر أو كلمة البحث</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            عرض {filtered.length} من {mockSubscribers.length} مشترك
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3, '...', 12].map((p, i) => (
              <button key={i} className={`btn btn-sm ${p === 1 ? 'btn-primary' : 'btn-secondary'}`} style={{ minWidth: 32 }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Subscriber Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal animate-fade-up" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">إضافة مشترك جديد</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'الاسم الكامل', placeholder: 'أحمد محمد علي', type: 'text', required: true },
                { label: 'رقم الهاتف', placeholder: '01012345678', type: 'tel', required: true },
                { label: 'العنوان', placeholder: 'شارع الجمهورية، المنصورة', type: 'text', required: true, full: true },
                { label: 'الرقم القومي', placeholder: '12345678901234', type: 'text' },
                { label: 'عنوان IP', placeholder: '192.168.1.xxx', type: 'text' },
              ].map((field, i) => (
                <div key={i} className="input-group" style={{ gridColumn: field.full ? '1 / -1' : 'auto' }}>
                  <label className="input-label">{field.label} {field.required && <span style={{ color: 'var(--danger)' }}>*</span>}</label>
                  <input type={field.type} className="input" placeholder={field.placeholder} />
                </div>
              ))}
              <div className="input-group">
                <label className="input-label">الباقة <span style={{ color: 'var(--danger)' }}>*</span></label>
                <select className="input">
                  <option value="">اختر الباقة</option>
                  <option value="1">الاقتصادية — 150 ج/شهر</option>
                  <option value="2">المتوسطة — 250 ج/شهر</option>
                  <option value="3">البريميوم — 400 ج/شهر</option>
                  <option value="4">الألتيميت — 650 ج/شهر</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">ملاحظات</label>
                <input type="text" className="input" placeholder="ملاحظات إضافية..." />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>إلغاء</button>
              <button className="btn btn-primary">
                <Plus size={15} /> إضافة المشترك
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
