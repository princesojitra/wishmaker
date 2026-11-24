import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
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
          ? 'कृपया नाम लिखें'
          : language === 'gu'
          ? 'કૃપા કરીને નામ લખો'
          : 'Please enter a name'
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
          {language === 'hi'
            ? '2. विवरण दर्ज करें'
            : language === 'gu'
            ? '2. વિગત પસંદ કરો'
            : '2. Personalize Details'}
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Recipient Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {language === 'hi'
                ? 'नाम (Name) *'
                : language === 'gu'
                ? 'નામ (Name) *'
                : 'Recipient Name *'}
            </label>
            <Input
              type="text"
              placeholder={
                language === 'hi'
                  ? 'उदा. रोहन, सिमरन...'
                  : language === 'gu'
                  ? 'દા.ત. રોહન, પ્રિયંકા...'
                  : 'e.g. Maya, Rohan, Mom'
              }
              value={recipientName}
              onChange={(e) => {
                setRecipientName(e.target.value);
                if (validationError) setValidationError('');
              }}
              className={validationError ? 'border-red-500' : ''}
              maxLength={60}
            />
            {validationError && (
              <p className="text-[11px] text-red-500">{validationError}</p>
            )}
          </div>

          {/* Relationship */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {language === 'hi'
                ? 'संबंध (Relationship)'
                : language === 'gu'
                ? 'સંબંધ (Relationship)'
                : 'Relationship'}
            </label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus-visible:outline-none focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 shadow-xs"
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
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {language === 'hi'
              ? 'भाषा (Language)'
              : language === 'gu'
              ? 'ભાષા (Language)'
              : 'Language'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => onLanguageChange(lang.id)}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-medium border transition-all ${
                  language === lang.id
                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{lang.native}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tone Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {language === 'hi'
              ? 'टोन / अंदाज़ (Tone)'
              : language === 'gu'
              ? 'ટોન / અંદાજ (Tone)'
              : 'Tone'}
          </label>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
            {TONES.map((t) => {
              const isSelected = tone === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-center border text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span>{t.emoji}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Context Accordion */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            <span>{showAdvanced ? 'Hide note' : '+ Add custom note or inside joke (Optional)'}</span>
            {showAdvanced ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-2 animate-fade-in">
              <Textarea
                rows={2}
                placeholder={
                  language === 'hi'
                    ? 'उदा. चाय का शौकीन है, 30 साल पूरे हुए...'
                    : language === 'gu'
                    ? 'દા.ત. ચા નો શોખીન છે, ૩૦ વર્ષ પૂરા થયા...'
                    : 'e.g. Loves chai, turning 30, loves mountain treks...'
                }
                value={context}
                onChange={(e) => setContext(e.target.value)}
                maxLength={200}
              />
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full text-sm font-medium py-3 rounded-xl shadow-xs"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white dark:border-zinc-900 border-t-transparent" />
              <span>Generating wishes...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>Generate 3 Wishes</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};
