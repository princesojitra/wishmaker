export type Language = 'en' | 'hi' | 'gu';

export type Tone =
  | 'heartfelt'
  | 'witty'
  | 'poetic'
  | 'formal'
  | 'short'
  | 'inspirational'
  | 'romantic'
  | 'roast'
  | 'nostalgic'
  | 'blessed'
  | 'custom';

export interface Occasion {
  id: string;
  title: string;
  titleHi: string;
  titleGu: string;
  icon: string;
  description: string;
  tag: string;
  popular?: boolean;
}

export interface WishRequest {
  occasion: string;
  recipientName: string;
  relationship?: string;
  tone?: Tone;
  tones?: string[];
  language: Language;
  context?: string;
  seed?: number;
  regenerationCount?: number;
  previousWishes?: string[];
}

export interface Wish {
  id: string;
  style: string;
  title: string;
  content: string;
  toneEmoji?: string;
}

export interface WishResponse {
  wishes: Wish[];
  source: 'gemini' | 'curated';
  notice?: string;
  error?: string;
}
