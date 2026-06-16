import { DashboardStats, Subscriber, Package, Card, Payment, Invoice, Debt, Device, Tower, Employee, Ticket, Reseller, Notification, ChartDataPoint } from '@/types';

// ===== DASHBOARD STATS =====
export const mockDashboardStats: DashboardStats = {
  totalSubscribers: 1247,
  activeSubscribers: 1089,
  suspendedSubscribers: 98,
  expiredSubscribers: 60,
  todayRevenue: 3850,
  weekRevenue: 22400,
  monthRevenue: 87600,
  yearRevenue: 1045000,
  totalRevenue: 2840000,
  totalDebt: 14200,
  todayUsage: 2840,
  monthUsage: 68400,
  activeSessions: 842,
  onlineDevices: 34,
  offlineDevices: 3,
  openTickets: 12,
  newSubscribersToday: 7,
  newSubscribersMonth: 143,
};

// ===== REVENUE CHART DATA =====
export const mockRevenueData: ChartDataPoint[] = [
  { date: 'يناير', value: 72000 },
  { date: 'فبراير', value: 68000 },
  { date: 'مارس', value: 85000 },
  { date: 'أبريل', value: 91000 },
  { date: 'مايو', value: 78000 },
  { date: 'يونيو', value: 95000 },
  { date: 'يوليو', value: 103000 },
  { date: 'أغسطس', value: 112000 },
  { date: 'سبتمبر', value: 98000 },
  { date: 'أكتوبر', value: 121000 },
  { date: 'نوفمبر', value: 115000 },
  { date: 'ديسمبر', value: 87600 },
];

// ===== SUBSCRIBER GROWTH =====
export const mockSubscriberGrowth: ChartDataPoint[] = [
  { date: 'يناير', value: 850 },
  { date: 'فبراير', value: 890 },
  { date: 'مارس', value: 940 },
  { date: 'أبريل', value: 1010 },
  { date: 'مايو', value: 1080 },
  { date: 'يونيو', value: 1120 },
  { date: 'يوليو', value: 1150 },
  { date: 'أغسطس', value: 1190 },
  { date: 'سبتمبر', value: 1210 },
  { date: 'أكتوبر', value: 1230 },
  { date: 'نوفمبر', value: 1241 },
  { date: 'ديسمبر', value: 1247 },
];

