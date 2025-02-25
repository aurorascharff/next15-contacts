import Image from 'next/image';
import LinkButton from '@/components/ui/LinkButton';
import { getContact } from '@/data/services/contact';
import { routes } from '@/validations/routeSchema';
import DeleteContactButton from './_components/DeleteContactButton';
import Favorite from './_components/Favorite';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<unknown>;
};

// In local development, the `generateMetadata` will not be streamed and will block the page until it resolves, hindering the suspense boundary from showing.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { contactId } = routes.contactId.$parseParams(await params);
  const contact = await getContact(contactId);

  return contact && contact.first && contact.last
    ? {
        description: `Contact details for ${contact.first} ${contact.last}`,
        title: `${contact.first} ${contact.last}`,
      }
    : {
        description: 'Contact details for an unnamed contact',
        title: 'Unnamed Contact',
      };
}

export default async function ContactPage({ params }: PageProps) {
  const { contactId } = routes.contactId.$parseParams(await params);
  const contact = await getContact(contactId);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {contact.avatar && (
        <div className="flex-shrink-0">
          <Image
            priority
            width={192}
            height={192}
            className="mr-8 rounded-3xl bg-gray object-cover"
            alt={`${contact.first} ${contact.last} avatar`}
            key={contact.avatar}
            src={contact.avatar}
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h1 className="flex-start flex gap-4 text-3xl font-bold">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}
          <Favorite contact={contact} />
        </h1>
        {contact.twitter && (
          <p className="text-2xl text-primary">
            <a className="text-primary no-underline hover:underline" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}
        {contact.notes && <div className="max-h-[300px] w-full overflow-auto 2xl:w-1/2">{contact.notes}</div>}
        <div className="my-4 flex gap-2">
          <LinkButton theme="secondary" href={routes.contactIdEdit({ contactId })}>
            Edit
          </LinkButton>
          <DeleteContactButton contactId={contactId} />
        </div>
      </div>
    </div>
  );
}
