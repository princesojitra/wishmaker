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

  // Sync theme with document element
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
    }, 2500);
  };

  const fireCelebrationConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#F97316', '#F43F5E', '#FBBF24', '#10B981', '#6366F1'],
      });
    } catch {
      // Ignore if canvas-confetti is unavailable
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
        // Fallback
        const fallback = getCuratedWishes(data);
        setWishes(fallback);
      }
    } catch (err: any) {
      console.warn('API fetch issue, using local curated engine:', err);
      const fallback = getCuratedWishes(data);
      setWishes(fallback);
    } finally {
      setIsLoading(false);
      fireCelebrationConfetti();
      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleCopyWish = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Wish copied to clipboard! 📋');
    } catch {
      showToast('Copied text!');
    }
  };

  const handleShareWhatsApp = (text: string) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp... 💬');
  };

  const handleRegenerate = () => {
    if (lastRequest) {
      handleGenerateWishes(lastRequest);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <Navbar
        currentLanguage={language}
        onLanguageChange={setLanguage}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <main className="flex-1 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Hero Header */}
          <Hero language={language} />

          {/* Form Container */}
          <div className="mt-4 rounded-3xl border border-festive-200/90 bg-white/60 p-4 sm:p-8 shadow-sm backdrop-blur-md dark:bg-slate-900/60 dark:border-slate-800">
            {/* Step 1: Occasions Grid */}
            <OccasionSelector
              selectedOccasion={occasion}
              onSelectOccasion={setOccasion}
              language={language}
            />

            <div className="my-6 border-t border-festive-100 dark:border-slate-800" />

            {/* Step 2: Form */}
            <WishForm
              selectedOccasion={occasion}
              language={language}
              onLanguageChange={setLanguage}
              onSubmit={handleGenerateWishes}
              isLoading={isLoading}
            />
          </div>

          {/* Results Anchor */}
          <div ref={resultsRef} className="pt-8">
            {isLoading && <LoadingSkeleton language={language} />}

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

      {/* Footer */}
      <footer className="border-t border-festive-200/50 py-8 text-center text-xs text-muted-foreground bg-white/40 dark:bg-slate-950/40 dark:border-slate-900">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} WishMaker — Crafted with care for celebrations worldwide.</p>
          <div className="flex items-center gap-4">
            <span className="text-festive-600 dark:text-festive-400 font-medium">English • हिन्दी • ગુજરાતી</span>
            <span>•</span>
            <span>Gemini AI & Cloudflare Ready</span>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <Toast message={toastMessage} isVisible={isToastVisible} />
    </div>
  );
}

export default App;
