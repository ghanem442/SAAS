'use client';
import Topbar from '@/components/Topbar';
import { mockNotifications } from '@/lib/mockData';
import { Bell, CheckCheck, Trash2, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(mockNotifications);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  const deleteNotif = (id: string) => setNotifs(prev => prev.filter(n => n.id !== id));

  const typeConfig = {
    danger: { color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', icon: AlertTriangle, label: 'تحذير' },
    warning: { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', icon: Zap, label: 'تنبيه' },
    success: { color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', icon: CheckCircle, label: 'نجاح' },
    info: { color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', icon: Info, label: 'معلومة' },
  };

  const unreadCount = notifs.filter(n => !n.isRead).length;

  return (
    <>
      <Topbar title="الإشعارات" subtitle={`${unreadCount} إشعار غير مقروء`} />
      <div className="page-wrapper" style={{ maxWidth: 800 }}>

        {/* Header */}
        <div className="page-header" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99,102,241,0.3)' }}>
              <Bell size={20} color="var(--primary)" />
            </div>
            <div>
              <h2 className="page-title">مركز الإشعارات</h2>
              <p className="page-subtitle">{notifs.length} إشعار إجمالي، {unreadCount} غير مقروء</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button className="btn btn-secondary btn-sm" onClick={markAllRead} style={{ gap: 6 }}>
              <CheckCheck size={14} /> تحديد الكل كمقروء
            </button>
          )}
        </div>

        {/* Notifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {notifs.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon"><Bell size={28} /></div>
              <h3>لا توجد إشعارات</h3>
              <p>كل شيء على ما يرام!</p>
            </div>
          )}
          {notifs.map(notif => {
            const cfg = typeConfig[notif.type as keyof typeof typeConfig];
            const Icon = cfg.icon;
            return (
              <div key={notif.id} className="animate-fade-up" style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                background: notif.isRead ? 'var(--bg-card)' : cfg.bg,
                border: `1px solid ${notif.isRead ? 'var(--border)' : cfg.border}`,
                borderRadius: 'var(--radius-lg)',
                padding: '16px 18px',
                borderRight: `4px solid ${notif.isRead ? 'var(--border)' : cfg.color}`,
                transition: 'all 0.2s',
                opacity: notif.isRead ? 0.7 : 1,
              }}>
                {/* Icon */}
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-md)',
                  background: `${cfg.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={18} color={cfg.color} />
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                    <div>
                      <span className="badge" style={{
                        background: `${cfg.color}15`, color: cfg.color, border: `1px solid ${cfg.color}30`,
                        fontSize: '0.62rem', marginBottom: 4, display: 'inline-block',
                      }}>{cfg.label}</span>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{notif.title}</div>
                    </div>
                    {!notif.isRead && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color, flexShrink: 0, marginTop: 4, boxShadow: `0 0 8px ${cfg.color}` }} />
                    )}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{notif.message}</p>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    🕐 {new Date(notif.createdAt).toLocaleString('ar-EG', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  {!notif.isRead && (
                    <button className="btn btn-ghost btn-icon btn-sm" title="تحديد كمقروء" onClick={() => markRead(notif.id)}>
                      <CheckCheck size={14} />
                    </button>
                  )}
                  <button className="btn btn-ghost btn-icon btn-sm" title="حذف" style={{ color: 'var(--danger)' }} onClick={() => deleteNotif(notif.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
