'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import SubmitButton from '@/components/ui/SubmitButton';
import TextArea from '@/components/ui/TextArea';
import { updateContact } from '@/data/actions/contact';
import { contactSchema, type ContactSchemaType } from '@/validations/contactSchema';
import { routes, useSafeSearchParams } from '@/validations/routeSchema';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contact }: { contact: Contact }) {
  const { q } = useSafeSearchParams('home');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(contactSchema),
    values: contact,
  });

  const onSubmit = handleSubmit(async data => {
    const response = await updateContact(contact.id, data);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success('Contact updated');
    }
  });

  return (
    <form className="flex max-w-[40rem] flex-col gap-4 @container" onSubmit={onSubmit}>
      <div className="grip-rows-5 grid gap-2 @sm:grid-cols-[1fr_4fr] @sm:gap-4">
        <span className="flex">Name</span>
        <div className="flex gap-4">
          <Input
            {...register('first')}
            error={errors.first?.message}
            aria-label="First name"
            name="first"
            type="text"
            placeholder="First"
          />
          <Input
            {...register('last')}
            error={errors.last?.message}
            aria-label="Last name"
            name="last"
            placeholder="Last"
            type="text"
          />
        </div>
        <label htmlFor="twitter">Twitter</label>
        <Input
          {...register('twitter')}
          error={errors.twitter?.message}
          name="twitter"
          placeholder="@jack"
          type="text"
        />
        <label htmlFor="avatar">Avatar URL</label>
        <Input
          {...register('avatar')}
          error={errors.avatar?.message}
          name="avatar"
          placeholder="https://sessionize.com/image/example.jpg"
          type="text"
        />
        <label htmlFor="notes">Notes</label>
        <TextArea {...register('notes')} error={errors.notes?.message} className="grow" name="notes" rows={6} />
      </div>
      <div className="flex gap-2 self-start @sm:self-end">
        <LinkButton theme="secondary" href={routes.contactId({ contactId: contact.id, search: q ? { q } : undefined })}>
          Cancel
        </LinkButton>
        <SubmitButton loading={isSubmitting}>Save</SubmitButton>
      </div>
    </form>
  );
}
