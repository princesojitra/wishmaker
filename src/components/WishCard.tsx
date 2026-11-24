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
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    onShareWhatsApp(editedContent);
  };

  const handleReset = () => {
    setEditedContent(wish.content);
    setIsEditing(false);
  };

  const langClass =
    language === 'hi' ? 'lang-hi' : language === 'gu' ? 'lang-gu' : 'font-sans';

  return (
    <Card className="flex flex-col justify-between overflow-hidden border border-zinc-200 bg-white hover:border-zinc-300 transition-all dark:border-zinc-800 dark:bg-zinc-900/60 shadow-xs">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="text-[11px] font-medium px-2 py-0.5">
            <span className="mr-1">{wish.toneEmoji || '✨'}</span>
            <span>{wish.style}</span>
          </Badge>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            <Edit3 className="w-3 h-3" />
            <span>{isEditing ? 'Done' : 'Edit'}</span>
          </button>
        </div>

        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight pt-2 line-clamp-1">
          {wish.title}
        </h4>
      </CardHeader>

      <CardContent className="p-4 pt-1 flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={`w-full rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-900 focus-visible:outline-none focus-visible:border-indigo-600 focus-visible:ring-1 focus-visible:ring-indigo-600/30 min-h-[120px] ${langClass} dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700`}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-700"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`whitespace-pre-line text-xs sm:text-sm text-zinc-600 leading-relaxed dark:text-zinc-300 ${langClass} min-h-[90px]`}
          >
            {editedContent}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-900/40 flex items-center justify-between gap-2">
        <span className="text-[10px] text-zinc-400">
          {editedContent.length} chars
        </span>

        <div className="flex items-center gap-1.5">
          {/* Copy Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={`text-xs gap-1.5 h-8 px-2.5 transition-all ${
              copied
                ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-medium'
                : ''
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </Button>

          {/* WhatsApp Share Button */}
          <Button
            type="button"
            variant="whatsapp"
            size="sm"
            onClick={handleWhatsApp}
            className="text-xs gap-1 h-8 px-2.5"
          >
            <MessageCircle className="h-3 w-3 fill-current" />
            <span>WhatsApp</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
