'use client';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const { theme, lang, setTheme, setLang } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('netflow-theme') as 'light' | 'dark';
    const savedLang = localStorage.getItem('netflow-lang') as 'ar' | 'en';
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLang(savedLang);
    setMounted(true);
  }, [setTheme, setLang]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('netflow-theme', theme);
    localStorage.setItem('netflow-lang', lang);

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme, lang, mounted]);

  if (!mounted) {
    return <div style={{ opacity: 0 }}>{children}</div>;
  }

  return <>{children}</>;
}
