type Language = {
  key: string;
  dir?: 'ltr' | 'rtl';
  fontScale?: number;
};

export const DEFAULT_LANGUAGE_KEY: Language['key'] = 'fa';

export const AVAILABLE_LANGUAGES: Language[] = [
  {
    key: 'en',
  },
  {
    key: 'fa',
    dir: 'rtl',
    fontScale: 1,
  },
];
