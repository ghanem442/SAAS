'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  UserCheck, Plus, Edit2, Trash2, Shield, Wrench,
  Phone, Mail, Clock, MoreVertical, Eye, Lock, User
} from 'lucide-react';
import { mockEmployees } from '@/lib/mockData';

export default function EmployeesPage() {
  const [showModal, setShowModal] = useState(false);

  const roleInfo = (role: string) => ({
    admin: { label: 'مدير النظام', color: '#6366f1', icon: Shield },
    accountant: { label: 'محاسب', color: '#10b981', icon: UserCheck },
    technician: { label: 'فني', color: '#06b6d4', icon: Wrench },
    support: { label: 'خدمة عملاء', color: '#f59e0b', icon: User },
    reseller: { label: 'موزع', color: '#8b5cf6', icon: UserCheck },
  })[role] || { label: role, color: '#6366f1', icon: User };

  const permissionLabels: Record<string, string> = {
    all: 'كل الصلاحيات', payments: 'المدفوعات', invoices: 'الفواتير',
    reports: 'التقارير', devices: 'الأجهزة', tickets: 'التذاكر',
    network: 'الشبكة', subscribers_view: 'عرض المشتركين',
  };

  const avatarColors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <>
      <Topbar title="إدارة الموظفين" subtitle={`${mockEmployees.length} موظفين مسجلين`} />
      <div className="page-wrapper">

        {/* Stats */}
        <div className="grid-4 stagger" style={{ marginBottom: 24 }}>
          {[
            { label: 'إجمالي الموظفين', value: mockEmployees.length, color: '#6366f1' },
            { label: 'نشطين الآن', value: mockEmployees.filter(e => e.status === 'active').length, color: '#10b981' },
            { label: 'أدوار مختلفة', value: 4, color: '#06b6d4' },
            { label: 'آخر دخول', value: 'منذ دقيقة', color: '#f59e0b' },
          ].map((s, i) => (
            <div key={i} className="stat-card animate-fade-up">
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="page-header">
          <div>
            <h2 className="page-title">فريق العمل</h2>
            <p className="page-subtitle">إدارة الموظفين وصلاحياتهم</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15} /> موظف جديد
          </button>
        </div>

        {/* Employees Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {mockEmployees.map((emp, i) => {
            const role = roleInfo(emp.role);
            const RoleIcon = role.icon;
            return (
              <div key={emp.id} className="card animate-fade-up" style={{ position: 'relative' }}>
                {/* Status indicator */}
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  width: 10, height: 10, borderRadius: '50%',
                  background: emp.status === 'active' ? 'var(--success)' : 'var(--text-muted)',
                  boxShadow: emp.status === 'active' ? '0 0 8px var(--success)' : 'none',
                }} />

                {/* Actions */}
                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 4 }}>
                  <button className="btn btn-ghost btn-icon btn-sm"><Edit2 size={13} /></button>
                  <button className="btn btn-ghost btn-icon btn-sm" style={{ color: 'var(--danger)' }}><Trash2 size={13} /></button>
                </div>

                {/* Avatar + Name */}
                <div style={{ textAlign: 'center', marginBottom: 16, marginTop: 8 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${avatarColors[i % avatarColors.length]}, ${avatarColors[(i + 1) % avatarColors.length]})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', fontWeight: 700, color: 'white',
                    margin: '0 auto 12px',
                    boxShadow: `0 0 20px ${avatarColors[i % avatarColors.length]}40`,
                  }}>
                    {emp.name.charAt(0)}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 6 }}>{emp.name}</div>
                  <span className="badge" style={{
                    background: `${role.color}18`, color: role.color,
                    border: `1px solid ${role.color}30`, display: 'inline-flex', alignItems: 'center', gap: 5,
                  }}>
                    <RoleIcon size={11} /> {role.label}
                  </span>
                </div>

                {/* Contact */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <Phone size={13} color="var(--text-muted)" /> {emp.phone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <Mail size={13} color="var(--text-muted)" /> {emp.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <Clock size={13} color="var(--text-muted)" />
                    آخر دخول: {emp.lastLogin ? new Date(emp.lastLogin).toLocaleString('ar-EG', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }) : 'لم يسجل دخول'}
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Lock size={11} /> الصلاحيات
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {emp.permissions.slice(0, 4).map((p, pi) => (
                      <span key={pi} className="badge badge-secondary" style={{ fontSize: '0.62rem' }}>
                        {permissionLabels[p] || p}
                      </span>
                    ))}
                    {emp.permissions.length > 4 && (
                      <span className="badge badge-primary" style={{ fontSize: '0.62rem' }}>+{emp.permissions.length - 4}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <button className="btn btn-secondary btn-sm" style={{ flex: 1, gap: 5 }}>
                    <Eye size={13} /> عرض
                  </button>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1, gap: 5 }}>
                    <Lock size={13} /> الصلاحيات
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal animate-fade-up" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">إضافة موظف جديد</h3>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="input-group" style={{ gridColumn: '1/-1' }}>
                  <label className="input-label">الاسم الكامل *</label>
                  <input className="input" placeholder="اسم الموظف" />
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
                  <label className="input-label">الدور الوظيفي *</label>
                  <select className="input">
                    <option value="admin">مدير النظام</option>
                    <option value="accountant">محاسب</option>
                    <option value="technician">فني</option>
                    <option value="support">خدمة عملاء</option>
                    <option value="reseller">موزع</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">كلمة المرور *</label>
                  <input type="password" className="input" placeholder="كلمة المرور" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>إلغاء</button>
                <button className="btn btn-primary"><Plus size={14} /> إضافة الموظف</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
