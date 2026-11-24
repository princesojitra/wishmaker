import React, { useState, useRef } from 'react';
import { ChevronDown, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { RELATIONSHIPS, TONES, LANGUAGES } from '../data/occasions';
import { WishRequest, Language, Tone } from '../types/wish';

interface WishFormProps {
  selectedOccasion: string;
  customOccasionText?: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSubmit: (data: WishRequest) => void;
  isLoading: boolean;
  onShowToast?: (msg: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
}

export const WishForm: React.FC<WishFormProps> = ({
  selectedOccasion,
  customOccasionText,
  language,
  onLanguageChange,
  onSubmit,
  isLoading,
  onShowToast,
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [relationship, setRelationship] = useState('friend');
  const [selectedTones, setSelectedTones] = useState<string[]>(['heartfelt']);
  const [customToneText, setCustomToneText] = useState('');
  const [context, setContext] = useState('');
  const [nameError, setNameError] = useState('');
  const [customToneError, setCustomToneError] = useState('');
  const [shakeField, setShakeField] = useState<'name' | 'tone' | null>(null);

  const recipientInputRef = useRef<HTMLInputElement>(null);
  const customToneInputRef = useRef<HTMLInputElement>(null);

  const triggerShake = (field: 'name' | 'tone') => {
    setShakeField(field);
    setTimeout(() => setShakeField(null), 500);
  };

  const handleToggleTone = (id: string) => {
    setSelectedTones((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one tone active
        if (id === 'custom') {
          setCustomToneError('');
        }
        return prev.filter((t) => t !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate custom occasion if selected
    if (selectedOccasion === 'custom' && (!customOccasionText || !customOccasionText.trim())) {
      const msg =
        language === 'hi'
          ? 'कृपया अपने खास अवसर का नाम लिखें (अनिवार्य)'
          : language === 'gu'
          ? 'કૃપા કરીને તમારા ખાસ પ્રસંગનું નામ લખો (ફરજિયાત)'
          : 'Please enter your custom occasion name (mandatory)';
      onShowToast?.(msg, 'warning');
      const occInput = document.getElementById('custom-occasion-input');
      occInput?.focus();
      occInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      occInput?.classList.add('animate-shake');
      setTimeout(() => occInput?.classList.remove('animate-shake'), 500);
      return;
    }

    // 2. Validate recipient name
    if (!recipientName.trim()) {
      const msg =
        language === 'hi'
          ? 'कृपया जिसके लिए शुभकामना चाहिए उनका नाम लिखें'
          : language === 'gu'
          ? 'કૃપા કરીને જેમના માટે શુભેચ્છા જોઈએ તેમનું નામ લખો'
          : 'Please enter the recipient’s name';
      setNameError(msg);
      triggerShake('name');
      onShowToast?.(msg, 'warning');
      recipientInputRef.current?.focus();
      recipientInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setNameError('');

    // 3. Validate custom tone (mandatory when custom tone is selected)
    if (selectedTones.includes('custom') && !customToneText.trim()) {
      const msg =
        language === 'hi'
          ? 'कस्टम टोन अनिवार्य है — कृपया अपना पसंदीदा टोन लिखें'
          : language === 'gu'
          ? 'કસ્ટમ ટોન ફરજિયાત છે — કૃપા કરીને તમારો ટોન લખો'
          : 'Custom tone is mandatory — please describe your preferred tone';
      setCustomToneError(msg);
      triggerShake('tone');
      onShowToast?.(msg, 'warning');
      customToneInputRef.current?.focus();
      customToneInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setCustomToneError('');

    const processedTones = selectedTones.map((t) =>
      t === 'custom' && customToneText.trim() ? customToneText.trim() : t
    );

    onSubmit({
      occasion: selectedOccasion,
      recipientName: recipientName.trim(),
      relationship,
      tone: (processedTones[0] || 'heartfelt') as Tone,
      tones: processedTones,
      language,
      context: context.trim(),
    });
  };

  const getRelationshipLabel = (rel: typeof RELATIONSHIPS[0]) => {
    if (language === 'hi') return rel.labelHi;
    if (language === 'gu') return rel.labelGu;
    return rel.label;
  };

  const getToneLabel = (toneItem: typeof TONES[0]) => {
    if (language === 'hi') return toneItem.labelHi;
    if (language === 'gu') return toneItem.labelGu;
    return toneItem.label;
  };

  const sectionText = {
    en: {
      step2Title: 'Recipient Details',
      step2Subtitle: 'Who are you sending this greeting to?',
      nameLabel: 'Recipient Name *',
      relLabel: 'Relationship',
      step3Title: 'Language & Tone',
      step3Subtitle: 'How would you like the wishes to sound?',
      langLabel: 'Output Language',
      toneLabel: 'Emotional Tone',
      contextLabel: 'Personal Touch / Memory',
      contextHint: 'Add an inside joke or special detail to make the wish uniquely theirs.',
    },
    hi: {
      step2Title: 'पात्र विवरण',
      step2Subtitle: 'यह शुभकामना किसके लिए है?',
      nameLabel: 'नाम *',
      relLabel: 'संबंध / रिश्ता',
      step3Title: 'भाषा और अंदाज़',
      step3Subtitle: 'शुभकामना का टोन और भाषा चुनें',
      langLabel: 'भाषा',
      toneLabel: 'टोन / अंदाज़',
      contextLabel: 'विशेष संस्मरण / संदर्भ',
      contextHint: 'कोई खास बात या अंदरूनी मज़ाक जोड़ें जिससे शुभकामना और भी आत्मीय लगे।',
    },
    gu: {
      step2Title: 'વિગત',
      step2Subtitle: 'આ શુભેચ્છા કોના માટે છે?',
      nameLabel: 'નામ *',
      relLabel: 'સંબંધ',
      step3Title: 'ભાષા અને અંદાજ',
      step3Subtitle: 'શુભેચ્છાનો અંદાજ અને ભાષા પસંદ કરો',
      langLabel: 'ભાષા',
      toneLabel: 'ટોન / અંદાજ',
      contextLabel: 'ખાસ સ્મરણ / સંદર્ભ',
      contextHint: 'કોઈ ખાસ વાત કે સંભારણું ઉમેરો જેથી શુભેચ્છા વધુ અનોખી લાગે.',
    },
  };

  const t = sectionText[language] || sectionText.en;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 2: Recipient Information */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-2.5 pb-1">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold text-xs shadow-xs">
            2
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {t.step2Title}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {t.step2Subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {/* Recipient Name */}
          {/* Recipient Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider block">
              {t.nameLabel}
            </label>
            <div className={shakeField === 'name' ? 'animate-shake' : ''}>
              <Input
                ref={recipientInputRef}
                type="text"
                placeholder={
                  language === 'hi'
                    ? 'उदा. रोहन, सिमरन, मम्मी...'
                    : language === 'gu'
                    ? 'દા.ત. રોહન, પ્રિયંકા, મમ્મી...'
                    : 'e.g. Maya, Rohan, Mom, Dr. Sharma'
                }
                value={recipientName}
                onChange={(e) => {
                  setRecipientName(e.target.value);
                  if (nameError) setNameError('');
                }}
                className={`h-11 text-sm border-zinc-300 dark:border-zinc-700 ${
                  nameError ? 'border-red-500 ring-2 ring-red-500/20 dark:border-red-400 dark:ring-red-400/30' : ''
                }`}
                maxLength={60}
              />
            </div>
            {nameError && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1.5 animate-fade-in">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{nameError}</span>
              </p>
            )}
          </div>

          {/* Relationship with spacious trailing arrow */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider block">
              {t.relLabel}
            </label>
            <div className="relative">
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="flex h-11 w-full appearance-none rounded-lg border border-zinc-300 bg-white pl-3.5 pr-10 py-2 text-sm text-zinc-900 focus-visible:outline-none focus-visible:border-zinc-800 focus-visible:ring-1 focus-visible:ring-zinc-800/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus-visible:border-zinc-200 dark:focus-visible:ring-zinc-200/20 shadow-xs cursor-pointer"
              >
                {RELATIONSHIPS.map((rel) => (
                  <option key={rel.id} value={rel.id}>
                    {getRelationshipLabel(rel)}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 dark:border-zinc-800" />

      {/* Step 3: Language & Tone Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 pb-1">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold text-xs shadow-xs">
            3
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {t.step3Title}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {t.step3Subtitle}
            </p>
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider block">
            {t.langLabel}
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {LANGUAGES.map((lang) => {
              const isSelected = language === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => onLanguageChange(lang.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-semibold border-2 transition-all ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-100/80 text-zinc-950 shadow-xs ring-1 ring-zinc-900/20 dark:border-zinc-200 dark:bg-zinc-800/90 dark:text-zinc-50 dark:ring-zinc-200/30'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.native}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-zinc-900 dark:text-zinc-100 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone Selector - Responsive Wrapping Multi-Select Chips */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider block">
            {t.toneLabel}
          </label>

          <div className="flex flex-wrap gap-2">
            {TONES.map((toneItem) => {
              const isSelected = selectedTones.includes(toneItem.id);
              return (
                <button
                  key={toneItem.id}
                  type="button"
                  onClick={() => handleToggleTone(toneItem.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-100/90 text-zinc-950 font-semibold shadow-xs ring-1 ring-zinc-900/20 dark:border-zinc-200 dark:bg-zinc-800/90 dark:text-zinc-50 dark:ring-zinc-200/30'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <span className="text-sm">{toneItem.emoji}</span>
                  <span>{getToneLabel(toneItem)}</span>
                  {isSelected && (
                    <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 ml-0.5">
                      <Check className="h-2 w-2 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic input for custom tone */}
          {selectedTones.includes('custom') && (
            <div className={`pt-1.5 animate-fade-in ${shakeField === 'tone' ? 'animate-shake' : ''}`}>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider block mb-1.5">
                {language === 'hi'
                  ? 'अपना कस्टम टोन लिखें'
                  : language === 'gu'
                  ? 'તમારો કસ્ટમ ટોન લખો'
                  : 'Describe Your Custom Tone'}
                <span className="text-zinc-900 dark:text-zinc-100 ml-1 font-bold">*</span>
              </label>
              <Input
                ref={customToneInputRef}
                type="text"
                placeholder={
                  language === 'hi'
                    ? 'उदा. बॉलीवुड स्टाइल, शेरो-शायरी, दार्शनिक, शेक्सपियर, हल्की नोकझोंक...'
                    : language === 'gu'
                    ? 'દા.ત. કાવ્યાત્મક ગઝલ, વડીલ જેવી સલાહ, બોલિવૂડ મસાલા, હળવી મજાક...'
                    : 'e.g. Shakespearean drama, Bollywood retro, Zen & calming, Savage teasing...'
                }
                value={customToneText}
                onChange={(e) => {
                  setCustomToneText(e.target.value);
                  if (customToneError) setCustomToneError('');
                }}
                className={`h-10 text-xs sm:text-sm border-zinc-300 dark:border-zinc-700 ${
                  customToneError
                    ? 'border-red-500 ring-2 ring-red-500/20 dark:border-red-400 dark:ring-red-400/30'
                    : ''
                }`}
                maxLength={60}
                autoFocus
              />
              {customToneError && (
                <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1.5 mt-1.5 animate-fade-in">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{customToneError}</span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Seamlessly Integrated Personal Touch Field */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider block">
            {t.contextLabel}
          </label>
          <Textarea
            rows={2}
            placeholder={
              language === 'hi'
                ? 'जैसे: वह चाय का शौकीन है, 30 साल का हो रहा है, हाल ही में पदोन्नति मिली है...'
                : language === 'gu'
                ? 'જેમ કે: ચા નો શોખીન છે, ૩૦ વર્ષ પૂરા થયા, નવી નોકરી શરૂ કરી...'
                : 'e.g. Loves chai, turning 30, loves mountain treks, started a new company...'
            }
            value={context}
            onChange={(e) => setContext(e.target.value)}
            maxLength={200}
            className="border-zinc-300 dark:border-zinc-700 placeholder:text-zinc-400"
          />
          <p className="text-[11px] text-zinc-500">
            {t.contextHint}
          </p>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full text-base font-semibold py-3.5 h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 transition-all"
        >
          {isLoading ? (
            <div className="flex items-center gap-2.5">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white dark:border-zinc-900 border-t-transparent" />
              <span>Weaving Your 3 Wishes...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>
                {language === 'hi'
                  ? '3 खास शुभकामनाएं बनाएं'
                  : language === 'gu'
                  ? '3 સુંદર શુભેચ્છાઓ બનાવો'
                  : 'Generate 3 Beautiful Wishes'}
              </span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};
