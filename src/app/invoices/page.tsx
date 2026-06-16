'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import {
  FileText, Download, Printer, Plus, CheckCircle,
  Clock, XCircle, Eye, DollarSign, Calendar, User
} from 'lucide-react';

const mockInvoices = [
  { id: '1', invoiceNumber: 'INV-2026-001', subscriberName: 'أحمد محمد علي', subscriberPhone: '01012345678', total: 250, status: 'paid', type: 'renewal', date: '2026-06-15', dueDate: '2026-06-20' },
  { id: '2', invoiceNumber: 'INV-2026-002', subscriberName: 'محمد إبراهيم حسن', subscriberPhone: '01098765432', total: 400, status: 'unpaid', type: 'renewal', date: '2026-06-14', dueDate: '2026-06-18' },
  { id: '3', invoiceNumber: 'INV-2026-003', subscriberName: 'خالد عبدالرحمن', subscriberPhone: '01234567890', total: 750, status: 'paid', type: 'installation', date: '2026-06-10', dueDate: '2026-06-15' },
  { id: '4', invoiceNumber: 'INV-2026-004', subscriberName: 'فاطمة علي حسين', subscriberPhone: '01011223344', total: 250, status: 'paid', type: 'renewal', date: '2026-06-12', dueDate: '2026-06-17' },
  { id: '5', invoiceNumber: 'INV-2026-005', subscriberName: 'سارة أحمد محمود', subscriberPhone: '01155544433', total: 150, status: 'partial', type: 'renewal', date: '2026-06-08', dueDate: '2026-06-12' },
  { id: '6', invoiceNumber: 'INV-2026-006', subscriberName: 'عمر يوسف إبراهيم', subscriberPhone: '01099887766', total: 150, status: 'unpaid', type: 'renewal', date: '2026-06-06', dueDate: '2026-06-11' },
];

