'use client';

import React, { startTransition } from 'react';
import { createEmptyContact } from '@/data/actions/contact';

import SubmitButton from './ui/SubmitButton';

export default function NewContactButton() {
  return (
    <form
      action={createEmptyContact}
      onSubmit={e => {
        e.preventDefault();
        startTransition(async () => {
          await createEmptyContact();
        });
      }}
    >
      <SubmitButton type="submit" theme="secondary">
        New
      </SubmitButton>
    </form>
  );
}