// ===== USAGE DATA =====
export const mockUsageData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}`,
  download: Math.floor(Math.random() * 3000 + 1500),
  upload: Math.floor(Math.random() * 800 + 400),
}));

// ===== PACKAGES =====
export const mockPackages: Package[] = [
  { id: '1', name: 'الاقتصادية', type: 'monthly', price: 150, downloadSpeed: 10, uploadSpeed: 2, duration: 30, durationUnit: 'days', isActive: true, subscribersCount: 320, color: '#6366f1' },
  { id: '2', name: 'المتوسطة', type: 'monthly', price: 250, downloadSpeed: 25, uploadSpeed: 5, duration: 30, durationUnit: 'days', isActive: true, subscribersCount: 485, color: '#8b5cf6' },
  { id: '3', name: 'البريميوم', type: 'monthly', price: 400, downloadSpeed: 50, uploadSpeed: 10, duration: 30, durationUnit: 'days', isActive: true, subscribersCount: 198, color: '#06b6d4' },
  { id: '4', name: 'الألتيميت', type: 'monthly', price: 650, downloadSpeed: 100, uploadSpeed: 20, duration: 30, durationUnit: 'days', isActive: true, subscribersCount: 86, color: '#10b981' },
  { id: '5', name: 'أسبوعية سريعة', type: 'weekly', price: 75, downloadSpeed: 20, uploadSpeed: 4, duration: 7, durationUnit: 'days', isActive: true, subscribersCount: 112, color: '#f59e0b' },
  { id: '6', name: '50 جيجا', type: 'data', price: 120, downloadSpeed: 25, uploadSpeed: 5, dataLimit: 50, duration: 30, durationUnit: 'days', isActive: true, subscribersCount: 46, color: '#ef4444' },
];

// ===== SUBSCRIBERS =====
export const mockSubscribers: Subscriber[] = [
  {
    id: '1', name: 'أحمد محمد علي', phone: '01012345678', address: 'شارع الجمهورية، المنصورة',
    status: 'active', package: mockPackages[1], joinDate: '2024-01-15', expiryDate: '2026-07-17',
    debt: 0, totalPaid: 3000, ipAddress: '192.168.1.10', downloadSpeed: 25, uploadSpeed: 5,
    usedData: 18.5, totalData: 50, lastSeen: '2026-06-17T00:00:00Z',
  },
  {
    id: '2', name: 'محمد إبراهيم حسن', phone: '01098765432', address: 'شارع النيل، طنطا',
    status: 'active', package: mockPackages[2], joinDate: '2024-03-22', expiryDate: '2026-07-10',
    debt: 400, totalPaid: 4800, ipAddress: '192.168.1.11', downloadSpeed: 50, uploadSpeed: 10,
    usedData: 85.2, totalData: -1, lastSeen: '2026-06-17T00:10:00Z',
  },
  {
    id: '3', name: 'سارة أحمد محمود', phone: '01155544433', address: 'شارع 23 يوليو، الزقازيق',
    status: 'suspended', package: mockPackages[0], joinDate: '2023-11-08', expiryDate: '2026-06-01',
    debt: 150, totalPaid: 1800, downloadSpeed: 10, uploadSpeed: 2,
    usedData: 0, totalData: 0, lastSeen: '2026-06-01T12:00:00Z',
  },
  {
    id: '4', name: 'خالد عبدالرحمن', phone: '01234567890', address: 'شارع بورسعيد، بنها',
    status: 'active', package: mockPackages[3], joinDate: '2024-06-01', expiryDate: '2026-07-01',
    debt: 0, totalPaid: 7800, ipAddress: '192.168.1.15', downloadSpeed: 100, uploadSpeed: 20,
    usedData: 320, totalData: -1, lastSeen: '2026-06-16T23:55:00Z',
  },
  {
    id: '5', name: 'فاطمة علي حسين', phone: '01011223344', address: 'شارع الحرية، شبين الكوم',
    status: 'active', package: mockPackages[1], joinDate: '2025-01-10', expiryDate: '2026-07-10',
    debt: 0, totalPaid: 1500, ipAddress: '192.168.1.20', downloadSpeed: 25, uploadSpeed: 5,
    usedData: 12.1, totalData: 50, lastSeen: '2026-06-16T22:30:00Z',
  },
  {
    id: '6', name: 'عمر يوسف إبراهيم', phone: '01099887766', address: 'شارع المحطة، سمنود',
    status: 'expired', package: mockPackages[0], joinDate: '2023-08-15', expiryDate: '2026-06-15',
    debt: 150, totalPaid: 2700, downloadSpeed: 10, uploadSpeed: 2,
    usedData: 0, totalData: 0, lastSeen: '2026-06-15T18:00:00Z',
  },
  {
    id: '7', name: 'نور الدين مصطفى', phone: '01522334455', address: 'شارع الوحدة، ميت غمر',
    status: 'active', package: mockPackages[4], joinDate: '2025-05-20', expiryDate: '2026-06-27',
    debt: 0, totalPaid: 450, ipAddress: '192.168.1.25', downloadSpeed: 20, uploadSpeed: 4,
    usedData: 5.8, totalData: -1, lastSeen: '2026-06-16T21:00:00Z',
  },
  {
    id: '8', name: 'ريم أشرف حمدي', phone: '01033445566', address: 'شارع التحرير، دسوق',
    status: 'active', package: mockPackages[5], joinDate: '2025-03-12', expiryDate: '2026-07-12',
    debt: 0, totalPaid: 720, ipAddress: '192.168.1.30', downloadSpeed: 25, uploadSpeed: 5,
    usedData: 38.2, totalData: 50, lastSeen: '2026-06-16T23:00:00Z',
  },
];

// ===== CARDS =====
export const mockCards: Card[] = Array.from({ length: 20 }, (_, i) => ({
  id: `card-${i + 1}`,
  code: `NF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
  price: [50, 75, 100, 150][i % 4],
  downloadSpeed: [10, 20, 25, 50][i % 4],
  uploadSpeed: [2, 4, 5, 10][i % 4],
  duration: [7, 7, 30, 30][i % 4],
  durationUnit: 'days',
  status: i < 8 ? 'used' : i < 15 ? 'unused' : 'expired',
  usedBy: i < 8 ? mockSubscribers[i % 8].name : undefined,
  usedAt: i < 8 ? '2026-06-10T10:00:00Z' : undefined,
  createdAt: '2026-06-01T08:00:00Z',
  batchId: 'batch-001',
}));

