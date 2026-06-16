'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  Wifi, Server, AlertTriangle, CheckCircle, XCircle,
  ThermometerSun, Signal, Users, Activity, MoreVertical,
  RefreshCw, Eye, Settings, Plus, Zap
} from 'lucide-react';
import { mockDevices, mockDashboardStats } from '@/lib/mockData';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

const miniSparkData = Array.from({ length: 15 }, () => ({ v: Math.random() * 100 + 20 }));

export default function NetworkPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'online' | 'offline' | 'warning'>('all');

  const filtered = mockDevices.filter(d => filter === 'all' || d.status === filter);

  const getStatusInfo = (status: string) => {
    if (status === 'online') return { cls: 'badge-success', label: 'متصل', color: 'var(--success)', dot: 'online' };
    if (status === 'warning') return { cls: 'badge-warning', label: 'تحذير', color: 'var(--warning)', dot: 'warning' };
    return { cls: 'badge-danger', label: 'غير متصل', color: 'var(--danger)', dot: 'offline' };
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'tower': return '🗼';
      case 'router': return '📡';
      case 'access_point': return '📶';
      case 'server': return '🖥️';
      case 'onu': return '🔌';
      default: return '📡';
    }
  };

  const getDeviceTypeName = (type: string) => {
    const names: Record<string, string> = {
      tower: 'برج', router: 'راوتر', access_point: 'نقطة وصول',
      server: 'سيرفر', switch: 'سويتش', onu: 'ONU'
    };
    return names[type] || type;
  };

  const stats = mockDashboardStats;

  return (
    <>
      <Topbar title="إدارة الشبكة والأجهزة" subtitle="مراقبة مباشرة للبنية التحتية" />
      <div className="page-wrapper">

        {/* Network Overview */}
        <div className="grid-4 stagger" style={{ marginBottom: 24 }}>
          {[
            { label: 'متصل', value: stats.onlineDevices, color: '#10b981', icon: CheckCircle },
            { label: 'غير متصل', value: stats.offlineDevices, color: '#ef4444', icon: XCircle },
            { label: 'تحذير', value: 1, color: '#f59e0b', icon: AlertTriangle },
            { label: 'إجمالي الأجهزة', value: mockDevices.length, color: '#6366f1', icon: Server },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="stat-card animate-fade-up">
                <div className="stat-icon" style={{ background: `${s.color}18` }}>
                  <Icon size={20} color={s.color} />
                </div>
                <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Network Performance Bar */}
        <div className="card animate-fade-up" style={{ marginBottom: 24, padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={16} color="var(--primary)" /> أداء الشبكة الحالي
            </h3>
            <div className="live-badge"><span className="live-dot" />مباشر</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { label: 'سرعة التنزيل', value: '842 Mbps', pct: 84, color: '#6366f1' },
              { label: 'سرعة الرفع', value: '210 Mbps', pct: 42, color: '#06b6d4' },
              { label: 'الكمون', value: '12 ms', pct: 20, color: '#10b981' },
              { label: 'استخدام الشبكة', value: '67%', pct: 67, color: '#f59e0b' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.label}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter + Controls */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { key: 'all', label: 'الكل' },
              { key: 'online', label: '✓ متصل' },
              { key: 'warning', label: '⚠ تحذير' },
              { key: 'offline', label: '✗ غير متصل' },
            ].map(f => (
              <button key={f.key} className={`btn btn-sm ${filter === f.key ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter(f.key as any)}>
                {f.label}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn btn-secondary btn-sm" style={{ gap: 6 }}><RefreshCw size={13} /> تحديث</button>
          <button className="btn btn-primary btn-sm" style={{ gap: 6 }}><Plus size={13} /> إضافة جهاز</button>
        </div>

        {/* Devices Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {filtered.map(device => {
            const { cls, label, color, dot } = getStatusInfo(device.status);
            return (
              <div key={device.id} className={`device-card ${device.status} animate-fade-up`}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>{getDeviceIcon(device.type)}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{device.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{getDeviceTypeName(device.type)} — {device.ip}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>📍 {device.location}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span className={`badge ${cls}`} style={{ fontSize: '0.67rem' }}>
                      <span className={`status-dot ${dot}`} style={{ width: 6, height: 6 }} /> {label}
                    </span>
                    <button className="btn btn-ghost btn-icon btn-sm"><MoreVertical size={13} /></button>
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                  <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', padding: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>
                      <Users size={10} style={{ display: 'inline' }} /> عملاء
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{device.connectedClients}</div>
                  </div>
                  {device.temperature && (
                    <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', padding: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>
                        <ThermometerSun size={10} style={{ display: 'inline' }} /> حرارة
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: device.temperature > 50 ? 'var(--danger-light)' : 'var(--text-primary)' }}>
                        {device.temperature}°C
                      </div>
                    </div>
                  )}
                  {device.signal && (
                    <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', padding: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>
                        <Signal size={10} style={{ display: 'inline' }} /> إشارة
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: device.signal > 70 ? 'var(--success-light)' : device.signal > 40 ? 'var(--warning-light)' : 'var(--danger-light)' }}>
                        {device.signal}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Speed bars */}
                {device.status === 'online' && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>↓ {device.downloadSpeed} Mbps</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>↑ {device.uploadSpeed} Mbps</span>
                    </div>
                    <div className="progress-bar" style={{ marginBottom: 6 }}>
                      <div className="progress-fill" style={{ width: `${Math.min((device.downloadSpeed / 1000) * 100, 100)}%` }} />
                    </div>
                  </div>
                )}

                {/* Uptime + Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {device.uptime ? `⏱ ${device.uptime}` : `آخر ظهور: ${new Date(device.lastSeen).toLocaleString('ar-EG', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}`}
                  </span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-icon btn-sm" title="عرض"><Eye size={13} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" title="إعدادات"><Settings size={13} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" title="إعادة تشغيل" style={{ color: 'var(--warning)' }}><RefreshCw size={13} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