export default function InvoicesPage() {
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid' | 'partial'>('all');
  const [showModal, setShowModal] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState<typeof mockInvoices[0] | null>(null);

  const filtered = mockInvoices.filter(inv => filter === 'all' || inv.status === filter);

  const totals = {
    paid: mockInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0),
    unpaid: mockInvoices.filter(i => i.status === 'unpaid').reduce((s, i) => s + i.total, 0),
    all: mockInvoices.reduce((s, i) => s + i.total, 0),
  };

  const statusInfo = (s: string) => ({
    paid: { cls: 'badge-success', label: 'مدفوعة', icon: CheckCircle, color: '#10b981' },
    unpaid: { cls: 'badge-danger', label: 'غير مدفوعة', icon: XCircle, color: '#ef4444' },
    partial: { cls: 'badge-warning', label: 'جزئية', icon: Clock, color: '#f59e0b' },
  })[s] || { cls: 'badge-secondary', label: s, icon: FileText, color: '#6366f1' };

  const typeLabel = (t: string) => ({ renewal: 'تجديد', installation: 'تركيب', custom: 'مخصصة' })[t] || t;

  return (
    <>
      <Topbar title="الفواتير" subtitle={`${mockInvoices.length} فاتورة إجمالي`} />
      <div className="page-wrapper">

        {/* Stats */}
        <div className="grid-4 stagger" style={{ marginBottom: 24 }}>
          {[
            { label: 'إجمالي الفواتير', value: totals.all.toLocaleString('ar-EG') + ' ج', color: '#6366f1', icon: FileText },
            { label: 'مدفوعة', value: totals.paid.toLocaleString('ar-EG') + ' ج', color: '#10b981', icon: CheckCircle },
            { label: 'غير مدفوعة', value: totals.unpaid.toLocaleString('ar-EG') + ' ج', color: '#ef4444', icon: XCircle },
            { label: 'فواتير هذا الشهر', value: mockInvoices.length, color: '#f59e0b', icon: Calendar },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="stat-card animate-fade-up">
                <div className="stat-icon" style={{ background: `${s.color}18` }}>
                  <Icon size={18} color={s.color} />
                </div>
                <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { key: 'all', label: 'الكل' },
              { key: 'paid', label: '✓ مدفوعة' },
              { key: 'unpaid', label: '✗ غير مدفوعة' },
              { key: 'partial', label: '◑ جزئية' },
            ].map(f => (
              <button key={f.key} className={`btn btn-sm ${filter === f.key ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter(f.key as any)}>
                {f.label}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn btn-secondary btn-sm" style={{ gap: 6 }}><Download size={13} /> تصدير</button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)} style={{ gap: 6 }}>
            <Plus size={13} /> فاتورة جديدة
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper animate-fade-up">
          <table>
            <thead>
              <tr>
                <th>رقم الفاتورة</th>
                <th>المشترك</th>
                <th>النوع</th>
                <th>المبلغ</th>
                <th>التاريخ</th>
                <th>الاستحقاق</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => {
                const { cls, label, color } = statusInfo(inv.status);
                return (
                  <tr key={inv.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--primary-light)', fontWeight: 600 }}>
                        {inv.invoiceNumber}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{inv.subscriberName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{inv.subscriberPhone}</div>
                    </td>
                    <td>
                      <span className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>{typeLabel(inv.type)}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: color }}>{inv.total.toLocaleString('ar-EG')} ج</span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {new Date(inv.date).toLocaleDateString('ar-EG')}
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.8rem', fontWeight: 600,
                        color: new Date(inv.dueDate) < new Date() && inv.status !== 'paid' ? 'var(--danger-light)' : 'var(--text-secondary)'
                      }}>
                        {new Date(inv.dueDate).toLocaleDateString('ar-EG')}
                      </span>
                    </td>
                    <td><span className={`badge ${cls}`}>{label}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-ghost btn-icon btn-sm" title="معاينة" onClick={() => setPreviewInvoice(inv)}>
                          <Eye size={14} />
                        </button>
                        <button className="btn btn-ghost btn-icon btn-sm" title="تحميل PDF">
                          <Download size={14} />
                        </button>
                        <button className="btn btn-ghost btn-icon btn-sm" title="طباعة">
                          <Printer size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Invoice Preview Modal */}
        {previewInvoice && (
          <div className="modal-overlay" onClick={() => setPreviewInvoice(null)}>
            <div className="modal animate-fade-up" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
              {/* Invoice Header */}
              <div style={{ textAlign: 'center', marginBottom: 24, padding: '20px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: 'var(--radius-lg)', color: 'white' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: 4 }}>⚡ NetFlow ISP</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>فاتورة ضريبية رسمية</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 10, fontFamily: 'monospace' }}>
                  {previewInvoice.invoiceNumber}
                </div>
              </div>

              {/* Invoice Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'العميل', value: previewInvoice.subscriberName },
                  { label: 'الهاتف', value: previewInvoice.subscriberPhone },
                  { label: 'النوع', value: typeLabel(previewInvoice.type) },
                  { label: 'تاريخ الفاتورة', value: new Date(previewInvoice.date).toLocaleDateString('ar-EG') },
                  { label: 'تاريخ الاستحقاق', value: new Date(previewInvoice.dueDate).toLocaleDateString('ar-EG') },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{row.label}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{row.value}</span>
                  </div>
                ))}

                {/* Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--primary-glow)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 'var(--radius-md)', marginTop: 8 }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>الإجمالي</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary-light)' }}>{previewInvoice.total.toLocaleString('ar-EG')} ج</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-secondary" style={{ flex: 1, gap: 6 }} onClick={() => setPreviewInvoice(null)}>إغلاق</button>
                <button className="btn btn-primary" style={{ flex: 1, gap: 6 }}><Download size={14} /> تحميل PDF</button>
                <button className="btn btn-secondary" style={{ gap: 6 }}><Printer size={14} /></button>
              </div>
            </div>
          </div>
        )}

        {/* New Invoice Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal animate-fade-up" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">إنشاء فاتورة جديدة</h3>
                <button className="btn btn-ghost btn-icon" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="input-group" style={{ gridColumn: '1/-1' }}>
                  <label className="input-label">المشترك *</label>
                  <select className="input"><option>اختر المشترك...</option></select>
                </div>
                <div className="input-group">
                  <label className="input-label">نوع الفاتورة *</label>
                  <select className="input">
                    <option value="renewal">تجديد اشتراك</option>
                    <option value="installation">تركيب</option>
                    <option value="custom">مخصصة</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">المبلغ (جنيه) *</label>
                  <input type="number" className="input" placeholder="0" />
                </div>
                <div className="input-group">
                  <label className="input-label">تاريخ الاستحقاق</label>
                  <input type="date" className="input" />
                </div>
                <div className="input-group">
                  <label className="input-label">ملاحظات</label>
                  <input className="input" placeholder="ملاحظات اختيارية..." />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>إلغاء</button>
                <button className="btn btn-primary"><Plus size={14} /> إنشاء الفاتورة</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
