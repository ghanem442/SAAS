export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    // Navigation / Sidebar
    home: 'الرئيسية',
    dashboard: 'لوحة التحكم',
    notifications: 'الإشعارات',
    client_management: 'إدارة العملاء',
    subscribers: 'المشتركين',
    packages: 'البالباقات', // Keep package label matches
    package_label: 'الباقات',
    cards: 'الكروت',
    finance: 'المالية',
    payments: 'المدفوعات',
    invoices: 'الفواتير',
    debts: 'الديون',
    network: 'الشبكة',
    devices: 'الأجهزة',
    network_map: 'خريطة الشبكة',
    management: 'الإدارة',
    employees: 'الموظفين',
    resellers: 'الموزعين',
    tickets: 'الشكاوى',
    analytics: 'التحليلات',
    reports: 'التقارير',
    ai_assistant: 'مساعد الذكاء',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    sys_admin: 'مدير النظام',
    user_name: 'موسى علي',

    // Topbar
    search_placeholder: 'بحث عن مشترك، كارت، فاتورة...',
    live: 'مباشر',
    refresh: 'تحديث',
    theme_toggle: 'تغيير المظهر',
    lang_toggle: 'English',

    // Dashboard
    total_subscribers: 'إجمالي المشتركين',
    monthly_revenue: 'إيرادات الشهر',
    active_subscribers: 'المشتركين النشطين',
    outstanding_debts: 'الديون المستحقة',
    active_sessions: 'الجلسات النشطة',
    offline_devices: 'أجهزة غير متصلة',
    today_revenue: 'إيرادات اليوم',
    open_tickets: 'تذاكر مفتوحة',
    
    // Sub-labels / Trend labels
    this_month: 'هذا الشهر',
    compare_last_month: 'مقارنة بالشهر السابق',
    activation_rate: 'نسبة التفعيل',
    have_debts: 'لديهم ديون',
    last_hour: 'آخر ساعة',
    total_devices: 'إجمالي الأجهزة',
    joined_today: 'انضموا اليوم',
    urgent_tickets: 'تحتاج رد سريع',
    currency: 'ج',
    of: 'من',

    // Dashboard sections
    monthly_revenue_chart: 'الإيرادات الشهرية',
    subscriber_growth_chart: 'نمو المشتركين',
    network_usage_chart: 'استهلاك الشبكة (آخر 30 يوم)',
    package_dist_chart: 'توزيع الباقات',
    recent_subscribers: 'آخر المشتركين',
    device_status: 'حالة الأجهزة',
    recent_alerts: 'آخر التنبيهات',
    recent_payments: 'آخر المدفوعات',
    view_all: 'عرض الكل',

    // Device statuses
    online: 'متصل',
    offline: 'غير متصل',
    warning: 'تحذير',
    idle: 'خامل',
    connected: 'متصل',

    // Payment methods
    cash: 'نقدي',
    instapay: 'InstaPay',
    bank_transfer: 'تحويل بنكي',
    wallet: 'محفظة',
    card: 'بطاقة',

    // Packages names
    economic: 'الاقتصادية',
    medium: 'المتوسطة',
    premium: 'البريميوم',
    ultimate: 'الألتيميت',
    weekly: 'أسبوعية',
    data: 'بيانات',

    // Common words
    active: 'نشط',
    suspended: 'موقوف',
    expired: 'منتهي',
    status: 'الحالة',
    action: 'الإجراء',
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    cancel: 'إلغاء',
    save: 'حفظ'
  },
  en: {
    // Navigation / Sidebar
    home: 'Home',
    dashboard: 'Dashboard',
    notifications: 'Notifications',
    client_management: 'Client Management',
    subscribers: 'Subscribers',
    packages: 'Packages',
    package_label: 'Packages',
    cards: 'Cards',
    finance: 'Finance',
    payments: 'Payments',
    invoices: 'Invoices',
    debts: 'Debts',
    network: 'Network',
    devices: 'Devices',
    network_map: 'Network Map',
    management: 'Management',
    employees: 'Employees',
    resellers: 'Resellers',
    tickets: 'Support Tickets',
    analytics: 'Analytics',
    reports: 'Reports',
    ai_assistant: 'AI Assistant',
    settings: 'Settings',
    logout: 'Logout',
    sys_admin: 'System Admin',
    user_name: 'Mousa Ali',

    // Topbar
    search_placeholder: 'Search for subscriber, card, invoice...',
    live: 'Live',
    refresh: 'Refresh',
    theme_toggle: 'Toggle Theme',
    lang_toggle: 'العربية',

    // Dashboard
    total_subscribers: 'Total Subscribers',
    monthly_revenue: 'Monthly Revenue',
    active_subscribers: 'Active Subscribers',
    outstanding_debts: 'Outstanding Debts',
    active_sessions: 'Active Sessions',
    offline_devices: 'Offline Devices',
    today_revenue: 'Today\'s Revenue',
    open_tickets: 'Open Tickets',

    // Sub-labels / Trend labels
    this_month: 'this month',
    compare_last_month: 'vs last month',
    activation_rate: 'Activation rate',
    have_debts: 'have debts',
    last_hour: 'last hour',
    total_devices: 'total devices',
    joined_today: 'joined today',
    urgent_tickets: 'urgent reply needed',
    currency: 'EGP',
    of: 'of',

    // Dashboard sections
    monthly_revenue_chart: 'Monthly Revenue',
    subscriber_growth_chart: 'Subscriber Growth',
    network_usage_chart: 'Network Usage (Last 30 Days)',
    package_dist_chart: 'Package Distribution',
    recent_subscribers: 'Recent Subscribers',
    device_status: 'Device Status',
    recent_alerts: 'Recent Alerts',
    recent_payments: 'Recent Payments',
    view_all: 'View All',

    // Device statuses
    online: 'Online',
    offline: 'Offline',
    warning: 'Warning',
    idle: 'Idle',
    connected: 'Connected',

    // Payment methods
    cash: 'Cash',
    instapay: 'InstaPay',
    bank_transfer: 'Bank Transfer',
    wallet: 'Wallet',
    card: 'Card',

    // Packages names
    economic: 'Economic',
    medium: 'Medium',
    premium: 'Premium',
    ultimate: 'Ultimate',
    weekly: 'Weekly',
    data: 'Data Only',

    // Common words
    active: 'Active',
    suspended: 'Suspended',
    expired: 'Expired',
    status: 'Status',
    action: 'Action',
    add: 'Add New',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save'
  }
};

export const useTranslation = (lang: Language) => {
  return (key: keyof typeof translations['ar']) => {
    return translations[lang][key] || key;
  };
};
