export interface Subscriber {
  id: string;
  name: string;
  phone: string;
  address: string;
  nationalId?: string;
  notes?: string;
  status: 'active' | 'suspended' | 'expired';
  package: Package;
  joinDate: string;
  expiryDate: string;
  debt: number;
  totalPaid: number;
  ipAddress?: string;
  macAddress?: string;
  downloadSpeed: number;
  uploadSpeed: number;
  usedData: number;
  totalData: number;
  lastSeen?: string;
  resellerId?: string;
}

export interface Package {
  id: string;
  name: string;
  type: 'monthly' | 'weekly' | 'daily' | 'data' | 'time' | 'unlimited' | 'custom';
  price: number;
  downloadSpeed: number;
  uploadSpeed: number;
  dataLimit?: number;
  duration: number;
  durationUnit: 'days' | 'hours' | 'months';
  isActive: boolean;
  subscribersCount: number;
  color: string;
}

export interface Card {
  id: string;
  code: string;
  price: number;
  downloadSpeed: number;
  uploadSpeed: number;
  duration: number;
  durationUnit: string;
  dataLimit?: number;
  status: 'unused' | 'used' | 'expired';
  usedBy?: string;
  usedAt?: string;
  createdAt: string;
  batchId?: string;
}

export interface Payment {
  id: string;
  subscriberId: string;
  subscriberName: string;
  amount: number;
  method: 'cash' | 'bank_transfer' | 'instapay' | 'wallet' | 'card';
  date: string;
  note?: string;
  invoiceId?: string;
  status: 'completed' | 'pending' | 'failed';
  collectedBy?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  subscriberId: string;
  subscriberName: string;
  subscriberPhone: string;
  subscriberAddress: string;
  items: InvoiceItem[];
  total: number;
  status: 'paid' | 'unpaid' | 'partial';
  type: 'renewal' | 'installation' | 'custom';
  date: string;
  dueDate: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Debt {
  id: string;
  subscriberId: string;
  subscriberName: string;
  subscriberPhone: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'overdue' | 'paid';
  createdAt: string;
  notes?: string;
}

export interface Device {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'access_point' | 'tower' | 'server' | 'onu';
  ip: string;
  mac?: string;
  status: 'online' | 'offline' | 'warning';
  location: string;
  towerId?: string;
  signal?: number;
  temperature?: number;
  uptime?: string;
  downloadSpeed: number;
  uploadSpeed: number;
  connectedClients: number;
  lastSeen: string;
  lat?: number;
  lng?: number;
}

export interface Tower {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline' | 'warning';
  capacity: number;
  connectedClients: number;
  devices: string[];
  coverageRadius: number;
}

export interface Employee {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'admin' | 'accountant' | 'technician' | 'support' | 'reseller';
  permissions: string[];
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin?: string;
  avatar?: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  subscriberId: string;
  subscriberName: string;
  subscriberPhone: string;
  type: 'slow_internet' | 'disconnection' | 'payment' | 'device_issue' | 'other';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  description: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  comments?: TicketComment[];
}

export interface TicketComment {
  id: string;
  author: string;
  message: string;
  createdAt: string;
  isInternal: boolean;
}

export interface Reseller {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: number;
  totalSales: number;
  subscribersCount: number;
  commission: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface DashboardStats {
  totalSubscribers: number;
  activeSubscribers: number;
  suspendedSubscribers: number;
  expiredSubscribers: number;
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  yearRevenue: number;
  totalRevenue: number;
  totalDebt: number;
  todayUsage: number;
  monthUsage: number;
  activeSessions: number;
  onlineDevices: number;
  offlineDevices: number;
  openTickets: number;
  newSubscribersToday: number;
  newSubscribersMonth: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface NetworkStats {
  downloadSpeed: number;
  uploadSpeed: number;
  latency: number;
  packetLoss: number;
  uptime: number;
}
