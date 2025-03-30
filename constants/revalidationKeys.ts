export const revalidationKeys = {
  contact: (contactId: string) => {
    return `contact-${contactId}`;
  },
  contacts: 'contacts',
  messages: (contactId?: string) => {
    return `messages-${contactId}`;
  },
} as const;
