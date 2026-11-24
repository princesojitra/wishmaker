import React, { useState } from 'react';
import { Copy, Check, MessageCircle, Edit3, RotateCcw } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Wish, Language } from '../types/wish';

interface WishCardProps {
  wish: Wish;
  index: number;
  language: Language;
  onCopy: (text: string) => void;
  onShareWhatsApp: (text: string) => void;
}

export const WishCard: React.FC<WishCardProps> = ({
  wish,
  index,
  language,
  onCopy,
  onShareWhatsApp,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(wish.content);

  const handleCopy = () => {
    onCopy(editedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleWhatsApp = () => {
    onShareWhatsApp(editedContent);
  };

  const handleReset = () => {
    setEditedContent(wish.content);
    setIsEditing(false);
  };

  // Language styling class
  const langClass =
    language === 'hi' ? 'lang-hi' : language === 'gu' ? 'lang-gu' : 'font-sans';

  // Badge styles based on card index
  const badgeVariants: ('festive' | 'warm' | 'secondary')[] = [
    'festive',
    'warm',
    'secondary',
  ];
  const badgeVariant = badgeVariants[index % badgeVariants.length];

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border border-festive-200/80 bg-white shadow-xs hover:border-festive-300 hover:shadow-md transition-all duration-300 dark:bg-slate-900/80 dark:border-slate-800">
      {/* Decorative top accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-festive-400 via-rose-400 to-amber-400" />

      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant={badgeVariant} className="text-xs font-semibold px-2.5 py-1">
            <span className="mr-1">{wish.toneEmoji || '✨'}</span>
            <span>{wish.style}</span>
          </Badge>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-festive-600 dark:hover:text-festive-400 transition-colors"
            title="Edit text before sharing"
          >
            <Edit3 className="w-3 h-3" />
            <span>{isEditing ? 'Done' : 'Tweak'}</span>
          </button>
        </div>

        <h4 className="text-sm font-semibold text-foreground tracking-tight pt-2 line-clamp-1">
          {wish.title}
        </h4>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={`w-full rounded-xl border border-festive-300 bg-festive-50/30 p-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-festive-400 min-h-[140px] ${langClass} dark:bg-slate-800`}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to original</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`whitespace-pre-line text-sm text-slate-700 leading-relaxed dark:text-slate-200 ${langClass} min-h-[100px]`}
          >
            {editedContent}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-5 pt-2 border-t border-festive-100/80 bg-festive-50/30 dark:bg-slate-900/40 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <span className="text-[11px] text-muted-foreground">
          {editedContent.length} chars
        </span>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={`flex-1 sm:flex-none text-xs gap-1.5 transition-all ${
              copied
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold'
                : 'border-festive-200 hover:bg-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </Button>

          {/* WhatsApp Direct Share Button */}
          <Button
            type="button"
            size="sm"
            onClick={handleWhatsApp}
            className="flex-1 sm:flex-none text-xs gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xs font-semibold"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-current" />
            <span>WhatsApp</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
