'use client';
import { Bell, Search, Sun, Moon, RefreshCw } from 'lucide-react';
import { mockNotifications } from '@/lib/mockData';
import { useState } from 'react';

interface TopbarProps {
  title?: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const [darkMode, setDarkMode] = useState(true);
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <header className="topbar">
      <div>
        {title && <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h1>}
        {subtitle && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 1 }}>{subtitle}</p>}
      </div>

      <div className="topbar-search">
        <div className="search-wrapper">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="بحث عن مشترك، كارت، فاتورة..."
          />
        </div>
      </div>

      <div className="topbar-actions">
        {/* Live indicator */}
        <div className="live-badge">
          <span className="live-dot" />
          مباشر
        </div>

        {/* Refresh */}
        <button className="btn btn-ghost btn-icon" title="تحديث">
          <RefreshCw size={16} />
        </button>

        {/* Notifications */}
        <button className="btn btn-ghost btn-icon notif-indicator" title="الإشعارات" style={{ position: 'relative' }}>
          <Bell size={16} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: 4, right: 4,
              background: 'var(--danger)', color: 'white',
              fontSize: '0.6rem', fontWeight: 700,
              padding: '1px 4px', borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--bg-surface)',
              minWidth: 14, textAlign: 'center'
            }}>{unreadCount}</span>
          )}
        </button>

        {/* Dark mode toggle */}
        <button
          className="btn btn-ghost btn-icon"
          onClick={() => setDarkMode(!darkMode)}
          title="تغيير المظهر"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Avatar */}
        <div className="avatar" title="الملف الشخصي">م</div>
      </div>
    </header>
  );
}
