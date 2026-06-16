'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, CreditCard, Package, DollarSign,
  FileText, AlertCircle, Wifi, Map, UserCheck, Ticket,
  BarChart3, Bot, Bell, Settings, LogOut, Zap, ChevronRight,
  Wrench, Store, ShoppingCart
} from 'lucide-react';

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

const navSections: NavSection[] = [
  {
    title: 'الرئيسية',
    items: [
      { label: 'لوحة التحكم', icon: LayoutDashboard, href: '/dashboard' },
      { label: 'الإشعارات', icon: Bell, href: '/notifications', badge: 3 },
    ],
  },
  {
    title: 'إدارة العملاء',
    items: [
      { label: 'المشتركين', icon: Users, href: '/subscribers' },
      { label: 'الباقات', icon: Package, href: '/packages' },
      { label: 'الكروت', icon: CreditCard, href: '/cards' },
    ],
  },
  {
    title: 'المالية',
    items: [
      { label: 'المدفوعات', icon: DollarSign, href: '/payments' },
      { label: 'الفواتير', icon: FileText, href: '/invoices' },
      { label: 'الديون', icon: AlertCircle, href: '/debts', badge: 3 },
    ],
  },
  {
    title: 'الشبكة',
    items: [
      { label: 'الأجهزة', icon: Wifi, href: '/network', badge: 1 },
      { label: 'خريطة الشبكة', icon: Map, href: '/map' },
    ],
  },
  {
    title: 'الإدارة',
    items: [
      { label: 'الموظفين', icon: UserCheck, href: '/employees' },
      { label: 'الموزعين', icon: Store, href: '/resellers' },
      { label: 'الشكاوى', icon: Ticket, href: '/tickets', badge: 2 },
    ],
  },
  {
    title: 'التحليلات',
    items: [
      { label: 'التقارير', icon: BarChart3, href: '/reports' },
      { label: 'مساعد الذكاء', icon: Bot, href: '/ai-assistant' },
    ],
  },
  {
    title: 'الإعدادات',
    items: [
      { label: 'الإعدادات', icon: Settings, href: '/settings' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

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
        {navSections.map((section) => (
          <div key={section.title}>
            <div className="nav-section-title">{section.title}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item ${active ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" size={18} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                  {active && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
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
            <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.75rem' }}>م</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>موسى علي</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>مدير النظام</div>
            </div>
          </div>
        </div>
        <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', gap: 8, color: 'var(--danger-light)', fontSize: '0.8rem' }}>
          <LogOut size={15} />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
