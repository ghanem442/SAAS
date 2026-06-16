'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  Settings, Wifi, Globe, Bell, Shield, Palette,
  Database, Key, Save, Upload, Moon, Sun, Languages,
  DollarSign, Phone, Mail, Building, ChevronLeft
} from 'lucide-react';

type SettingsTab = 'general' | 'network' | 'notifications' | 'security' | 'appearance' | 'billing';

const settingsTabs: { key: SettingsTab; label: string; icon: any }[] = [
  { key: 'general', label: 'عام', icon: Settings },
  { key: 'network', label: 'الشبكة', icon: Wifi },
  { key: 'notifications', label: 'الإشعارات', icon: Bell },
  { key: 'security', label: 'الأمان', icon: Shield },
  { key: 'appearance', label: 'المظهر', icon: Palette },
  { key: 'billing', label: 'الاشتراك', icon: DollarSign },
];

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
        background: checked ? 'var(--primary)' : 'var(--bg-elevated)',
        position: 'relative', transition: 'background 0.2s',
        boxShadow: checked ? '0 0 12px rgba(99,102,241,0.4)' : 'none',
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: checked ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%', background: 'white',
        transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }} />
    </button>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
      <div>
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: desc ? 4 : 0 }}>{label}</div>
        {desc && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{desc}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>('general');
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [whatsappNotif, setWhatsappNotif] = useState(false);
  const [autoRenew, setAutoRenew] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <>
      <Topbar title="الإعدادات" subtitle="إدارة إعدادات النظام والشبكة" />
      <div className="page-wrapper">
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>

          {/* Sidebar */}
          <div className="card" style={{ padding: 8, height: 'fit-content' }}>
            {settingsTabs.map(t => {
              const Icon = t.icon;
              return (
                <button key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`nav-item ${tab === t.key ? 'active' : ''}`}
                  style={{ width: '100%', marginBottom: 2 }}>
                  <Icon size={16} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="card">

            {/* ===== GENERAL ===== */}
            {tab === 'general' && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Settings size={16} color="var(--primary)" /> الإعدادات العامة
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                  <div className="input-group" style={{ gridColumn: '1/-1' }}>
                    <label className="input-label">اسم الشركة / الشبكة</label>
                    <input className="input" defaultValue="شبكة GHANEM للإنترنت" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">رقم الهاتف الرئيسي</label>
                    <input className="input" defaultValue="01012345678" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">البريد الإلكتروني</label>
                    <input type="email" className="input" defaultValue="admin@ghanem.com" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">العملة</label>
                    <select className="input">
                      <option value="EGP">🇪🇬 جنيه مصري (EGP)</option>
                      <option value="USD">🇺🇸 دولار أمريكي (USD)</option>
                      <option value="SAR">🇸🇦 ريال سعودي (SAR)</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">اللغة</label>
                    <select className="input">
                      <option value="ar">🇪🇬 العربية</option>
                      <option value="en">🇬🇧 English</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">المنطقة الزمنية</label>
                    <select className="input">
                      <option value="Africa/Cairo">القاهرة (UTC+3)</option>
                      <option value="Asia/Riyadh">الرياض (UTC+3)</option>
                    </select>
                  </div>
                  <div className="input-group" style={{ gridColumn: '1/-1' }}>
                    <label className="input-label">العنوان</label>
                    <input className="input" defaultValue="شارع الجمهورية، المنصورة، مصر" />
                  </div>
                </div>
                <SettingRow label="تجديد تلقائي للاشتراكات" desc="تجديد اشتراك المشترك تلقائياً قبل انتهائه بيوم">
                  <ToggleSwitch checked={autoRenew} onChange={setAutoRenew} />
                </SettingRow>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                  <button className="btn btn-primary" style={{ gap: 8 }}><Save size={15} /> حفظ الإعدادات</button>
                </div>
              </div>
            )}

            {/* ===== NETWORK ===== */}
            {tab === 'network' && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Wifi size={16} color="var(--primary)" /> إعدادات الشبكة
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                  <div className="input-group">
                    <label className="input-label">IP السيرفر الرئيسي</label>
                    <input className="input" defaultValue="10.0.0.1" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">بورت API</label>
                    <input className="input" defaultValue="8080" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">نظام التحقق</label>
                    <select className="input">
                      <option>Mikrotik API</option>
                      <option>Radius Server</option>
                      <option>pfSense API</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">نطاق IP للعملاء</label>
                    <input className="input" defaultValue="192.168.1.0/24" />
                  </div>
                  <div className="input-group" style={{ gridColumn: '1/-1' }}>
                    <label className="input-label">API Token</label>
                    <input type="password" className="input" defaultValue="••••••••••••••••••••" />
                  </div>
                </div>
                <SettingRow label="إيقاف تلقائي عند انتهاء الباقة" desc="قطع الإنترنت تلقائياً بعد انتهاء مدة الاشتراك">
                  <ToggleSwitch checked={true} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="فترة السماح" desc="منح العميل فترة إضافية بعد انتهاء الباقة">
                  <select className="input" style={{ width: 140 }}>
                    <option>لا يوجد</option>
                    <option>24 ساعة</option>
                    <option>48 ساعة</option>
                    <option>72 ساعة</option>
                  </select>
                </SettingRow>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20, gap: 10 }}>
                  <button className="btn btn-secondary" style={{ gap: 6 }}><Key size={14} /> اختبار الاتصال</button>
                  <button className="btn btn-primary" style={{ gap: 8 }}><Save size={15} /> حفظ</button>
                </div>
              </div>
            )}

            {/* ===== NOTIFICATIONS ===== */}
            {tab === 'notifications' && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Bell size={16} color="var(--primary)" /> إعدادات الإشعارات
                </h3>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>قنوات الإرسال</div>
                  <SettingRow label="إشعارات البريد الإلكتروني" desc="إرسال تنبيهات عبر Email">
                    <ToggleSwitch checked={emailNotif} onChange={setEmailNotif} />
                  </SettingRow>
                  <SettingRow label="إشعارات SMS" desc="رسائل نصية عبر شركات المحمول">
                    <ToggleSwitch checked={smsNotif} onChange={setSmsNotif} />
                  </SettingRow>
                  <SettingRow label="إشعارات واتساب" desc="إرسال تنبيهات عبر واتساب">
                    <ToggleSwitch checked={whatsappNotif} onChange={setWhatsappNotif} />
                  </SettingRow>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>إشعارات العملاء</div>
                  <SettingRow label="قرب انتهاء الاشتراك" desc="التنبيه قبل الانتهاء بـ:">
                    <select className="input" style={{ width: 140 }}>
                      <option>3 أيام</option>
                      <option>5 أيام</option>
                      <option>7 أيام</option>
                    </select>
                  </SettingRow>
                  <SettingRow label="تأخر السداد" desc="التنبيه عند تأخر الدفع">
                    <ToggleSwitch checked={true} onChange={() => {}} />
                  </SettingRow>
                  <SettingRow label="إشعار نجاح الدفع" desc="إرسال تأكيد عند نجاح الدفع">
                    <ToggleSwitch checked={true} onChange={() => {}} />
                  </SettingRow>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                  <button className="btn btn-primary" style={{ gap: 8 }}><Save size={15} /> حفظ</button>
                </div>
              </div>
            )}

            {/* ===== APPEARANCE ===== */}
            {tab === 'appearance' && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Palette size={16} color="var(--primary)" /> المظهر والتخصيص
                </h3>
                <SettingRow label="الوضع الداكن" desc="استخدام خلفية داكنة للنظام">
                  <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
                </SettingRow>
                <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>اللون الأساسي</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'].map(color => (
                      <button key={color} style={{
                        width: 32, height: 32, borderRadius: '50%', background: color, border: color === '#6366f1' ? '3px solid white' : '3px solid transparent',
                        cursor: 'pointer', transition: 'transform 0.15s',
                        boxShadow: `0 0 10px ${color}60`,
                      }} onClick={() => {}} />
                    ))}
                  </div>
                </div>
                <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>شعار الشركة (White Label)</div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)' }}>
                      <Building size={24} color="var(--text-muted)" />
                    </div>
                    <button className="btn btn-secondary btn-sm" style={{ gap: 6 }}>
                      <Upload size={13} /> رفع شعار
                    </button>
                  </div>
                </div>
                <SettingRow label="اسم العلامة التجارية" desc="اسم يظهر في الواجهة والتقارير">
                  <input className="input" defaultValue="GHANEM ISP Manager" style={{ width: 220 }} />
                </SettingRow>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                  <button className="btn btn-primary" style={{ gap: 8 }}><Save size={15} /> حفظ المظهر</button>
                </div>
              </div>
            )}

            {/* ===== SECURITY ===== */}
            {tab === 'security' && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Shield size={16} color="var(--primary)" /> الأمان والخصوصية
                </h3>
                <SettingRow label="التحقق بخطوتين (2FA)" desc="حماية إضافية لحساب المدير">
                  <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} />
                </SettingRow>
                <SettingRow label="انتهاء الجلسة التلقائي" desc="تسجيل الخروج بعد فترة خمول">
                  <select className="input" style={{ width: 140 }}>
                    <option>30 دقيقة</option>
                    <option>ساعة</option>
                    <option>4 ساعات</option>
                    <option>لا يوجد</option>
                  </select>
                </SettingRow>
                <SettingRow label="سجل العمليات" desc="تسجيل كل إجراء يقوم به الموظفون">
                  <ToggleSwitch checked={true} onChange={() => {}} />
                </SettingRow>
                <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>تغيير كلمة المرور</div>
                  <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
                    <input type="password" className="input" placeholder="كلمة المرور الحالية" />
                    <input type="password" className="input" placeholder="كلمة المرور الجديدة" />
                    <input type="password" className="input" placeholder="تأكيد كلمة المرور الجديدة" />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20, gap: 10 }}>
                  <button className="btn btn-danger btn-sm">حذف الحساب</button>
                  <button className="btn btn-primary" style={{ gap: 8 }}><Save size={15} /> حفظ</button>
                </div>
              </div>
            )}

            {/* ===== BILLING ===== */}
            {tab === 'billing' && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <DollarSign size={16} color="var(--primary)" /> اشتراك GHANEM SaaS
                </h3>
                {/* Current Plan */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(229,193,88,0.12), rgba(197,168,112,0.08))',
                  border: '1px solid rgba(229,193,88,0.25)', borderRadius: 'var(--radius-lg)',
                  padding: '20px', marginBottom: 20,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--primary-light)', marginBottom: 4 }}>الخطة الحالية</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>خطة برو 🚀</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>حتى 2,000 مشترك • كل الميزات مفعلة</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)' }}>199$</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/شهر</div>
                    </div>
                  </div>
                  <div className="divider" />
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {['✅ مشتركين غير محدود', '✅ AI مساعد', '✅ تقارير متقدمة', '✅ White Label', '✅ API كامل'].map((f, i) => (
                      <span key={i} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{f}</span>
                    ))}
                  </div>
                </div>
                <SettingRow label="تجديد تلقائي للاشتراك" desc="تجديد اشتراك SaaS تلقائياً">
                  <ToggleSwitch checked={true} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="تاريخ التجديد القادم" desc="">
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>17 يوليو 2026</span>
                </SettingRow>
                <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary btn-sm">تغيير الخطة</button>
                  <button className="btn btn-primary btn-sm">إدارة الفواتير</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
