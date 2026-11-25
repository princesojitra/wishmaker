import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OccasionSelector } from './components/OccasionSelector';
import { WishForm } from './components/WishForm';
import { WishResults } from './components/WishResults';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { Toast, ToastType } from './components/Toast';
import { Wish, WishRequest, Language } from './types/wish';
import { getCuratedWishes } from './data/sampleWishes';

export function App() {
  const [occasion, setOccasion] = useState('birthday');
  const [customOccasion, setCustomOccasion] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wishes, setWishes] = useState<Wish[] | null>(null);
  const [currentRecipient, setCurrentRecipient] = useState('');
  const [lastRequest, setLastRequest] = useState<WishRequest | null>(null);
  const [regenCounter, setRegenCounter] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const showToast = (msg: string, type: ToastType = 'success') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(msg);
    setToastType(type);
    setIsToastVisible(true);
    toastTimerRef.current = setTimeout(() => {
      setIsToastVisible(false);
    }, type === 'warning' || type === 'error' ? 3500 : 2000);
  };

  const fireMinimalConfetti = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F43F5E', '#A855F7', '#FBBF24', '#25D366'],
      });
    } catch {
      // Ignore
    }
  };

  const handleGenerateWishes = async (data: WishRequest) => {
    const finalData: WishRequest = {
      ...data,
      occasion:
        occasion === 'custom' && customOccasion.trim()
          ? customOccasion.trim()
          : data.occasion,
    };

    setIsLoading(true);
    setWishes(null);
    setCurrentRecipient(finalData.recipientName);
    setLastRequest(finalData);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const resData = await response.json();

      if (resData.wishes && resData.wishes.length > 0) {
        setWishes(resData.wishes);
      } else {
        const fallback = getCuratedWishes(finalData);
        setWishes(fallback);
      }
    } catch {
      const fallback = getCuratedWishes(finalData);
      setWishes(fallback);
    } finally {
      setIsLoading(false);
      fireMinimalConfetti();
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  const handleCopyWish = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard');
    } catch {
      showToast('Copied');
    }
  };

  const handleShareWhatsApp = (text: string) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp');
  };

  const handleFormSubmit = (data: WishRequest) => {
    setRegenCounter(0);
    handleGenerateWishes({
      ...data,
      regenerationCount: 0,
      seed: 0,
      previousWishes: [],
    });
  };

  const handleRegenerate = () => {
    if (lastRequest) {
      const nextCount = regenCounter + 1;
      setRegenCounter(nextCount);
      const previousTexts = wishes ? wishes.map((w) => `${w.title}: ${w.content.slice(0, 40)}`) : [];
      handleGenerateWishes({
        ...lastRequest,
        seed: nextCount,
        regenerationCount: nextCount,
        previousWishes: previousTexts,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/60 text-zinc-900 transition-colors duration-150 dark:bg-zinc-950 dark:text-zinc-100 font-sans">
      <Navbar
        currentLanguage={language}
        onLanguageChange={setLanguage}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onGoHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      <main className="flex-1 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
          {/* Hero Banner */}
          <Hero language={language} />

          {/* Unified Generator Studio Card */}
          <div className="max-w-3xl mx-auto w-full rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 space-y-6">
            {/* Occasion Selector */}
            <OccasionSelector
              selectedOccasion={occasion}
              onSelectOccasion={setOccasion}
              customOccasionText={customOccasion}
              onCustomOccasionChange={setCustomOccasion}
              language={language}
            />

            <div className="border-t border-zinc-100 dark:border-zinc-800/80" />

            {/* Personalization Form */}
            <WishForm
              selectedOccasion={occasion}
              language={language}
              onLanguageChange={setLanguage}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Results Anchor */}
          <div ref={resultsRef} className="pt-2">
            {isLoading && <LoadingSkeleton />}

            {!isLoading && wishes && wishes.length > 0 && (
              <WishResults
                wishes={wishes}
                recipientName={currentRecipient}
                occasion={occasion}
                language={language}
                onCopy={handleCopyWish}
                onShareWhatsApp={handleShareWhatsApp}
                onRegenerate={handleRegenerate}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/60 py-6 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500 bg-white/40 dark:bg-zinc-950/40">
        <div className="mx-auto max-w-3xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} WishMaker. AI Greeting & Wishes Generator.</p>
          <p className="flex items-center gap-2">
            <span>English</span>
            <span>•</span>
            <span>हिन्दी</span>
            <span>•</span>
            <span>ગુજરાતી</span>
          </p>
        </div>
      </footer>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        type={toastType}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}

export default App;
