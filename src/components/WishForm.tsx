import React, { useState, useRef } from 'react';
import { Sparkles, AlertCircle, Check, X, Wand2, ArrowRight, ArrowLeft } from 'lucide-react';
import { OCCASIONS, RELATIONSHIPS, TONES, LANGUAGES } from '../data/occasions';
import { WishRequest, Language, Tone } from '../types/wish';
import { Input } from './ui/input';

interface WishFormProps {
  selectedOccasion: string;
  onSelectOccasion: (id: string) => void;
  customOccasionText?: string;
  onCustomOccasionChange?: (text: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSubmit: (data: WishRequest) => void;
  isLoading: boolean;
}

const MEMORY_SPARKS = [
  { id: 'coffee', label: '☕ Coffee Addict', labelHi: '☕ कॉफ़ी लवर', labelGu: '☕ કોફી પ્રેમી' },
  { id: 'travel', label: '✈️ Loves Travel', labelHi: '✈️ घुमक्कड़', labelGu: '✈️ પ્રવાસના શોખીન' },
  { id: 'new_job', label: '💼 New Job / Career', labelHi: '💼 नई नौकरी', labelGu: '💼 નવી નોકરી / કરિયર' },
  { id: 'milestone', label: '🎂 Milestone Year', labelHi: '🎂 यादगार साल', labelGu: '🎂 ખાસ યાદગાર વર્ષ' },
  { id: 'foodie', label: '🍕 Foodie at Heart', labelHi: '🍕 पक्के फूडी', labelGu: '🍕 ખાવાના શોખીન' },
  { id: 'pet_parent', label: '🐾 Pet Parent', labelHi: '🐾 पेट लवर', labelGu: '🐾 પેટ લવર' },
  { id: 'fitness', label: '🏋️ Fitness Freak', labelHi: '🏋️ जिम लवर', labelGu: '🏋️ ફિટનેસ પ્રેમી' },
  { id: 'music', label: '🎧 Music & Vibes', labelHi: '🎧 म्यूज़िक लवर', labelGu: '🎧 સંગીત પ્રેમી' },
  { id: 'party', label: '🎉 Life of the Party', labelHi: '🎉 महफ़िल की जान', labelGu: '🎉 દરેક મહેફિલની શાન' },
  { id: 'grateful', label: '❤️ Forever Grateful', labelHi: '❤️ दिल से आभारी', labelGu: '❤️ કાયમ માટે આભારી' },
];

export const WishForm: React.FC<WishFormProps> = ({
  selectedOccasion,
  onSelectOccasion,
  customOccasionText = '',
  onCustomOccasionChange,
  language,
  onLanguageChange,
  onSubmit,
  isLoading,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [recipientName, setRecipientName] = useState('');
  const [relationship, setRelationship] = useState('friend');
  const [selectedTone, setSelectedTone] = useState<string>('heartfelt');
  const [customToneText, setCustomToneText] = useState('');
  const [selectedSparks, setSelectedSparks] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState('');
  const [showCustomNotes, setShowCustomNotes] = useState(false);
  const [nameError, setNameError] = useState('');
  const [customToneError, setCustomToneError] = useState('');
  const [customOccasionError, setCustomOccasionError] = useState('');
  const [shakeField, setShakeField] = useState<'name' | 'tone' | 'occasion' | null>(null);

  const recipientInputRef = useRef<HTMLInputElement>(null);
  const customToneInputRef = useRef<HTMLInputElement>(null);
  const customOccasionInputRef = useRef<HTMLInputElement>(null);

  const triggerShake = (field: 'name' | 'tone' | 'occasion') => {
    setShakeField(field);
    setTimeout(() => {
      setShakeField(null);
    }, 500);
  };

  const toggleSpark = (sparkLabel: string) => {
    setSelectedSparks((prev) =>
      prev.includes(sparkLabel)
        ? prev.filter((s) => s !== sparkLabel)
        : [...prev, sparkLabel]
    );
  };

  // Step 1 Validation & Next
  const handleStep1Next = () => {
    if (selectedOccasion === 'custom' && !customOccasionText.trim()) {
      setCustomOccasionError(
        language === 'hi'
          ? 'कृपया अवसर का नाम लिखें'
          : language === 'gu'
          ? 'કૃપા કરીને પ્રસંગનું નામ લખો'
          : 'Please enter your custom occasion'
      );
      triggerShake('occasion');
      customOccasionInputRef.current?.focus();
      return;
    }
    setCustomOccasionError('');
    setStep(2);
  };

  // Step 2 Validation & Next
  const handleStep2Next = () => {
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
    setStep(3);
  };

  // Final Submit on Step 3
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientName.trim()) {
      setStep(2);
      setNameError('Please enter recipient name');
      return;
    }

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

    const sparkText = selectedSparks.join(', ');
    const mergedContext = [sparkText, customNotes.trim()].filter(Boolean).join('. ');

    onSubmit({
      occasion: selectedOccasion === 'custom' && customOccasionText.trim() ? customOccasionText.trim() : selectedOccasion,
      recipientName: recipientName.trim(),
      relationship,
      tone: finalTone,
      tones: [finalTone],
      language,
      context: mergedContext,
    });
  };

