'use client';
import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  Users, DollarSign, TrendingUp, TrendingDown, Wifi,
  WifiOff, AlertTriangle, CheckCircle, Activity,
  CreditCard, Clock, Zap, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, ChevronRight, MessageSquare, Server
} from 'lucide-react';
import Topbar from '@/components/Topbar';
import {
  mockDashboardStats, mockRevenueData, mockSubscriberGrowth,
  mockSubscribers, mockDevices, mockNotifications,
  mockUsageData, mockPackageDistribution, mockPayments
} from '@/lib/mockData';

function formatNumber(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toLocaleString('ar-EG');
}

function formatCurrency(n: number) {
  return n.toLocaleString('ar-EG') + ' ج';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontSize: '0.85rem', fontWeight: 600, color: p.color }}>
            {p.name}: {typeof p.value === 'number' && p.value > 1000 ? formatCurrency(p.value) : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const statCards = [
    {
      label: 'إجمالي المشتركين',
      value: formatNumber(stats.totalSubscribers),
      icon: Users,
      color: '#6366f1',
      bg: 'rgba(99,102,241,0.12)',
      change: '+' + stats.newSubscribersMonth,
      changeLabel: 'هذا الشهر',
      trend: 'up',
    },
    {
      label: 'إيرادات الشهر',
      value: formatCurrency(stats.monthRevenue),
      icon: DollarSign,
      color: '#10b981',
      bg: 'rgba(16,185,129,0.12)',
      change: '+12.4%',
      changeLabel: 'مقارنة بالشهر السابق',
      trend: 'up',
    },
    {
      label: 'المشتركين النشطين',
      value: formatNumber(stats.activeSubscribers),
      icon: CheckCircle,
      color: '#06b6d4',
      bg: 'rgba(6,182,212,0.12)',
      change: Math.round((stats.activeSubscribers / stats.totalSubscribers) * 100) + '%',
      changeLabel: 'نسبة التفعيل',
      trend: 'up',
    },
    {
      label: 'الديون المستحقة',
      value: formatCurrency(stats.totalDebt),
      icon: AlertTriangle,
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.12)',
      change: '3 عملاء',
      changeLabel: 'لديهم ديون',
      trend: 'down',
    },
    {
      label: 'الجلسات النشطة',
      value: formatNumber(stats.activeSessions),
      icon: Activity,
      color: '#8b5cf6',
      bg: 'rgba(139,92,246,0.12)',
      change: '+' + Math.floor(Math.random() * 20 + 10),
      changeLabel: 'آخر ساعة',
      trend: 'up',
    },
    {
      label: 'أجهزة غير متصلة',
      value: stats.offlineDevices.toString(),
      icon: WifiOff,
      color: '#ef4444',
      bg: 'rgba(239,68,68,0.12)',
      change: 'من ' + (stats.onlineDevices + stats.offlineDevices),
      changeLabel: 'إجمالي الأجهزة',
      trend: 'down',
    },
    {
      label: 'إيرادات اليوم',
      value: formatCurrency(stats.todayRevenue),
      icon: TrendingUp,
      color: '#10b981',
      bg: 'rgba(16,185,129,0.12)',
      change: '+' + stats.newSubscribersToday + ' مشترك',
      changeLabel: 'انضموا اليوم',
      trend: 'up',
    },
    {
      label: 'تذاكر مفتوحة',
      value: stats.openTickets.toString(),
      icon: MessageSquare,
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.12)',
      change: '2 عاجلة',
      changeLabel: 'تحتاج رد سريع',
      trend: 'down',
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'active') return 'var(--success)';
    if (status === 'suspended') return 'var(--warning)';
    return 'var(--danger)';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'active') return 'نشط';
    if (status === 'suspended') return 'موقوف';
    return 'منتهي';
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
    if (status === 'online') return 'متصل';
    if (status === 'warning') return 'تحذير';
    return 'غير متصل';
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      cash: 'نقدي', instapay: 'InstaPay',
      bank_transfer: 'تحويل بنكي', wallet: 'محفظة', card: 'بطاقة'
    };
    return labels[method] || method;
  };

  return (
    <>
      <Topbar title="لوحة التحكم" subtitle={currentTime.toLocaleString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })} />

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
                <div className="stat-label">{card.label}</div>
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
                الإيرادات الشهرية
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                {['شهري', 'أسبوعي', 'يومي'].map((t, i) => (
                  <button key={t} className={`btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-ghost'}`} style={{ padding: '4px 10px', fontSize: '0.75rem' }}>{t}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000) + 'K'} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="الإيرادات" stroke="#6366f1" strokeWidth={2} fill="url(#revenueGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Subscriber Growth */}
          <div className="chart-wrapper animate-fade-up">
            <div className="card-header">
              <span className="card-title">
                <Users size={16} color="var(--accent)" />
                نمو المشتركين
              </span>
              <span className="badge badge-success">+{stats.newSubscribersMonth} هذا الشهر</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockSubscriberGrowth}>
                <defs>
                  <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="المشتركين" stroke="#06b6d4" strokeWidth={2} fill="url(#subGrad)" dot={false} />
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
                استهلاك الشبكة (آخر 30 يوم)
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GB</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockUsageData} barSize={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="download" name="تنزيل" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="upload" name="رفع" fill="#06b6d4" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Package Distribution */}
          <div className="chart-wrapper animate-fade-up">
            <div className="card-header">
              <span className="card-title">
                <CreditCard size={16} color="var(--warning)" />
                توزيع الباقات
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stats.totalSubscribers} مشترك</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={mockPackageDistribution}
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={80}
                    paddingAngle={3} dataKey="value"
                  >
                    {mockPackageDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value + ' مشترك', '']} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {mockPackageDistribution.map((pkg, i) => (
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

        {/* Bottom Row: Subscribers + Devices + Payments */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 320px', gap: 16 }}>

          {/* Recent Subscribers */}
          <div className="card animate-fade-up">
            <div className="card-header">
              <span className="card-title"><Users size={15} color="var(--primary)" /> آخر المشتركين</span>
              <a href="/subscribers" style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                عرض الكل <ChevronRight size={13} />
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {mockSubscribers.slice(0, 6).map((sub, i) => (
                <div key={sub.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 0',
                  borderBottom: i < 5 ? '1px solid var(--border)' : 'none'
                }}>
                  <div className="avatar" style={{ width: 34, height: 34, fontSize: '0.75rem', flexShrink: 0, background: ['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444'][i % 6] }}>
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
              <span className="card-title"><Server size={15} color="var(--accent)" /> حالة الأجهزة</span>
              <a href="/network" style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                عرض الكل <ChevronRight size={13} />
              </a>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, background: 'var(--success-bg)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--radius-md)', padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success-light)' }}>{stats.onlineDevices}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>متصل</div>
              </div>
              <div style={{ flex: 1, background: 'var(--danger-bg)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--danger-light)' }}>{stats.offlineDevices}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>غير متصل</div>
              </div>
              <div style={{ flex: 1, background: 'var(--warning-bg)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-md)', padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--warning-light)' }}>1</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>تحذير</div>
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
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{device.ip} — {device.connectedClients} عميل</div>
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
              <span className="card-title"><Zap size={15} color="var(--warning)" /> آخر التنبيهات</span>
              <div className="live-badge">
                <span className="live-dot" />مباشر
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
                    border: `1px solid ${colors[notif.type]}30`,
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 12px',
                    borderRight: `3px solid ${colors[notif.type]}`,
                    opacity: notif.isRead ? 0.6 : 1,
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{notif.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{notif.message}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>
                      {new Date(notif.createdAt).toLocaleString('ar-EG', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Payments */}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <DollarSign size={14} color="var(--success)" />
                آخر المدفوعات
              </div>
              {mockPayments.slice(0, 4).map((pay) => (
                <div key={pay.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: '0.77rem', fontWeight: 500, color: 'var(--text-primary)' }}>{pay.subscriberName.split(' ')[0]}</div>
                    <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)' }}>{getPaymentMethodLabel(pay.method)}</div>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--success-light)' }}>{pay.amount} ج</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
