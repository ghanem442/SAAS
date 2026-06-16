'use client';
import Topbar from '@/components/Topbar';
import { mockDevices, mockDashboardStats } from '@/lib/mockData';
import { useState } from 'react';
import { Map, Wifi, Users, CheckCircle, XCircle, AlertTriangle, Layers, Info } from 'lucide-react';

export default function MapPage() {
  const [selectedDevice, setSelectedDevice] = useState<typeof mockDevices[0] | null>(null);
  const [showAll, setShowAll] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline' | 'warning'>('all');

  const stats = mockDashboardStats;

  const filteredDevices = mockDevices.filter(d =>
    filterStatus === 'all' || d.status === filterStatus
  );

  const statusColor = (s: string) => ({
    online: '#10b981', warning: '#f59e0b', offline: '#ef4444'
  })[s] || '#6366f1';

  const statusLabel = (s: string) => ({
    online: 'متصل', warning: 'تحذير', offline: 'غير متصل'
  })[s] || s;

  const getDeviceIcon = (type: string) => ({
    tower: '🗼', router: '📡', access_point: '📶',
    server: '🖥️', onu: '🔌', switch: '🔀'
  })[type] || '📡';

  return (
    <>
      <Topbar title="خريطة الشبكة" subtitle="عرض جغرافي مباشر لبنية الشبكة" />
      <div className="page-wrapper" style={{ padding: '16px 24px' }}>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'أجهزة متصلة', value: stats.onlineDevices, color: '#10b981', icon: CheckCircle },
            { label: 'غير متصلة', value: stats.offlineDevices, color: '#ef4444', icon: XCircle },
            { label: 'تحذير', value: 1, color: '#f59e0b', icon: AlertTriangle },
            { label: 'عملاء الآن', value: stats.activeSessions, color: '#6366f1', icon: Users },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="card" style={{ flex: 1, minWidth: 120, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={15} color={s.color} />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              </div>
            );
          })}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {['all', 'online', 'offline', 'warning'].map(f => (
              <button key={f} className={`btn btn-sm ${filterStatus === f ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilterStatus(f as any)}>
                {{ all: 'الكل', online: '🟢', offline: '🔴', warning: '🟡' }[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Map + Sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, height: 'calc(100vh - 260px)', minHeight: 500 }}>

          {/* Map Placeholder — Interactive SVG map of Egypt */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative',
          }}>
            {/* Map Header */}
            <div style={{
              position: 'absolute', top: 12, right: 12, zIndex: 10,
              background: 'rgba(13,18,33,0.85)', backdropFilter: 'blur(8px)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
              padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Map size={14} color="var(--primary)" />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>خريطة شبكة الدلتا — مصر</span>
              <div className="live-badge"><span className="live-dot" /> مباشر</div>
            </div>

            {/* Zoom Controls */}
            <div style={{
              position: 'absolute', top: 12, left: 12, zIndex: 10,
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              {['+', '−', '⊡'].map((btn, i) => (
                <button key={i} style={{
                  width: 32, height: 32, background: 'rgba(13,18,33,0.85)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '1.1rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                }}>{btn}</button>
              ))}
            </div>

            {/* SVG Interactive Map */}
            <svg width="100%" height="100%" viewBox="0 0 800 600" style={{ background: 'linear-gradient(135deg, #080c18, #0d1525)' }}>
              {/* Grid lines */}
              {Array.from({ length: 12 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              ))}
              {Array.from({ length: 16 }, (_, i) => (
                <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              ))}

              {/* Connection lines between devices */}
              <line x1="400" y1="200" x2="250" y2="350" stroke="#6366f130" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="400" y1="200" x2="550" y2="320" stroke="#6366f130" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="400" y1="200" x2="320" y2="420" stroke="#6366f130" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="400" y1="200" x2="480" y2="450" stroke="#6366f130" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="400" y1="200" x2="160" y2="280" stroke="#ef444430" strokeWidth="2" strokeDasharray="6,4" />

              {/* Coverage circles */}
              {filteredDevices.filter(d => d.lat).map((device, i) => {
                const positions = [
                  { x: 400, y: 200 }, { x: 250, y: 350 }, { x: 550, y: 320 },
                  { x: 160, y: 280 }, { x: 320, y: 420 }, { x: 480, y: 450 }
                ];
                const pos = positions[i] || { x: 200 + i * 100, y: 300 };
                const color = statusColor(device.status);
                const isSelected = selectedDevice?.id === device.id;

                return (
                  <g key={device.id} onClick={() => setSelectedDevice(device)} style={{ cursor: 'pointer' }}>
                    {/* Coverage area */}
                    {device.status === 'online' && (
                      <circle cx={pos.x} cy={pos.y} r={isSelected ? 80 : 60}
                        fill={color + '08'} stroke={color + '20'} strokeWidth="1" />
                    )}

                    {/* Pulse ring for online */}
                    {device.status === 'online' && (
                      <circle cx={pos.x} cy={pos.y} r={28}
                        fill="none" stroke={color + '30'} strokeWidth="8"
                        style={{ animation: 'pulse-ring 2.5s ease infinite' }} />
                    )}

                    {/* Device circle */}
                    <circle cx={pos.x} cy={pos.y} r={20}
                      fill={color + '20'}
                      stroke={isSelected ? 'white' : color}
                      strokeWidth={isSelected ? 3 : 2} />

                    {/* Inner dot */}
                    <circle cx={pos.x} cy={pos.y} r={8} fill={color} />

                    {/* Device label */}
                    <text x={pos.x} y={pos.y + 35} textAnchor="middle"
                      fill="var(--text-primary)" fontSize="11" fontWeight="600">
                      {device.name.split(' ').slice(0, 2).join(' ')}
                    </text>
                    <text x={pos.x} y={pos.y + 48} textAnchor="middle"
                      fill={color} fontSize="9.5">
                      {device.connectedClients} عميل
                    </text>

                    {/* Offline X mark */}
                    {device.status === 'offline' && (
                      <>
                        <line x1={pos.x - 6} y1={pos.y - 6} x2={pos.x + 6} y2={pos.y + 6} stroke="white" strokeWidth="2" />
                        <line x1={pos.x + 6} y1={pos.y - 6} x2={pos.x - 6} y2={pos.y + 6} stroke="white" strokeWidth="2" />
                      </>
                    )}
                  </g>
                );
              })}

              {/* Map labels */}
              <text x="400" y="570" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="12">© NetFlow ISP Manager — Delta Region, Egypt</text>
            </svg>

            {/* Legend */}
            <div style={{
              position: 'absolute', bottom: 12, right: 12,
              background: 'rgba(13,18,33,0.85)', backdropFilter: 'blur(8px)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
            }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 6 }}>المفتاح</div>
              {[
                { color: '#10b981', label: 'متصل' },
                { color: '#f59e0b', label: 'تحذير' },
                { color: '#ef4444', label: 'غير متصل' },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, boxShadow: `0 0 6px ${l.color}` }} />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device List Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Layers size={15} color="var(--primary)" /> الأجهزة ({filteredDevices.length})
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredDevices.map(device => {
                const color = statusColor(device.status);
                const isSelected = selectedDevice?.id === device.id;
                return (
                  <div key={device.id}
                    onClick={() => setSelectedDevice(isSelected ? null : device)}
                    style={{
                      padding: '14px 16px', borderBottom: '1px solid var(--border)', cursor: 'pointer',
                      background: isSelected ? `${color}08` : 'transparent',
                      borderRight: isSelected ? `3px solid ${color}` : '3px solid transparent',
                      transition: 'all 0.15s',
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: '1.3rem' }}>{getDeviceIcon(device.type)}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {device.name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{device.ip}</div>
                      </div>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0, boxShadow: `0 0 6px ${color}` }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                      <div style={{ background: 'var(--bg-elevated)', borderRadius: 6, padding: '5px 8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color }}>
                          {device.connectedClients}
                        </div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>عميل</div>
                      </div>
                      {device.temperature && (
                        <div style={{ background: 'var(--bg-elevated)', borderRadius: 6, padding: '5px 8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: device.temperature > 50 ? 'var(--danger-light)' : 'var(--text-primary)' }}>
                            {device.temperature}°
                          </div>
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>حرارة</div>
                        </div>
                      )}
                      {device.signal && (
                        <div style={{ background: 'var(--bg-elevated)', borderRadius: 6, padding: '5px 8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: device.signal > 70 ? 'var(--success-light)' : device.signal > 40 ? 'var(--warning-light)' : 'var(--danger-light)' }}>
                            {device.signal}%
                          </div>
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>إشارة</div>
                        </div>
                      )}
                    </div>
                    {isSelected && (
                      <div style={{ marginTop: 8, padding: '8px', background: 'var(--bg-elevated)', borderRadius: 6, fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        📍 {device.location}<br />
                        ⬇️ {device.downloadSpeed} Mbps — ⬆️ {device.uploadSpeed} Mbps<br />
                        {device.uptime && `⏱ وقت التشغيل: ${device.uptime}`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
