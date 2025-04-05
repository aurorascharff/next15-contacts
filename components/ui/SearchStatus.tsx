'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { SearchIcon, SpinnerIcon } from './icons';

export default function SearchStatus({ searching }: { searching?: boolean }) {
  const { pending } = useFormStatus();
  const isSearching = searching || pending;

  return (
    <div aria-hidden="true" className="absolute left-10 top-7">
      {isSearching ? (
        <div className="h-fit w-fit animate-spin">
          <SpinnerIcon width={16} height={16} className="text-gray-dark" />
        </div>
      ) : (
        <SearchIcon width={16} height={16} className="text-gray-dark" />
      )}
    </div>
  );
}
