'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, CreditCard, Package, DollarSign,
  FileText, AlertCircle, Wifi, Map, UserCheck, Ticket,
  BarChart3, Bot, Bell, Settings, LogOut, Zap, ChevronRight,
  Store
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useTranslation, translations } from '@/lib/translations';

interface NavSection {
  titleKey: keyof typeof translations['ar'];
  items: NavItem[];
}

interface NavItem {
  labelKey: keyof typeof translations['ar'];
  icon: React.ElementType;
  href: string;
  badge?: number;
}

const navSections: NavSection[] = [
  {
    titleKey: 'home',
    items: [
      { labelKey: 'dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { labelKey: 'notifications', icon: Bell, href: '/notifications', badge: 3 },
    ],
  },
  {
    titleKey: 'client_management',
    items: [
      { labelKey: 'subscribers', icon: Users, href: '/subscribers' },
      { labelKey: 'package_label', icon: Package, href: '/packages' },
      { labelKey: 'cards', icon: CreditCard, href: '/cards' },
    ],
  },
  {
    titleKey: 'finance',
    items: [
      { labelKey: 'payments', icon: DollarSign, href: '/payments' },
      { labelKey: 'invoices', icon: FileText, href: '/invoices' },
      { labelKey: 'debts', icon: AlertCircle, href: '/debts', badge: 3 },
    ],
  },
  {
    titleKey: 'network',
    items: [
      { labelKey: 'devices', icon: Wifi, href: '/network', badge: 1 },
      { labelKey: 'network_map', icon: Map, href: '/map' },
    ],
  },
  {
    titleKey: 'management',
    items: [
      { labelKey: 'employees', icon: UserCheck, href: '/employees' },
      { labelKey: 'resellers', icon: Store, href: '/resellers' },
      { labelKey: 'tickets', icon: Ticket, href: '/tickets', badge: 2 },
    ],
  },
  {
    titleKey: 'analytics',
    items: [
      { labelKey: 'reports', icon: BarChart3, href: '/reports' },
      { labelKey: 'ai_assistant', icon: Bot, href: '/ai-assistant' },
    ],
  },
  {
    titleKey: 'settings',
    items: [
      { labelKey: 'settings', icon: Settings, href: '/settings' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { lang } = useAppStore();
  const t = useTranslation(lang);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Zap size={18} color="white" />
        </div>
        <div>
          <div className="logo-text">NetFlow</div>
          <div className="logo-sub">ISP Manager Pro</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navSections.map((section, idx) => (
          <div key={idx}>
            <div className="nav-section-title">{t(section.titleKey)}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item ${active ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" size={17} />
                  <span style={{ flex: 1, fontSize: '0.85rem' }}>{t(item.labelKey)}</span>
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                  {active && (
                    <ChevronRight 
                      size={14} 
                      style={{ 
                        opacity: 0.6, 
                        transform: lang === 'ar' ? 'rotate(180deg)' : 'none',
                        transition: 'transform var(--transition-base)'
                      }} 
                    />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div style={{ marginBottom: 8, padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.75rem', flexShrink: 0 }}>
              {lang === 'ar' ? 'م' : 'M'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {t('user_name')}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {t('sys_admin')}
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', gap: 8, color: 'var(--danger-light)', fontSize: '0.8rem' }}>
          <LogOut size={15} />
          {t('logout')}
        </button>
      </div>
    </aside>
  );
}
