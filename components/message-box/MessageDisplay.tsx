import React from 'react';
import { cn } from '@/utils/cn';
import type { OptimisticMessage } from './Messages';

type Props = {
  message: OptimisticMessage;
  userId: string;
  createdByName: string;
};

export default function MessageDisplay({ message, userId, createdByName }: Props) {
  const isWrittenByUser = userId === message.createdById;

  return (
    <div
      className={cn(
        'flex h-fit w-4/5 flex-col gap-2 rounded p-4 sm:w-2/3',
        isWrittenByUser ? 'justify-self-end bg-gray' : 'justify-self-start border border-gray',
      )}
    >
      <span>
        <span className="font-bold">{isWrittenByUser ? 'You' : createdByName}</span>
        {' - '}
        <span className="text-nowrap text-sm italic">
          {message.createdAt.toLocaleString('en-US', {
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })}
        </span>
      </span>
      <span>
        {message.content}
        {message.isSending && <span className="ml-1 text-gray-400"> Sending ...</span>}
      </span>
    </div>
  );
}
