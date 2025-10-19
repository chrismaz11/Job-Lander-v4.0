export type Theme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export const themes: Record<Exclude<Theme, 'system'>, ThemeColors> = {
  light: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  dark: {
    primary: '#3b82f6',
    secondary: '#94a3b8',
    accent: '#fbbf24',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171'
  }
};

export class ThemeManager {
  private currentTheme: Theme = 'system';
  private listeners: Array<(theme: Theme, colors: ThemeColors) => void> = [];

  constructor() {
    this.initializeTheme();
    this.setupSystemThemeListener();
  }

  private initializeTheme(): void {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      this.currentTheme = saved;
    }
    this.applyTheme();
  }

  private setupSystemThemeListener(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (this.currentTheme === 'system') {
        this.applyTheme();
      }
    });
  }

  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  private getEffectiveTheme(): Exclude<Theme, 'system'> {
    if (this.currentTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  private applyTheme(): void {
    const effectiveTheme = this.getEffectiveTheme();
    const colors = themes[effectiveTheme];
    
    // Apply CSS custom properties
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Update class for Tailwind
    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark');
    
    // Notify listeners
    this.listeners.forEach(listener => listener(this.currentTheme, colors));
  }

  onThemeChange(callback: (theme: Theme, colors: ThemeColors) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  getCurrentColors(): ThemeColors {
    return themes[this.getEffectiveTheme()];
  }
}

export const themeManager = new ThemeManager();
