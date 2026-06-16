'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  Users, DollarSign, TrendingUp,
  WifiOff, AlertTriangle, CheckCircle, Activity,
  CreditCard, Zap, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, ChevronRight, MessageSquare, Server
} from 'lucide-react';
import Topbar from '@/components/Topbar';
import { useAppStore } from '@/lib/store';
import { useTranslation, translations } from '@/lib/translations';
import {
  mockDashboardStats, mockRevenueData, mockSubscriberGrowth,
  mockSubscribers, mockDevices, mockNotifications,
  mockUsageData, mockPackageDistribution, mockPayments
} from '@/lib/mockData';

export default function DashboardPage() {
  const { lang } = useAppStore();
  const t = useTranslation(lang);
  const stats = mockDashboardStats;
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function formatNumber(n: number) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US');
  }

  function formatCurrency(n: number) {
    if (lang === 'ar') {
      return n.toLocaleString('ar-EG') + ' ج';
    } else {
      return 'EGP ' + n.toLocaleString('en-US');
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
          {payload.map((p: any, i: number) => (
            <p key={i} style={{ fontSize: '0.8rem', fontWeight: 700, color: p.color }}>
              {p.name}: {typeof p.value === 'number' && p.value > 100 ? formatCurrency(p.value) : p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const statCards = [
    {
      label: t('total_subscribers'),
      value: formatNumber(stats.totalSubscribers),
      icon: Users,
      color: '#4f46e5',
      bg: 'rgba(79, 70, 229, 0.12)',
      change: '+' + stats.newSubscribersMonth,
      changeLabel: t('this_month'),
      trend: 'up',
    },
    {
      label: t('monthly_revenue'),
      value: formatCurrency(stats.monthRevenue),
      icon: DollarSign,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.12)',
      change: '+12.4%',
      changeLabel: t('compare_last_month'),
      trend: 'up',
    },
    {
      label: t('active_subscribers'),
      value: formatNumber(stats.activeSubscribers),
      icon: CheckCircle,
      color: '#06b6d4',
      bg: 'rgba(6, 182, 212, 0.12)',
      change: Math.round((stats.activeSubscribers / stats.totalSubscribers) * 100) + '%',
      changeLabel: t('activation_rate'),
      trend: 'up',
    },
    {
      label: t('outstanding_debts'),
      value: formatCurrency(stats.totalDebt),
      icon: AlertTriangle,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
      change: lang === 'ar' ? '3 عملاء' : '3 clients',
      changeLabel: t('have_debts'),
      trend: 'down',
    },
    {
      label: t('active_sessions'),
      value: formatNumber(stats.activeSessions),
      icon: Activity,
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.12)',
      change: '+42',
      changeLabel: t('last_hour'),
      trend: 'up',
    },
    {
      label: t('offline_devices'),
      value: stats.offlineDevices.toString(),
      icon: WifiOff,
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.12)',
      change: t('of') + ' ' + (stats.onlineDevices + stats.offlineDevices),
      changeLabel: t('total_devices'),
      trend: 'down',
    },
    {
      label: t('today_revenue'),
      value: formatCurrency(stats.todayRevenue),
      icon: TrendingUp,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.12)',
      change: '+' + stats.newSubscribersToday,
      changeLabel: t('joined_today'),
      trend: 'up',
    },
    {
      label: t('open_tickets'),
      value: stats.openTickets.toString(),
      icon: MessageSquare,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
      change: lang === 'ar' ? '2 عاجلة' : '2 urgent',
      changeLabel: t('urgent_tickets'),
      trend: 'down',
    },
  ];

  const getStatusLabel = (status: string) => {
    if (status === 'active') return t('active');
    if (status === 'suspended') return t('suspended');
    return t('expired');
  };

  const getStatusClass = (status: string) => {
    if (status === 'active') return 'badge-success';
    if (status === 'suspended') return 'badge-warning';
    return 'badge-danger';
  };

  const getDeviceStatusClass = (status: string) => {
    if (status === 'online') return 'badge-success';
    if (status === 'warning') return 'badge-warning';
    return 'badge-danger';
  };

  const getDeviceStatusLabel = (status: string) => {
    if (status === 'online') return t('online');
    if (status === 'warning') return t('warning');
    return t('offline');
  };

  const getPaymentMethodLabel = (method: string) => {
    const keyMap: Record<string, keyof typeof translations['ar']> = {
      cash: 'cash', instapay: 'instapay',
      bank_transfer: 'bank_transfer', wallet: 'wallet', card: 'card'
    };
    const key = keyMap[method] || method;
    return t(key as any);
  };

  const translatedPackageDist = mockPackageDistribution.map(pkg => {
    const nameMap: Record<string, keyof typeof translations['ar']> = {
      'الاقتصادية': 'economic',
      'المتوسطة': 'medium',
      'البريميوم': 'premium',
      'الألتيميت': 'ultimate',
      'أسبوعية': 'weekly',
      'بيانات': 'data'
    };
    const key = nameMap[pkg.name] || (pkg.name as any);
    return {
      ...pkg,
      name: t(key)
    };
  });

  return (
    <>
      <Topbar 
        title="لوحة التحكم" 
        subtitle={
          currentTime 
            ? currentTime.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              }) 
            : ''
        } 
      />

      <div className="page-wrapper">
        {/* KPI Cards */}
        <div className="grid-4 stagger" style={{ marginBottom: 24 }}>
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="stat-card animate-fade-up" style={{ '--gradient': `linear-gradient(90deg, ${card.color}, transparent)` } as any}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div className="stat-icon" style={{ background: card.bg }}>
                    <Icon size={20} color={card.color} />
                  </div>
                  <button className="btn btn-ghost btn-icon btn-sm">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
                <div className="stat-value">{card.value}</div>
                <div className="stat-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{card.label}</div>
                <div className={`stat-change ${card.trend}`}>
                  {card.trend === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  <span>{card.change}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> — {card.changeLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid-2" style={{ marginBottom: 24 }}>
          {/* Revenue Chart */}
          <div className="chart-wrapper animate-fade-up">
            <div className="card-header">
              <span className="card-title">
                <TrendingUp size={16} color="var(--primary)" />
                {t('monthly_revenue_chart')}
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                {(lang === 'ar' ? ['شهري', 'أسبوعي', 'يومي'] : ['Monthly', 'Weekly', 'Daily']).map((lbl, i) => (
                  <button key={lbl} className={`btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>{lbl}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000) + 'K'} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name={t('monthly_revenue')} stroke="var(--primary)" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Subscriber Growth */}
          <div className="chart-wrapper animate-fade-up">
            <div className="card-header">
              <span className="card-title">
                <Users size={16} color="var(--accent)" />
                {t('subscriber_growth_chart')}
              </span>
              <span className="badge badge-success">+{stats.newSubscribersMonth} {t('this_month')}</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockSubscriberGrowth}>
                <defs>
                  <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name={t('subscribers')} stroke="var(--accent)" strokeWidth={2.5} fill="url(#subGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usage + Packages */}
        <div className="grid-2" style={{ marginBottom: 24 }}>
          {/* Daily Usage */}
          <div className="chart-wrapper animate-fade-up">
            <div className="card-header">
              <span className="card-title">
                <Activity size={16} color="var(--secondary)" />
                {t('network_usage_chart')}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GB</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockUsageData} barSize={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="download" name={lang === 'ar' ? 'تنزيل' : 'Download'} fill="var(--secondary)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="upload" name={lang === 'ar' ? 'رفع' : 'Upload'} fill="var(--accent)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Package Distribution */}
          <div className="chart-wrapper animate-fade-up">
            <div className="card-header">
              <span className="card-title">
                <CreditCard size={16} color="var(--warning)" />
                {t('package_dist_chart')}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stats.totalSubscribers} {t('subscribers')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={translatedPackageDist}
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={80}
                    paddingAngle={3} dataKey="value"
                  >
                    {translatedPackageDist.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value + ` ${t('subscribers')}`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {translatedPackageDist.map((pkg, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: pkg.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', flex: 1 }}>{pkg.name}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{pkg.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 320px', gap: 16 }}>
          {/* Recent Subscribers */}
          <div className="card animate-fade-up">
            <div className="card-header">
              <span className="card-title"><Users size={15} color="var(--primary)" /> {t('recent_subscribers')}</span>
              <Link href="/subscribers" style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                {t('view_all')} <ChevronRight size={13} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {mockSubscribers.slice(0, 6).map((sub, i) => (
                <div key={sub.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 0',
                  borderBottom: i < 5 ? '1px solid var(--border)' : 'none'
                }}>
                  <div className="avatar" style={{ width: 34, height: 34, fontSize: '0.75rem', flexShrink: 0, background: ['#4f46e5','#7c3aed','#0891b2','#10b981','#f59e0b','#ef4444'][i % 6] }}>
                    {sub.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sub.package.name} — {sub.phone}</div>
                  </div>
                  <span className={`badge ${getStatusClass(sub.status)}`} style={{ fontSize: '0.68rem' }}>{getStatusLabel(sub.status)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Devices Status */}
          <div className="card animate-fade-up">
            <div className="card-header">
              <span className="card-title"><Server size={15} color="var(--accent)" /> {t('device_status')}</span>
              <Link href="/network" style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                {t('view_all')} <ChevronRight size={13} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, background: 'var(--success-bg)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: 'var(--radius-md)', padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--success-light)' }}>{stats.onlineDevices}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t('online')}</div>
              </div>
              <div style={{ flex: 1, background: 'var(--danger-bg)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: 'var(--radius-md)', padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--danger-light)' }}>{stats.offlineDevices}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t('offline')}</div>
              </div>
              <div style={{ flex: 1, background: 'var(--warning-bg)', border: '1px solid rgba(245,158,11,0.12)', borderRadius: 'var(--radius-md)', padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--warning-light)' }}>1</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t('warning')}</div>
              </div>
            </div>
            {mockDevices.map((device, i) => (
              <div key={device.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 0',
                borderBottom: i < mockDevices.length - 1 ? '1px solid var(--border)' : 'none'
              }}>
                <span className={`status-dot ${device.status}`} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{device.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {device.ip} — {device.connectedClients} {lang === 'ar' ? 'عميل' : 'clients'}
                  </div>
                </div>
                {device.temperature && (
                  <span style={{ fontSize: '0.7rem', color: device.temperature > 50 ? 'var(--danger-light)' : 'var(--text-muted)' }}>
                    {device.temperature}°C
                  </span>
                )}
                <span className={`badge ${getDeviceStatusClass(device.status)}`} style={{ fontSize: '0.65rem' }}>{getDeviceStatusLabel(device.status)}</span>
              </div>
            ))}
          </div>

          {/* Notifications Feed */}
          <div className="card animate-fade-up">
            <div className="card-header">
              <span className="card-title"><Zap size={15} color="var(--warning)" /> {t('recent_alerts')}</span>
              <div className="live-badge">
                <span className="live-dot" />{t('live')}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {mockNotifications.map((notif) => {
                const colors: Record<string, string> = {
                  danger: 'var(--danger)', warning: 'var(--warning)',
                  success: 'var(--success)', info: 'var(--info)'
                };
                const bgs: Record<string, string> = {
                  danger: 'var(--danger-bg)', warning: 'var(--warning-bg)',
                  success: 'var(--success-bg)', info: 'var(--info-bg)'
                };
                return (
                  <div key={notif.id} style={{
                    background: bgs[notif.type],
                    border: `1px solid ${colors[notif.type]}20`,
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 12px',
                    borderRight: lang === 'ar' ? `3px solid ${colors[notif.type]}` : 'none',
                    borderLeft: lang === 'en' ? `3px solid ${colors[notif.type]}` : 'none',
                    opacity: notif.isRead ? 0.6 : 1,
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{notif.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{notif.message}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>
                      {new Date(notif.createdAt).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Payments */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <DollarSign size={14} color="var(--success)" />
                {t('recent_payments')}
              </div>
              {mockPayments.slice(0, 4).map((pay) => (
                <div key={pay.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: '0.77rem', fontWeight: 500, color: 'var(--text-primary)' }}>{pay.subscriberName.split(' ')[0]}</div>
                    <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)' }}>{getPaymentMethodLabel(pay.method)}</div>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--success-light)' }}>{formatCurrency(pay.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
