'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import type { UseChatHelpers } from '@ai-sdk/react';

interface TrademarkInputFormProps {
  chatId: string;
  append: UseChatHelpers['append'];
  className?: string;
}

export function TrademarkInputForm({
  chatId,
  append,
  className = '',
}: TrademarkInputFormProps) {
  const [brandName, setBrandName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!brandName.trim() || !productDescription.trim()) return;

    window.history.replaceState({}, '', `/chat/${chatId}`);

    append({
      role: 'user',
      content: `Analyze trademark: ${brandName}\nDescription: ${productDescription}`,
    });

    setBrandName('');
    setProductDescription('');
  };

  return (
    <div className="w-full flex-1 flex items-center justify-center min-h-[calc(100vh-80px)]">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-6 w-full max-w-2xl mx-auto p-6 md:p-8 ${className}`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-3">
            Trademark Registrability Analysis
          </h2>
          <p className="text-muted-foreground">
            Enter information about your trademark and associated products or
            services
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Label
            htmlFor="brandName"
            className="text-zinc-600 font-normal dark:text-zinc-400 text-lg"
          >
            Enter the trademark name you want to analyse
          </Label>
          <Input
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="bg-muted text-md md:text-sm p-4 h-12"
            placeholder="Trademark name"
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label
            htmlFor="productDescription"
            className="text-zinc-600 font-normal dark:text-zinc-400 text-lg"
          >
            Describe the products or services associated with this trademark
          </Label>
          <Textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="bg-muted text-md md:text-sm min-h-[150px] p-4"
            placeholder="Product or service description"
            required
          />
        </div>

        <Button type="submit" className="mt-4 self-end py-6 px-8 text-lg">
          Analyze Registrability
        </Button>
      </form>
    </div>
  );
}
