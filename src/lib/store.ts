import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  lang: 'ar' | 'en';
  setTheme: (theme: 'light' | 'dark') => void;
  setLang: (lang: 'ar' | 'en') => void;
  toggleTheme: () => void;
  toggleLang: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark',
  lang: 'ar',
  setTheme: (theme) => set({ theme }),
  setLang: (lang) => set({ lang }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  toggleLang: () => set((state) => ({ lang: state.lang === 'ar' ? 'en' : 'ar' })),
}));
