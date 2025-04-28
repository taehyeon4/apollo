'use server';

import { Message } from 'ai';
import { cookies } from 'next/headers';

import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisiblityById,
} from '@/lib/db/queries';
import { VisibilityType } from '@/components/visibility-selector';

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('chat-model', model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: Message;
}) {
  // Extract the trademark name using regex from the user message
  const userMessage = message.content;

  // Use regex to extract trademark name from pattern "Analyze trademark: NAME"
  const trademarkRegex = /Analyze trademark: (.*?)(?:\n|$)/i;
  const match = userMessage.match(trademarkRegex);

  // If regex match found, use the captured group as the title
  // Otherwise fall back to the first line or default title
  const trademarkName = match
    ? match[1].trim().substring(0, 80)
    : userMessage.split('\n')[0].trim().substring(0, 80);

  return trademarkName || 'New Trademark Analysis';
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisiblityById({ chatId, visibility });
}
