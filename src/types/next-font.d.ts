declare module 'next/font/google' {
  export interface FontOptions {
    weight?: string | string[];
    subsets?: string[];
    variable?: string;
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
    preload?: boolean;
    fallback?: string[];
    adjustFontFallback?: boolean;
  }

  export interface NextFont {
    className: string;
    style: {
      fontFamily: string;
      fontWeight?: number | string;
      fontStyle?: string;
    };
    variable: string;
  }

  export function Marcellus(options?: FontOptions): NextFont;
  export function Jost(options?: FontOptions): NextFont;
}