// ===== PAYMENTS =====
export const mockPayments: Payment[] = [
  { id: '1', subscriberId: '1', subscriberName: 'أحمد محمد علي', amount: 250, method: 'cash', date: '2026-06-15', status: 'completed', collectedBy: 'موسى علي' },
  { id: '2', subscriberId: '2', subscriberName: 'محمد إبراهيم حسن', amount: 400, method: 'instapay', date: '2026-06-14', status: 'completed' },
  { id: '3', subscriberId: '4', subscriberName: 'خالد عبدالرحمن', amount: 650, method: 'bank_transfer', date: '2026-06-13', status: 'completed' },
  { id: '4', subscriberId: '5', subscriberName: 'فاطمة علي حسين', amount: 250, method: 'wallet', date: '2026-06-12', status: 'completed' },
  { id: '5', subscriberId: '7', subscriberName: 'نور الدين مصطفى', amount: 75, method: 'cash', date: '2026-06-11', status: 'completed' },
  { id: '6', subscriberId: '8', subscriberName: 'ريم أشرف حمدي', amount: 120, method: 'instapay', date: '2026-06-10', status: 'completed' },
  { id: '7', subscriberId: '3', subscriberName: 'سارة أحمد محمود', amount: 150, method: 'cash', date: '2026-06-09', status: 'pending' },
  { id: '8', subscriberId: '6', subscriberName: 'عمر يوسف إبراهيم', amount: 150, method: 'cash', date: '2026-06-08', status: 'failed' },
];

// ===== DEVICES =====
export const mockDevices: Device[] = [
  { id: '1', name: 'برج المنصورة الرئيسي', type: 'tower', ip: '10.0.0.1', status: 'online', location: 'المنصورة', signal: 92, temperature: 38, uptime: '45 يوم', downloadSpeed: 850, uploadSpeed: 420, connectedClients: 380, lastSeen: '2026-06-17T00:30:00Z', lat: 31.0409, lng: 31.3785 },
  { id: '2', name: 'روتر طنطا الفرعي', type: 'router', ip: '10.0.1.1', status: 'online', location: 'طنطا', signal: 78, temperature: 42, uptime: '30 يوم', downloadSpeed: 420, uploadSpeed: 210, connectedClients: 195, lastSeen: '2026-06-17T00:29:00Z', lat: 30.7865, lng: 31.0004 },
  { id: '3', name: 'نقطة توزيع الزقازيق', type: 'access_point', ip: '10.0.2.1', status: 'warning', location: 'الزقازيق', signal: 45, temperature: 58, uptime: '12 يوم', downloadSpeed: 180, uploadSpeed: 90, connectedClients: 88, lastSeen: '2026-06-17T00:28:00Z', lat: 30.5877, lng: 31.5021 },
  { id: '4', name: 'سيرفر بنها', type: 'server', ip: '10.0.3.1', status: 'offline', location: 'بنها', temperature: 0, uptime: '0', downloadSpeed: 0, uploadSpeed: 0, connectedClients: 0, lastSeen: '2026-06-16T18:00:00Z', lat: 30.4667, lng: 31.1833 },
  { id: '5', name: 'AP شبين الكوم', type: 'access_point', ip: '10.0.4.1', status: 'online', location: 'شبين الكوم', signal: 88, temperature: 40, uptime: '60 يوم', downloadSpeed: 320, uploadSpeed: 160, connectedClients: 142, lastSeen: '2026-06-17T00:30:00Z', lat: 30.5500, lng: 31.0000 },
  { id: '6', name: 'ONU ميت غمر', type: 'onu', ip: '10.0.5.1', status: 'online', location: 'ميت غمر', signal: 95, temperature: 35, uptime: '20 يوم', downloadSpeed: 240, uploadSpeed: 120, connectedClients: 110, lastSeen: '2026-06-17T00:30:00Z', lat: 30.7200, lng: 31.2600 },
];

// ===== TICKETS =====
export const mockTickets: Ticket[] = [
  { id: '1', ticketNumber: 'TKT-001', subscriberId: '2', subscriberName: 'محمد إبراهيم حسن', subscriberPhone: '01098765432', type: 'slow_internet', status: 'open', priority: 'high', title: 'الإنترنت بطيء جداً', description: 'السرعة لا تتجاوز 2 ميجا رغم اشتراك 50 ميجا', createdAt: '2026-06-16T20:00:00Z', updatedAt: '2026-06-16T20:00:00Z' },
  { id: '2', ticketNumber: 'TKT-002', subscriberId: '3', subscriberName: 'سارة أحمد محمود', subscriberPhone: '01155544433', type: 'disconnection', status: 'in_progress', priority: 'urgent', title: 'انقطاع تام في الخدمة', description: 'لا يوجد اتصال منذ 3 أيام', assignedTo: 'فني الشبكة', createdAt: '2026-06-14T10:00:00Z', updatedAt: '2026-06-16T15:00:00Z' },
  { id: '3', ticketNumber: 'TKT-003', subscriberId: '5', subscriberName: 'فاطمة علي حسين', subscriberPhone: '01011223344', type: 'payment', status: 'resolved', priority: 'medium', title: 'مشكلة في الدفع', description: 'تم خصم المبلغ ولم يتم تجديد الاشتراك', createdAt: '2026-06-12T14:00:00Z', updatedAt: '2026-06-13T09:00:00Z', rating: 5 },
  { id: '4', ticketNumber: 'TKT-004', subscriberId: '7', subscriberName: 'نور الدين مصطفى', subscriberPhone: '01522334455', type: 'device_issue', status: 'open', priority: 'low', title: 'مشكلة في الراوتر', description: 'الراوتر لا يعمل بشكل صحيح', createdAt: '2026-06-17T00:00:00Z', updatedAt: '2026-06-17T00:00:00Z' },
];

