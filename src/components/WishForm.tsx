import React, { useState, useRef } from 'react';
import { Sparkles, AlertCircle, ChevronDown } from 'lucide-react';
import { RELATIONSHIPS, TONES, LANGUAGES } from '../data/occasions';
import { WishRequest, Language, Tone } from '../types/wish';
import { Input } from './ui/input';

interface WishFormProps {
  selectedOccasion: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSubmit: (data: WishRequest) => void;
  isLoading: boolean;
}

export const WishForm: React.FC<WishFormProps> = ({
  selectedOccasion,
  language,
  onLanguageChange,
  onSubmit,
  isLoading,
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [relationship, setRelationship] = useState('friend');
  const [selectedTone, setSelectedTone] = useState<string>('heartfelt');
  const [customToneText, setCustomToneText] = useState('');
  const [context, setContext] = useState('');
  const [nameError, setNameError] = useState('');
  const [customToneError, setCustomToneError] = useState('');
  const [shakeField, setShakeField] = useState<'name' | 'tone' | null>(null);

  const recipientInputRef = useRef<HTMLInputElement>(null);
  const customToneInputRef = useRef<HTMLInputElement>(null);

  const triggerShake = (field: 'name' | 'tone') => {
    setShakeField(field);
    setTimeout(() => {
      setShakeField(null);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientName.trim()) {
      const msg =
        language === 'hi'
          ? 'कृपया पात्र का नाम लिखें'
          : language === 'gu'
          ? 'કૃપા કરીને નામ દાખલ કરો'
          : 'Please enter recipient name';
      setNameError(msg);
      triggerShake('name');
      recipientInputRef.current?.focus();
      return;
    }
    setNameError('');

    if (selectedTone === 'custom' && !customToneText.trim()) {
      const msg =
        language === 'hi'
          ? 'कृपया अपना टोन लिखें'
          : language === 'gu'
          ? 'કૃપા કરીને ટોન લખો'
          : 'Please describe custom tone';
      setCustomToneError(msg);
      triggerShake('tone');
      customToneInputRef.current?.focus();
      return;
    }
    setCustomToneError('');

    const finalTone = (selectedTone === 'custom' && customToneText.trim()
      ? customToneText.trim()
      : selectedTone) as Tone;

    onSubmit({
      occasion: selectedOccasion,
      recipientName: recipientName.trim(),
      relationship,
      tone: finalTone,
      tones: [finalTone],
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
      recipientLabel: "Recipient's Name",
      recipientPlaceholder: 'e.g. Neha, Aarav, Mom, Dr. Sharma',
      relLabel: 'Your Relationship',
      langLabel: 'Language',
      toneLabel: 'Tone / Style',
      contextLabel: 'Personal Message (Optional)',
      contextPlaceholder: 'e.g. She loves travel, started a new job in design, loves coffee and cats...',
      contextHint: 'Add an inside joke, shared memory, or personal achievement to make the wish uniquely theirs.',
      submitBtn: '✨ Generate Wishes',
      loadingBtn: 'Composing with Gemini AI...',
    },
    hi: {
      recipientLabel: 'पात्र का नाम',
      recipientPlaceholder: 'उदा. रोहन, सिमरन, मम्मी, राहुल...',
      relLabel: 'आपका संबंध / रिश्ता',
      langLabel: 'भाषा',
      toneLabel: 'टोन / अंदाज़',
      contextLabel: 'विशेष संस्मरण / संदर्भ (वैकल्पिक)',
      contextPlaceholder: 'उदा. उन्हें चाय और किताबें पसंद हैं, अभी नई नौकरी शुरू की है...',
      contextHint: 'कोई खास बात या अंदरूनी मज़ाक जोड़ें जिससे शुभकामना और आत्मीय बने।',
      submitBtn: '✨ शुभकामनाएं बनाएं',
      loadingBtn: 'एआई द्वारा तैयार किया जा रहा है...',
    },
    gu: {
      recipientLabel: 'નામ',
      recipientPlaceholder: 'દા.ત. રોહન, પ્રિયંકા, મમ્મી, અર્જુન...',
      relLabel: 'સંબંધ',
      langLabel: 'ભાષા',
      toneLabel: 'ટોન / અંદાજ',
      contextLabel: 'ખાસ સ્મરણ / સંદર્ભ (વૈકલ્પિક)',
      contextPlaceholder: 'દા.ત. તેમને પ્રવાસ ગમે છે, તાજેતરમાં નવો પ્રોજેક્ટ શરૂ કર્યો છે...',
      contextHint: 'કોઈ યાદગાર વાત કે સ્મરણ ઉમેરો જેથી શુભેચ્છા વધુ સ્નેહસભર બને.',
      submitBtn: '✨ શુભેચ્છાઓ બનાવો',
      loadingBtn: 'AI દ્વારા રચાઈ રહ્યું છે...',
    },
  };

  const t = sectionText[language] || sectionText.en;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 2 Fields Per Row Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Row 1, Col 1: Recipient Name */}
        <div className="space-y-2">
          <label className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
            <span>
              {t.recipientLabel} <span className="text-rose-500 font-bold">*</span>
            </span>
          </label>
          <div className={shakeField === 'name' ? 'animate-shake' : ''}>
            <Input
              ref={recipientInputRef}
              type="text"
              placeholder={t.recipientPlaceholder}
              value={recipientName}
              onChange={(e) => {
                setRecipientName(e.target.value);
                if (nameError) setNameError('');
              }}
              className={`h-12 text-sm sm:text-base rounded-xl border-zinc-200/90 bg-zinc-50/60 hover:bg-white focus:bg-white dark:bg-zinc-900/80 dark:border-zinc-700/80 transition-all ${
                nameError
                  ? 'border-red-500 ring-2 ring-red-500/20 dark:border-red-400'
                  : 'focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15'
              }`}
              maxLength={60}
            />
          </div>
          {nameError && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1.5 pt-0.5 animate-fade-in whitespace-nowrap">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{nameError}</span>
            </p>
          )}
        </div>

        {/* Row 1, Col 2: Relationship Dropdown */}
        <div className="space-y-2">
          <label className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 block">
            {t.relLabel}
          </label>
          <div className="relative">
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="flex h-12 w-full appearance-none rounded-xl border border-zinc-200/90 bg-zinc-50/60 hover:bg-white focus:bg-white pl-4 pr-10 py-2.5 text-sm sm:text-base text-zinc-900 focus-visible:outline-none focus-visible:border-violet-600 focus-visible:ring-2 focus-visible:ring-violet-600/15 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100 cursor-pointer shadow-2xs transition-all"
            >
              {RELATIONSHIPS.map((rel) => (
                <option key={rel.id} value={rel.id}>
                  {getRelationshipLabel(rel)}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          </div>
        </div>

        {/* Row 2, Col 1: Language Dropdown */}
        <div className="space-y-2">
          <label className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 block">
            {t.langLabel}
          </label>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="flex h-12 w-full appearance-none rounded-xl border border-zinc-200/90 bg-zinc-50/60 hover:bg-white focus:bg-white pl-4 pr-10 py-2.5 text-sm sm:text-base text-zinc-900 focus-visible:outline-none focus-visible:border-violet-600 focus-visible:ring-2 focus-visible:ring-violet-600/15 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100 cursor-pointer shadow-2xs transition-all"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.flag} {lang.native}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          </div>
        </div>

        {/* Row 2, Col 2: Tone / Style Dropdown */}
        <div className="space-y-2">
          <label className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 block">
            {t.toneLabel}
          </label>
          <div className="relative">
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="flex h-12 w-full appearance-none rounded-xl border border-zinc-200/90 bg-zinc-50/60 hover:bg-white focus:bg-white pl-4 pr-10 py-2.5 text-sm sm:text-base text-zinc-900 focus-visible:outline-none focus-visible:border-violet-600 focus-visible:ring-2 focus-visible:ring-violet-600/15 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100 cursor-pointer shadow-2xs transition-all"
            >
              {TONES.map((toneItem) => (
                <option key={toneItem.id} value={toneItem.id}>
                  {toneItem.emoji} {getToneLabel(toneItem)}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          </div>
        </div>
      </div>

      {/* Custom Tone Input if selected */}
      {selectedTone === 'custom' && (
        <div className={`space-y-1.5 animate-fade-in ${shakeField === 'tone' ? 'animate-shake' : ''}`}>
          <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
            {language === 'hi'
              ? 'अपना कस्टम टोन लिखें'
              : language === 'gu'
              ? 'તમારો કસ્ટમ ટોન લખો'
              : 'Describe Your Custom Tone'}
            <span className="text-violet-600 dark:text-violet-400 ml-1 font-bold">*</span>
          </label>
          <Input
            ref={customToneInputRef}
            type="text"
            placeholder="e.g. Shakespearean drama, Bollywood retro, Zen & calming..."
            value={customToneText}
            onChange={(e) => {
              setCustomToneText(e.target.value);
              if (customToneError) setCustomToneError('');
            }}
            className="h-11 text-sm rounded-xl"
            maxLength={60}
          />
          {customToneError && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
              {customToneError}
            </p>
          )}
        </div>
      )}

      {/* Personal Message (Optional) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 block">
            {t.contextLabel}
          </label>
          <span className="text-xs text-zinc-400 font-mono">
            {context.length}/200
          </span>
        </div>

        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder={t.contextPlaceholder}
          maxLength={200}
          rows={3}
          className="w-full rounded-2xl border border-zinc-200/90 bg-zinc-50/60 hover:bg-white focus:bg-white p-4 text-sm sm:text-base text-zinc-900 focus-visible:outline-none focus-visible:border-violet-600 focus-visible:ring-2 focus-visible:ring-violet-600/15 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100 resize-none shadow-2xs transition-all"
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {t.contextHint}
        </p>
      </div>

      {/* Primary Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-2.5 rounded-full py-4 px-6 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:opacity-95 shadow-md shadow-violet-500/25 hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>{t.loadingBtn}</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              <span>{t.submitBtn}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
