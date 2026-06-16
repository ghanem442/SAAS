'use client';
import { Bell, Search, Sun, Moon, RefreshCw, Languages } from 'lucide-react';
import { mockNotifications } from '@/lib/mockData';
import { useAppStore } from '@/lib/store';
import { useTranslation, translations } from '@/lib/translations';
import { useEffect, useState } from 'react';

interface TopbarProps {
  title?: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const { theme, lang, toggleTheme, toggleLang } = useAppStore();
  const t = useTranslation(lang);
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const date = new Date();
    setFormattedDate(
      date.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    );
  }, [lang]);

  const getTranslatedTitle = (inputTitle?: string) => {
    if (!inputTitle) return '';
    const titleMap: Record<string, keyof typeof translations['ar']> = {
      'لوحة التحكم': 'dashboard',
      'Dashboard': 'dashboard',
      'المشتركين': 'subscribers',
      'Subscribers': 'subscribers',
      'الباقات': 'packages',
      'Packages': 'packages',
      'الكروت': 'cards',
      'Cards': 'cards',
      'المدفوعات': 'payments',
      'Payments': 'payments',
      'الفواتير': 'invoices',
      'Invoices': 'invoices',
      'الديون': 'debts',
      'Debts': 'debts',
      'الأجهزة': 'devices',
      'Devices': 'devices',
      'خريطة الشبكة': 'network_map',
      'Network Map': 'network_map',
      'الموظفين': 'employees',
      'Employees': 'employees',
      'الموزعين': 'resellers',
      'Resellers': 'resellers',
      'الشكاوى': 'tickets',
      'Support Tickets': 'tickets',
      'التقارير': 'reports',
      'Reports': 'reports',
      'مساعد الذكاء': 'ai_assistant',
      'AI Assistant': 'ai_assistant',
      'الإعدادات': 'settings',
      'Settings': 'settings',
      'الإشعارات': 'notifications',
      'Notifications': 'notifications'
    };
    const key = titleMap[inputTitle] || inputTitle;
    return t(key as any);
  };

  return (
    <header className="topbar">
      <div>
        {title && <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'inherit' }}>{getTranslatedTitle(title)}</h1>}
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{subtitle || formattedDate}</p>
      </div>

      <div className="topbar-search">
        <div className="search-wrapper">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={t('search_placeholder')}
          />
        </div>
      </div>

      <div className="topbar-actions">
        {/* Live indicator */}
        <div className="live-badge">
          <span className="live-dot" />
          {t('live')}
        </div>

        {/* Refresh */}
        <button className="btn btn-ghost btn-icon" title={t('refresh')}>
          <RefreshCw size={15} />
        </button>

        {/* Language Toggle */}
        <button 
          className="btn btn-ghost" 
          onClick={toggleLang} 
          title={t('lang_toggle')} 
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', fontSize: '0.8rem', fontWeight: 600 }}
        >
          <Languages size={15} />
          <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
        </button>

        {/* Theme toggle */}
        <button
          className="btn btn-ghost btn-icon"
          onClick={toggleTheme}
          title={t('theme_toggle')}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Notifications */}
        <button className="btn btn-ghost btn-icon notif-indicator" title={t('notifications')} style={{ position: 'relative' }}>
          <Bell size={15} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: 4, right: 4,
              background: 'var(--danger)', color: 'white',
              fontSize: '0.55rem', fontWeight: 700,
              padding: '1px 4px', borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--bg-surface)',
              minWidth: 14, textAlign: 'center'
            }}>{unreadCount}</span>
          )}
        </button>

        {/* Avatar */}
        <div className="avatar" title={t('user_name')}>{lang === 'ar' ? 'م' : 'M'}</div>
      </div>
    </header>
  );
}
