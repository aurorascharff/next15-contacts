'use client';

import React from 'react';
import ErrorMessage from '@/components/ui/ErrorMessage';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ reset }: Props) {
  return <ErrorMessage onReset={reset}>⚠️ Something went wrong</ErrorMessage>;
}
