'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Analyze trademark',
      label: 'APOLLO for software services',
      action:
        'Analyze trademark: APOLLO\nDescription: Software as a service for legal document management',
    },
    {
      title: 'Evaluate registrability',
      label: 'SWIFT RIDE for transportation services',
      action:
        'Analyze trademark: SWIFT RIDE\nDescription: Mobile application for ride-sharing and transportation services',
    },
    {
      title: 'Check distinctiveness',
      label: 'APPLE HARVEST for fruit products',
      action:
        'Analyze trademark: APPLE HARVEST\nDescription: Fresh fruits and processed fruit products',
    },
    {
      title: 'Assess trademark',
      label: 'LUXE GLOW for cosmetics',
      action:
        'Analyze trademark: LUXE GLOW\nDescription: Luxury skincare and cosmetic products',
    },
  ];

  return (
    <div className="text-center mb-8 mt-4">
      <h3 className="text-lg font-medium mb-2">Example Trademarks</h3>
      <div className="grid grid-cols-2 gap-3">
        {suggestedActions.map((suggestedAction, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.1 * index }}
            key={`suggested-action-${suggestedAction.title}-${index}`}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.history.replaceState({}, '', `/chat/${chatId}`);

                append({
                  role: 'user',
                  content: suggestedAction.action,
                });
              }}
              className="w-full h-auto py-3 text-sm justify-start items-start text-left"
            >
              <div className="flex flex-col w-full">
                <span className="font-medium text-base">
                  {suggestedAction.title}
                </span>
                <span className="text-muted-foreground text-xs">
                  {suggestedAction.label}
                </span>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
