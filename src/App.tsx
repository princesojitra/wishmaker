import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OccasionSelector } from './components/OccasionSelector';
import { WishForm } from './components/WishForm';
import { WishResults } from './components/WishResults';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { Toast } from './components/Toast';
import { Wish, WishRequest, Language } from './types/wish';
import { getCuratedWishes } from './data/sampleWishes';

export function App() {
  const [occasion, setOccasion] = useState('birthday');
  const [language, setLanguage] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wishes, setWishes] = useState<Wish[] | null>(null);
  const [currentRecipient, setCurrentRecipient] = useState('');
  const [lastRequest, setLastRequest] = useState<WishRequest | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2000);
  };

  const fireMinimalConfetti = () => {
    try {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#18181b', '#71717a', '#a1a1aa', '#25D366'],
      });
    } catch {
      // Ignore
    }
  };

  const handleGenerateWishes = async (data: WishRequest) => {
    setIsLoading(true);
    setWishes(null);
    setCurrentRecipient(data.recipientName);
    setLastRequest(data);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const resData = await response.json();

      if (resData.wishes && resData.wishes.length > 0) {
        setWishes(resData.wishes);
      } else {
        const fallback = getCuratedWishes(data);
        setWishes(fallback);
      }
    } catch {
      const fallback = getCuratedWishes(data);
      setWishes(fallback);
    } finally {
      setIsLoading(false);
      fireMinimalConfetti();
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
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

  const handleRegenerate = () => {
    if (lastRequest) {
      handleGenerateWishes(lastRequest);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 text-zinc-900 transition-colors duration-150 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar
        currentLanguage={language}
        onLanguageChange={setLanguage}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <main className="flex-1 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Hero language={language} />

          {/* Form Card */}
          <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 sm:p-7 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/50">
            <OccasionSelector
              selectedOccasion={occasion}
              onSelectOccasion={setOccasion}
              language={language}
            />

            <div className="my-5 border-t border-zinc-100 dark:border-zinc-800" />

            <WishForm
              selectedOccasion={occasion}
              language={language}
              onLanguageChange={setLanguage}
              onSubmit={handleGenerateWishes}
              isLoading={isLoading}
            />
          </div>

          {/* Results Anchor */}
          <div ref={resultsRef} className="pt-6">
            {isLoading && <LoadingSkeleton />}

            {!isLoading && wishes && wishes.length > 0 && (
              <WishResults
                wishes={wishes}
                recipientName={currentRecipient}
                language={language}
                onCopy={handleCopyWish}
                onShareWhatsApp={handleShareWhatsApp}
                onRegenerate={handleRegenerate}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200/60 py-6 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
        <div className="mx-auto max-w-3xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} WishMaker. Minimalist greeting generator.</p>
          <p>English • हिन्दी • ગુજરાતી</p>
        </div>
      </footer>

      <Toast message={toastMessage} isVisible={isToastVisible} />
    </div>
  );
}

export default App;
