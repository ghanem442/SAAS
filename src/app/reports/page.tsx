'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  BarChart3, TrendingUp, DollarSign, Users, Wifi,
  Download, Calendar, ArrowUpRight, FileText, Activity,
  PieChart as PieChartIcon, Filter
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  mockRevenueData, mockSubscriberGrowth, mockUsageData,
  mockPackageDistribution, mockDashboardStats
} from '@/lib/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontSize: '0.85rem', fontWeight: 600, color: p.color }}>
            {p.name}: {typeof p.value === 'number' && p.value > 1000 ? p.value.toLocaleString('ar-EG') : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

type ReportTab = 'financial' | 'network' | 'customers';

export default function ReportsPage() {
  const [tab, setTab] = useState<ReportTab>('financial');
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const stats = mockDashboardStats;

  const tabs: { key: ReportTab; label: string; icon: any }[] = [
    { key: 'financial', label: 'تقارير مالية', icon: DollarSign },
    { key: 'network', label: 'تقارير الشبكة', icon: Wifi },
    { key: 'customers', label: 'تقارير العملاء', icon: Users },
  ];

  return (
    <>
      <Topbar title="التقارير والإحصائيات" subtitle="تقارير شاملة عن أداء شبكتك" />
      <div className="page-wrapper">

        {/* Tab + Period Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 6, background: 'var(--bg-card)', padding: 4, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            {tabs.map(t => {
              const Icon = t.icon;
              return (
                <button key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`btn btn-sm ${tab === t.key ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ gap: 6 }}>
                  <Icon size={14} /> {t.label}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {[{ key: 'week', label: 'أسبوع' }, { key: 'month', label: 'شهر' }, { key: 'year', label: 'سنة' }].map(p => (
                <button key={p.key} className={`btn btn-sm ${period === p.key ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setPeriod(p.key as any)}>{p.label}</button>
              ))}
            </div>
            <button className="btn btn-secondary btn-sm" style={{ gap: 6 }}>
              <Download size={13} /> تصدير PDF
            </button>
          </div>
        </div>

        {/* ===== FINANCIAL REPORTS ===== */}
        {tab === 'financial' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* KPIs */}
            <div className="grid-4 stagger">
              {[
                { label: 'إيرادات الشهر', value: stats.monthRevenue.toLocaleString('ar-EG') + ' ج', change: '+12.4%', color: '#10b981' },
                { label: 'إيرادات السنة', value: stats.yearRevenue.toLocaleString('ar-EG') + ' ج', change: '+28%', color: '#6366f1' },
                { label: 'إجمالي الديون', value: stats.totalDebt.toLocaleString('ar-EG') + ' ج', change: '-5.2%', color: '#ef4444', down: true },
                { label: 'متوسط ARPU', value: Math.round(stats.monthRevenue / stats.activeSubscribers) + ' ج', change: '+3.1%', color: '#f59e0b' },
              ].map((s, i) => (
                <div key={i} className="stat-card animate-fade-up">
                  <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className={`stat-change ${s.down ? 'down' : 'up'}`}>
                    <ArrowUpRight size={12} /> {s.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div className="chart-wrapper animate-fade-up">
              <div className="card-header">
                <span className="card-title"><TrendingUp size={15} color="var(--primary)" /> الإيرادات الشهرية خلال العام</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--success-light)', fontWeight: 600 }}>
                  <ArrowUpRight size={13} style={{ display: 'inline' }} /> +28% مقارنة بالعام السابق
                </span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={mockRevenueData}>
                  <defs>
                    <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000) + 'K'} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" name="الإيرادات" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad2)" dot={{ fill: '#6366f1', r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Breakdown */}
            <div className="grid-2">
              {/* By Package */}
              <div className="chart-wrapper animate-fade-up">
                <div className="card-header">
                  <span className="card-title"><PieChartIcon size={15} color="var(--warning)" /> الإيرادات حسب الباقة</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={mockPackageDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={3}>
                      {mockPackageDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [v + ' مشترك', '']} />
                    <Legend formatter={(value) => <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Comparison */}
              <div className="chart-wrapper animate-fade-up">
                <div className="card-header">
                  <span className="card-title"><BarChart3 size={15} color="var(--accent)" /> مقارنة شهرية</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={mockRevenueData.slice(-6)} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000) + 'K'} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="الإيرادات" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ===== NETWORK REPORTS ===== */}
        {tab === 'network' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="grid-4 stagger">
              {[
                { label: 'إجمالي استهلاك الشهر', value: stats.monthUsage + ' GB', color: '#6366f1' },
                { label: 'استهلاك اليوم', value: stats.todayUsage + ' GB', color: '#06b6d4' },
                { label: 'متوسط استهلاك العميل', value: Math.round(stats.monthUsage / stats.activeSubscribers) + ' GB', color: '#10b981' },
                { label: 'الجلسات النشطة', value: stats.activeSessions, color: '#f59e0b' },
              ].map((s, i) => (
                <div key={i} className="stat-card animate-fade-up">
                  <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="chart-wrapper animate-fade-up">
              <div className="card-header">
                <span className="card-title"><Activity size={15} color="var(--secondary)" /> استهلاك الشبكة — آخر 30 يوم</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={mockUsageData} barSize={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="download" name="تنزيل (GB)" fill="#8b5cf6" radius={[3, 3, 0, 0]} stackId="a" />
                  <Bar dataKey="upload" name="رفع (GB)" fill="#06b6d4" radius={[3, 3, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ===== CUSTOMER REPORTS ===== */}
        {tab === 'customers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="grid-4 stagger">
              {[
                { label: 'إجمالي المشتركين', value: stats.totalSubscribers, color: '#6366f1' },
                { label: 'نشطين', value: stats.activeSubscribers, color: '#10b981' },
                { label: 'جدد هذا الشهر', value: stats.newSubscribersMonth, color: '#06b6d4' },
                { label: 'نسبة الاحتفاظ', value: '87%', color: '#f59e0b' },
              ].map((s, i) => (
                <div key={i} className="stat-card animate-fade-up">
                  <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="chart-wrapper animate-fade-up">
              <div className="card-header">
                <span className="card-title"><Users size={15} color="var(--accent)" /> نمو قاعدة المشتركين</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={mockSubscriberGrowth}>
                  <defs>
                    <linearGradient id="cusGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" name="المشتركين" stroke="#06b6d4" strokeWidth={2.5} fill="url(#cusGrad)" dot={{ fill: '#06b6d4', r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