  const getLocalizedTitle = (occ: typeof OCCASIONS[0]) => {
    if (language === 'hi') return occ.titleHi;
    if (language === 'gu') return occ.titleGu;
    return occ.title;
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

  const getSparkLabel = (spark: typeof MEMORY_SPARKS[0]) => {
    if (language === 'hi') return spark.labelHi;
    if (language === 'gu') return spark.labelGu;
    return spark.label;
  };

  const currentToneObj = TONES.find((t) => t.id === selectedTone) || TONES[0];
  const currentRelObj = RELATIONSHIPS.find((r) => r.id === relationship) || RELATIONSHIPS[0];
  const primaryOccasions = OCCASIONS.filter((o) => o.id !== 'custom').slice(0, 8);
  const isCustomActive = selectedOccasion === 'custom';

  const content = {
    en: {
      step1Title: 'What are we celebrating?',
      step1Sub: 'Select an occasion or specify your own custom event',
      step2Title: 'Who is this special wish for?',
      step2Sub: 'Enter their name and how you are connected to them',
      recipientPlaceholder: 'e.g. Neha, Aarav, Mom, Dr. Sharma...',
      relLabel: 'Your Relationship',
      step3Title: 'Choose the Vibe & Personality',
      step3Sub: 'Pick a tone and tap personality sparks to make it uniquely theirs',
      toneLabel: 'Tone / Style',
      sparksLabel: 'Tap to add their vibe or memories:',
      addCustomNoteBtn: '+ Add a personal note or inside joke',
      customNotePlaceholder: 'e.g. That hilarious road trip, late night Maggi, always losing keys...',
      langLabel: 'Language',
      customOccasionPlaceholder: 'What are you celebrating? (e.g. Housewarming, First Marathon...)',
      customLabel: 'Custom Event',
      continueBtn: 'Continue',
      backBtn: 'Back',
      submitBtn: '✨ Generate Wishes',
      loadingBtn: 'Composing with Gemini AI...',
      recipePrefix: 'Crafting',
      recipeFor: 'for',
      recipeIn: 'in',
      recipeWith: 'with vibes',
    },
    hi: {
      step1Title: 'आप क्या मना रहे हैं?',
      step1Sub: 'अवसर चुनें या अपना विशेष कार्यक्रम लिखें',
      step2Title: 'यह शुभकामना किसके लिए है?',
      step2Sub: 'उनका नाम लिखें और अपना रिश्ता चुनें',
      recipientPlaceholder: 'उदा. रोहन, सिमरन, मम्मी, राहुल...',
      relLabel: 'आपका रिश्ता',
      step3Title: 'अंदाज़ व खास यादें चुनें',
      step3Sub: 'टोन चुनें और उनकी पसंद के टैग जोड़ें',
      toneLabel: 'टोन / अंदाज़',
      sparksLabel: 'उनकी पसंद व संस्मरण (टैप करें):',
      addCustomNoteBtn: '+ कोई अंदरूनी बात या खास याद जोड़ें',
      customNotePlaceholder: 'उदा. गोवा ट्रिप की मस्ती, देर रात की चाय, हमेशा चाबी भूल जाना...',
      langLabel: 'भाषा',
      customOccasionPlaceholder: 'आप क्या मना रहे हैं? (उदा. गृह प्रवेश, मैराथन, नई कार...)',
      customLabel: 'अन्य अवसर',
      continueBtn: 'आगे बढ़ें',
      backBtn: 'पीछे',
      submitBtn: '✨ शुभकामनाएं बनाएं',
      loadingBtn: 'एआई द्वारा तैयार किया जा रहा है...',
      recipePrefix: 'तैयार कर रहे हैं',
      recipeFor: 'के लिए',
      recipeIn: 'में',
      recipeWith: 'के साथ',
    },
    gu: {
      step1Title: 'તમે શું ઉજવી રહ્યા છો?',
      step1Sub: 'અવસર પસંદ કરો અથવા તમારો પોતાનો પ્રસંગ લખો',
      step2Title: 'આ ખાસ શુભેચ્છા કોના માટે છે?',
      step2Sub: 'તેમનું નામ દાખલ કરો અને સંબંધ પસંદ કરો',
      recipientPlaceholder: 'દા.ત. રોહન, પ્રિયંકા, મમ્મી, અર્જુન...',
      relLabel: 'તમારો સંબંધ',
      step3Title: 'ટોન અને અનોખો અંદાજ પસંદ કરો',
      step3Sub: 'ટોન પસંદ કરો અને તેમની ખાસિયતો ઉમેરો',
      toneLabel: 'ટોન / અંદાજ',
      sparksLabel: 'તેમનો સ્નેહ અને યાદો (ટેપ કરો):',
      addCustomNoteBtn: '+ કોઈ ખાસ સ્મરણ કે અંદરની વાત ઉમેરો',
      customNotePlaceholder: 'દા.ત. ગોવા પ્રવાસની યાદ, મોડી રાતની ચા, હંમેશા ચાવી ભૂલી જવી...',
      langLabel: 'ભાષા',
      customOccasionPlaceholder: 'તમે શું ઉજવી રહ્યા છો? (દા.ત. ગૃહ પ્રવેશ, મેરેથોન, નવી કાર...)',
      customLabel: 'અન્ય પ્રસંગ',
      continueBtn: 'આગળ વધો',
      backBtn: 'પાછળ',
      submitBtn: '✨ શુભેચ્છાઓ બનાવો',
      loadingBtn: 'AI દ્વારા રચાઈ રહ્યું છે...',
      recipePrefix: 'તૈયાર થઈ રહી છે',
      recipeFor: 'માટે',
      recipeIn: 'માં',
      recipeWith: 'સાથે',
    },
  };

  const t = content[language] || content.en;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ─── INTUITIVE STEP PROGRESS INDICATOR ─── */}
      <div className="space-y-3 pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center justify-between text-xs">
          {/* Step Pill & Label */}
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[11px] font-bold text-white shadow-2xs">
              {step}
            </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-wider text-[11px]">
              {step === 1 && (language === 'hi' ? 'चरण 1: अवसर' : language === 'gu' ? 'પગલું 1: અવસર' : 'Step 1: Occasion')}
              {step === 2 && (language === 'hi' ? 'चरण 2: पात्र' : language === 'gu' ? 'પગલું 2: પાત્ર' : 'Step 2: Recipient')}
              {step === 3 && (language === 'hi' ? 'चरण 3: अंदाज़' : language === 'gu' ? 'પગલું 3: અંદાજ' : 'Step 3: Vibe & Style')}
            </span>
          </div>

