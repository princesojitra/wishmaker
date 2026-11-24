import React, { useState } from 'react';
import { Sparkles, Heart, ChevronDown, ChevronUp, User, Globe, MessageSquare } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { RELATIONSHIPS, TONES, LANGUAGES } from '../data/occasions';
import { WishRequest, Language, Tone } from '../types/wish';

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
  const [tone, setTone] = useState<Tone>('heartfelt');
  const [context, setContext] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) {
      setValidationError(
        language === 'hi'
          ? 'कृपया जिसके लिए शुभकामना चाहिए, उनका नाम लिखें'
          : language === 'gu'
          ? 'કૃપા કરીને જેમના માટે શુભેચ્છા જોઈએ છે તેમનું નામ લખો'
          : 'Please enter the recipient’s name'
      );
      return;
    }
    setValidationError('');

    onSubmit({
      occasion: selectedOccasion,
      recipientName: recipientName.trim(),
      relationship,
      tone,
      language,
      context: context.trim(),
    });
  };

  const getRelationshipLabel = (rel: typeof RELATIONSHIPS[0]) => {
    if (language === 'hi') return rel.labelHi;
    if (language === 'gu') return rel.labelGu;
    return rel.label;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 2: Recipient Information */}
      <div className="space-y-4 rounded-2xl border border-festive-200/70 bg-white/70 p-4 sm:p-6 shadow-xs backdrop-blur-sm dark:bg-slate-900/60 dark:border-slate-800">
        <div className="flex items-center justify-between border-b border-festive-100 pb-3 dark:border-slate-800">
          <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-festive-100 text-[11px] font-bold text-festive-700">
              2
            </span>
            <span>
              {language === 'hi'
                ? 'किसके लिए है यह शुभकामना? (Recipient Details)'
                : language === 'gu'
                ? 'કોના માટે છે આ શુભેચ્છા? (Recipient Details)'
                : 'Who is this wish for?'}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Recipient Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-festive-500" />
              <span>
                {language === 'hi'
                  ? 'नाम (Recipient Name) *'
                  : language === 'gu'
                  ? 'નામ (Recipient Name) *'
                  : 'Recipient Name *'}
              </span>
            </label>
            <Input
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
                if (validationError) setValidationError('');
              }}
              className={validationError ? 'border-rose-400 focus-visible:ring-rose-400' : ''}
              maxLength={60}
            />
            {validationError && (
              <p className="text-xs text-rose-500 font-medium">{validationError}</p>
            )}
          </div>

          {/* Relationship */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>
                {language === 'hi'
                  ? 'रिश्ता / संबंध (Relationship)'
                  : language === 'gu'
                  ? 'સંબંધ (Relationship)'
                  : 'Relationship'}
              </span>
            </label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-festive-200 bg-white/80 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festive-400 dark:bg-slate-900 dark:border-slate-700 shadow-xs"
            >
              {RELATIONSHIPS.map((rel) => (
                <option key={rel.id} value={rel.id}>
                  {getRelationshipLabel(rel)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-medium text-foreground flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {language === 'hi'
                ? 'शुभकामना की भाषा (Language)'
                : language === 'gu'
                ? 'શુભેચ્છાની ભાષા (Language)'
                : 'Wish Language'}
            </span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => onLanguageChange(lang.id)}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-medium border transition-all ${
                  language === lang.id
                    ? 'border-festive-500 bg-festive-50 text-festive-900 font-semibold shadow-xs dark:bg-festive-950/60 dark:text-festive-200'
                    : 'border-festive-200/70 bg-white/60 text-muted-foreground hover:bg-festive-50/40 hover:text-foreground dark:bg-slate-900/40 dark:border-slate-800'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.native}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tone Selector */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-medium text-foreground flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-festive-500" />
            <span>
              {language === 'hi'
                ? 'शुभकामना का अंदाज़ / टोन (Tone of Wish)'
                : language === 'gu'
                ? 'શુભેચ્છાનો અંદાજ / ટોન (Tone of Wish)'
                : 'Tone of Wish'}
            </span>
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {TONES.map((t) => {
              const isSelected = tone === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-center border transition-all ${
                    isSelected
                      ? 'border-festive-500 bg-festive-100/90 text-festive-900 font-semibold shadow-xs dark:bg-festive-950/80 dark:text-festive-200'
                      : 'border-festive-200/60 bg-white/60 text-muted-foreground hover:bg-festive-50/50 hover:text-foreground dark:bg-slate-900/40 dark:border-slate-800'
                  }`}
                >
                  <span className="text-lg mb-0.5">{t.emoji}</span>
                  <span className="text-xs">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsible Custom Context */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs font-medium text-festive-700 hover:text-festive-800 dark:text-festive-400 transition-colors"
          >
            <span>{showAdvanced ? 'Hide' : '+ Add'} special memory or inside joke (Optional)</span>
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-3 space-y-1.5 animate-fade-in">
              <Textarea
                rows={2}
                placeholder={
                  language === 'hi'
                    ? 'जैसे: वह चाय का शौकीन है, 30 साल का हो रहा है, हाल ही में नई नौकरी शुरू की है...'
                    : language === 'gu'
                    ? 'જેમ કે: ચા નો શોખીન છે, ૩૦ વર્ષ પૂરા થયા, નવી નોકરી શરૂ કરી...'
                    : 'e.g. Loves chai, turning 30, loves mountain treks, started a new company...'
                }
                value={context}
                onChange={(e) => setContext(e.target.value)}
                maxLength={200}
              />
              <p className="text-[11px] text-muted-foreground">
                Adding unique details makes the wish feel deeply personal and authentic.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="text-center pt-1">
        <Button
          type="submit"
          variant="festive"
          size="lg"
          disabled={isLoading}
          className="w-full sm:w-auto sm:min-w-[320px] shadow-lg shadow-festive-500/20 text-base py-3.5 px-8"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Weaving Magic...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>
                {language === 'hi'
                  ? '✨ 3 खास शुभकामनाएं बनाएं'
                  : language === 'gu'
                  ? '✨ 3 સુંદર શુભેચ્છાઓ બનાવો'
                  : '✨ Generate 3 Beautiful Wishes'}
              </span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};