// ===== DEBTS =====
export const mockDebts: Debt[] = [
  { id: '1', subscriberId: '2', subscriberName: 'محمد إبراهيم حسن', subscriberPhone: '01098765432', amount: 400, dueDate: '2026-06-20', status: 'pending', createdAt: '2026-06-01', notes: 'وعد بالسداد يوم 20' },
  { id: '2', subscriberId: '3', subscriberName: 'سارة أحمد محمود', subscriberPhone: '01155544433', amount: 150, dueDate: '2026-06-10', status: 'overdue', createdAt: '2026-05-20' },
  { id: '3', subscriberId: '6', subscriberName: 'عمر يوسف إبراهيم', subscriberPhone: '01099887766', amount: 150, dueDate: '2026-06-15', status: 'overdue', createdAt: '2026-05-15' },
];

// ===== NOTIFICATIONS =====
export const mockNotifications: Notification[] = [
  { id: '1', type: 'danger', title: 'جهاز غير متصل', message: 'سيرفر بنها انقطع عن الشبكة', isRead: false, createdAt: '2026-06-16T18:00:00Z' },
  { id: '2', type: 'warning', title: 'دين متأخر', message: 'سارة أحمد: 150 جنيه متأخرة عن السداد', isRead: false, createdAt: '2026-06-16T12:00:00Z' },
  { id: '3', type: 'success', title: 'مشترك جديد', message: 'تم تسجيل عميل جديد: نور الدين مصطفى', isRead: false, createdAt: '2026-06-16T10:00:00Z' },
  { id: '4', type: 'warning', title: 'حرارة مرتفعة', message: 'نقطة توزيع الزقازيق: 58°C', isRead: true, createdAt: '2026-06-15T20:00:00Z' },
  { id: '5', type: 'info', title: 'تجديد اشتراك', message: 'أحمد محمد علي جدد اشتراكه', isRead: true, createdAt: '2026-06-15T15:00:00Z' },
];

// ===== EMPLOYEES =====
export const mockEmployees: Employee[] = [
  { id: '1', name: 'موسى علي', phone: '01012121212', email: 'moussa@netflow.com', role: 'admin', permissions: ['all'], status: 'active', joinDate: '2023-01-01', lastLogin: '2026-06-17T00:00:00Z' },
  { id: '2', name: 'أمين كمال', phone: '01098989898', email: 'amin@netflow.com', role: 'accountant', permissions: ['payments', 'invoices', 'reports'], status: 'active', joinDate: '2023-06-15', lastLogin: '2026-06-16T22:00:00Z' },
  { id: '3', name: 'ياسر صالح', phone: '01155666777', email: 'yasser@netflow.com', role: 'technician', permissions: ['devices', 'tickets', 'network'], status: 'active', joinDate: '2024-01-10', lastLogin: '2026-06-16T20:00:00Z' },
  { id: '4', name: 'هبة محمد', phone: '01011223344', email: 'heba@netflow.com', role: 'support', permissions: ['tickets', 'subscribers_view'], status: 'active', joinDate: '2024-03-20', lastLogin: '2026-06-16T18:00:00Z' },
];

// ===== RESELLERS =====
export const mockResellers: Reseller[] = [
  { id: '1', name: 'شركة النيل للاتصالات', phone: '01099001100', email: 'nile@comm.com', balance: 2400, totalSales: 45000, subscribersCount: 120, commission: 15, status: 'active', joinDate: '2024-01-01' },
  { id: '2', name: 'مكتب الدلتا', phone: '01033445566', email: 'delta@office.com', balance: 850, totalSales: 18000, subscribersCount: 48, commission: 12, status: 'active', joinDate: '2024-05-15' },
];

// ===== PACKAGE DISTRIBUTION =====
export const mockPackageDistribution = [
  { name: 'الاقتصادية', value: 320, color: '#6366f1' },
  { name: 'المتوسطة', value: 485, color: '#8b5cf6' },
  { name: 'البريميوم', value: 198, color: '#06b6d4' },
  { name: 'الألتيميت', value: 86, color: '#10b981' },
  { name: 'أسبوعية', value: 112, color: '#f59e0b' },
  { name: 'بيانات', value: 46, color: '#ef4444' },
];
