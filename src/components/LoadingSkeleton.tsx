import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types/wish';

interface LoadingSkeletonProps {
  language: Language;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ language }) => {
  const messages = {
    en: [
      'Reflecting on the warmth of the occasion...',
      'Weaving heartfelt words and personal touches...',
      'Polishing witty and poetic expressions...',
      'Almost ready with your 3 custom wishes! ✨',
    ],
    hi: [
      'अवसर की मिठास और आत्मीयता को समेटा जा रहा है...',
      'दिल को छू लेने वाले शब्दों का चयन हो रहा है...',
      'शायराना अंदाज़ और प्यार भरा स्पर्श जोड़ा जा रहा है...',
      'आपकी 3 खास शुभकामनाएं तैयार हो रही हैं! ✨',
    ],
    gu: [
      'અવસરની પવિત્રતા અને સ્નેહને શબ્દોમાં ગૂંથી રહ્યા છીએ...',
      'હૃદયસ્પર્શી લાગણીઓ અને મીઠા સંસ્મરણો ઉમેરી રહ્યા છીએ...',
      'કાવ્યાત્મક લય અને ઉત્સાહનો સુંદર સમન્વય થઈ રહ્યો છે...',
      'બસ થોડી જ ક્ષણોમાં તમારી 3 સુંદર શુભેચ્છાઓ તૈયાર છે! ✨',
    ],
  };

  const currentMessages = messages[language] || messages.en;
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % currentMessages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [currentMessages.length]);

  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      {/* Cycling Friendly Message */}
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-festive-400 to-amber-300 text-white shadow-md animate-pulse">
          <Sparkles className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold text-festive-800 dark:text-festive-300 animate-fade-in transition-all">
          {currentMessages[currentIdx]}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Crafting 3 distinct personalities (Heartfelt, Witty & Poetic)
        </p>
      </div>

      {/* 3 Skeleton Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-festive-200/60 bg-white/70 p-5 shadow-xs space-y-4 animate-pulse dark:bg-slate-900/40 dark:border-slate-800"
          >
            <div className="flex items-center justify-between">
              <div className="h-5 w-24 rounded-full bg-festive-200/70 dark:bg-slate-800" />
              <div className="h-4 w-12 rounded bg-festive-100 dark:bg-slate-800" />
            </div>
            <div className="h-4 w-3/4 rounded bg-festive-200/60 dark:bg-slate-800" />
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full rounded bg-festive-100/80 dark:bg-slate-800/80" />
              <div className="h-3 w-5/6 rounded bg-festive-100/80 dark:bg-slate-800/80" />
              <div className="h-3 w-4/6 rounded bg-festive-100/80 dark:bg-slate-800/80" />
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-festive-100 dark:border-slate-800">
              <div className="h-3 w-14 rounded bg-festive-100 dark:bg-slate-800" />
              <div className="flex gap-2">
                <div className="h-8 w-16 rounded-lg bg-festive-200/60 dark:bg-slate-800" />
                <div className="h-8 w-20 rounded-lg bg-festive-300/60 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