          {/* Interactive Step Switchers / Counter */}
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer ${step === 1 ? 'text-violet-600 dark:text-violet-400 font-bold' : ''}`}
            >
              1
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleStep1Next()}
              className={`hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer ${step === 2 ? 'text-violet-600 dark:text-violet-400 font-bold' : ''}`}
            >
              2
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                if (recipientName.trim()) setStep(3);
                else handleStep2Next();
              }}
              className={`hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer ${step === 3 ? 'text-violet-600 dark:text-violet-400 font-bold' : ''}`}
            >
              3
            </button>
          </div>
        </div>

        {/* 3-Segment Progress Bar */}
        <div className="grid grid-cols-3 gap-2 h-1.5 w-full">
          <div className={`h-full rounded-full transition-all duration-300 ${step >= 1 ? 'bg-gradient-to-r from-violet-600 to-purple-600' : 'bg-zinc-100 dark:bg-zinc-800'}`} />
          <div className={`h-full rounded-full transition-all duration-300 ${step >= 2 ? 'bg-gradient-to-r from-violet-600 to-purple-600' : 'bg-zinc-100 dark:bg-zinc-800'}`} />
          <div className={`h-full rounded-full transition-all duration-300 ${step >= 3 ? 'bg-gradient-to-r from-violet-600 to-purple-600' : 'bg-zinc-100 dark:bg-zinc-800'}`} />
        </div>
      </div>

      {/* ─── STEP 1: CHOOSE OCCASION ─── */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              {t.step1Title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {t.step1Sub}
            </p>
          </div>

          {/* Symmetrical 3x3 Tile Grid (2-col on Mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1">
            {primaryOccasions.map((occ) => {
              const isSelected = selectedOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => onSelectOccasion(occ.id)}
                  className={`flex items-center gap-2.5 px-3 sm:px-3.5 h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer select-none text-left border ${
                    isSelected
                      ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-500/25 ring-2 ring-violet-400/30 transform -translate-y-0.5'
                      : 'bg-zinc-50/80 hover:bg-zinc-100/90 text-zinc-800 border-zinc-200/80 hover:border-zinc-300 dark:bg-zinc-900/60 dark:text-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800/80'
                  }`}
                >
                  <span className="text-base shrink-0 leading-none">{occ.icon}</span>
                  <span className="truncate flex-1">{getLocalizedTitle(occ)}</span>
                </button>
              );
            })}

            {/* Custom Celebration Tile */}
            <button
              type="button"
              onClick={() => onSelectOccasion('custom')}
              className={`col-span-2 sm:col-span-1 flex items-center gap-2.5 px-3 sm:px-3.5 h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer select-none text-left border ${
                isCustomActive
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-500/25 ring-2 ring-violet-400/30 transform -translate-y-0.5'
                  : 'bg-zinc-50/80 hover:bg-zinc-100/90 text-zinc-800 border-zinc-200/80 hover:border-zinc-300 dark:bg-zinc-900/60 dark:text-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800/80'
              }`}
            >
              <span className="text-base shrink-0 leading-none">✍️</span>
              <span className="truncate flex-1">
                {customOccasionText && isCustomActive ? customOccasionText : t.customLabel}
              </span>
            </button>
          </div>

          {/* In-place Custom Occasion Input */}
          {isCustomActive && (
            <div className={`pt-2 animate-fade-in ${shakeField === 'occasion' ? 'animate-shake' : ''}`}>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-zinc-400 text-sm">✍️</span>
                <Input
                  ref={customOccasionInputRef}
                  type="text"
                  placeholder={t.customOccasionPlaceholder}
                  value={customOccasionText}
                  onChange={(e) => {
                    onCustomOccasionChange?.(e.target.value);
                    if (customOccasionError) setCustomOccasionError('');
                  }}
                  className="h-12 pl-10 pr-10 rounded-xl text-sm sm:text-base border-zinc-200/90 bg-zinc-50/60 hover:bg-white focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 dark:bg-zinc-900/80 dark:border-zinc-700/80 transition-all"
                  maxLength={60}
                  autoFocus
                />
                {customOccasionText && (
                  <button
                    type="button"
                    onClick={() => onCustomOccasionChange?.('')}
                    className="absolute right-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 cursor-pointer"
                    title="Clear"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {customOccasionError && (
                <p className="text-xs text-red-600 dark:text-red-400 font-medium pt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{customOccasionError}</span>
                </p>
              )}
            </div>
          )}

          {/* Step 1 Continue Action */}
          <div className="pt-3 flex justify-end">
            <button
              type="button"
              onClick={handleStep1Next}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-8 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 shadow-md shadow-violet-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t.continueBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── STEP 2: RECIPIENT & RELATIONSHIP & LANGUAGE ─── */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              {t.step2Title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {t.step2Sub}
            </p>
          </div>

          {/* Recipient Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
              <span>
                Recipient's Name <span className="text-rose-500 font-bold">*</span>
              </span>
            </label>
            <div className={shakeField === 'name' ? 'animate-shake' : ''}>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">👤</span>
                <Input
                  ref={recipientInputRef}
                  type="text"
                  placeholder={t.recipientPlaceholder}
                  value={recipientName}
                  onChange={(e) => {
                    setRecipientName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  className={`h-12 pl-10 pr-10 text-sm sm:text-base rounded-xl border-zinc-200/90 bg-zinc-50/70 hover:bg-white focus:bg-white dark:bg-zinc-900/80 dark:border-zinc-700/80 transition-all ${
                    nameError
                      ? 'border-red-500 ring-2 ring-red-500/20 dark:border-red-400'
                      : 'focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15'
                  }`}
                  maxLength={60}
                  autoFocus
                />
                {recipientName && (
                  <button
                    type="button"
                    onClick={() => setRecipientName('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 cursor-pointer"
                    title="Clear"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            {nameError && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1.5 pt-0.5 animate-fade-in whitespace-nowrap">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{nameError}</span>
              </p>
            )}
          </div>

          {/* Quick Relationship Pills */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
              {t.relLabel}
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {RELATIONSHIPS.map((rel) => {
                const isSelected = relationship === rel.id;
                return (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => setRelationship(rel.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer select-none border ${
                      isSelected
                        ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-500/20 ring-1 ring-violet-400/40'
                        : 'bg-zinc-50/80 hover:bg-zinc-100/90 text-zinc-700 border-zinc-200/80 dark:bg-zinc-900/60 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span>{getRelationshipLabel(rel)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1-Tap Language Toggle */}
          <div className="space-y-2 pt-1">
            <label className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
              {t.langLabel}
            </label>
            <div className="grid grid-cols-3 gap-2 max-w-sm">
              {LANGUAGES.map((lang) => {
                const isSelected = language === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => onLanguageChange(lang.id)}
                    className={`flex items-center justify-center gap-1.5 h-11 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer select-none border ${
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm dark:bg-white dark:text-zinc-900 dark:border-white'
                        : 'bg-zinc-50/80 hover:bg-zinc-100 text-zinc-700 border-zinc-200/80 dark:bg-zinc-900/60 dark:text-zinc-300 dark:border-zinc-800'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.native}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 Action Bar */}
          <div className="pt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 cursor-pointer transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleStep2Next}
              className="inline-flex items-center justify-center gap-2 rounded-full py-3 px-7 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 shadow-md shadow-violet-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t.continueBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── STEP 3: VIBE, PERSONALITY & GENERATE ─── */}
      {step === 3 && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              {t.step3Title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {t.step3Sub}
            </p>
          </div>

          {/* Visual Tone Palette */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
              {t.toneLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TONES.map((toneItem) => {
                const isSelected = selectedTone === toneItem.id;
                return (
                  <button
                    key={toneItem.id}
                    type="button"
                    onClick={() => setSelectedTone(toneItem.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer select-none border text-left ${
                      isSelected
                        ? 'bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-500/25 ring-2 ring-violet-400/30'
                        : 'bg-zinc-50/80 hover:bg-zinc-100/90 text-zinc-800 border-zinc-200/80 dark:bg-zinc-900/60 dark:text-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span className="text-base shrink-0 leading-none">{toneItem.emoji}</span>
                    <span className="truncate flex-1">{getToneLabel(toneItem)}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 italic pt-0.5">
              ✨ {currentToneObj.emoji} {getToneLabel(currentToneObj)}: {currentToneObj.description}
            </p>

            {/* Custom Tone Input */}
            {selectedTone === 'custom' && (
              <div className={`space-y-1.5 animate-fade-in pt-1 ${shakeField === 'tone' ? 'animate-shake' : ''}`}>
                <Input
                  ref={customToneInputRef}
                  type="text"
                  placeholder="e.g. Shakespearean drama, Retro 90s Bollywood, Zen & meditative..."
                  value={customToneText}
                  onChange={(e) => {
                    setCustomToneText(e.target.value);
                    if (customToneError) setCustomToneError('');
                  }}
                  className="h-11 text-sm rounded-xl border-zinc-300 dark:border-zinc-700"
                  maxLength={60}
                  autoFocus
                />
                {customToneError && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    {customToneError}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Personality Sparks (Tap to Add) */}
          <div className="space-y-2 pt-1">
            <label className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
              {t.sparksLabel}
            </label>
            <div className="flex flex-wrap gap-2">
              {MEMORY_SPARKS.map((spark) => {
                const label = getSparkLabel(spark);
                const isSelected = selectedSparks.includes(label);
                return (
                  <button
                    key={spark.id}
                    type="button"
                    onClick={() => toggleSpark(label)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer select-none border ${
                      isSelected
                        ? 'bg-violet-100 text-violet-800 border-violet-400/80 dark:bg-violet-950/60 dark:text-violet-200 dark:border-violet-600 shadow-2xs ring-1 ring-violet-400/30'
                        : 'bg-zinc-50/80 hover:bg-zinc-100/90 text-zinc-700 border-zinc-200/80 dark:bg-zinc-900/60 dark:text-zinc-300 dark:border-zinc-800'
                    }`}
                  >
                    <span>{label}</span>
                    {isSelected && <Check className="w-3 h-3 text-violet-600 dark:text-violet-400 stroke-[3]" />}
                  </button>
                );
              })}
            </div>

            {/* Custom Memory Textarea Toggle */}
            {!showCustomNotes ? (
              <button
                type="button"
                onClick={() => setShowCustomNotes(true)}
                className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1 pt-1 cursor-pointer"
              >
                <span>{t.addCustomNoteBtn}</span>
              </button>
            ) : (
              <div className="space-y-1.5 animate-fade-in pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    Personal note or inside joke:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomNotes(false);
                      setCustomNotes('');
                    }}
                    className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    ✕ Cancel
                  </button>
                </div>
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder={t.customNotePlaceholder}
                  maxLength={200}
                  rows={2}
                  className="w-full rounded-xl border border-zinc-200/90 bg-zinc-50/70 hover:bg-white focus:bg-white p-3 text-xs sm:text-sm text-zinc-900 focus-visible:outline-none focus-visible:border-violet-600 focus-visible:ring-1 focus-visible:ring-violet-600/20 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100 resize-none transition-all"
                />
              </div>
            )}
          </div>

          {/* Live Recipe Blueprint Preview */}
          <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-3.5 dark:border-violet-900/40 dark:bg-violet-950/20 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5 animate-pulse" />
            <p className="leading-relaxed">
              {t.recipePrefix}{' '}
              <strong className="text-violet-700 dark:text-violet-300 font-bold">
                {getToneLabel(currentToneObj)}
              </strong>{' '}
              wishes {t.recipeFor}{' '}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {recipientName.trim() || 'your loved one'}
              </strong>{' '}
              ({getRelationshipLabel(currentRelObj)}) {t.recipeIn}{' '}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {LANGUAGES.find((l) => l.id === language)?.native || 'English'}
              </strong>
              {selectedSparks.length > 0 && (
                <span>
                  {' '}
                  {t.recipeWith}:{' '}
                  <span className="text-violet-700 dark:text-violet-300 font-medium">
                    {selectedSparks.join(', ')}
                  </span>
                </span>
              )}
              . ✨
            </p>
          </div>

          {/* Step 3 Action Bar */}
          <div className="pt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 cursor-pointer transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backBtn}</span>
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2.5 rounded-full py-3.5 px-8 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:opacity-95 shadow-md shadow-violet-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>{t.loadingBtn}</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  <span>{t.submitBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};
