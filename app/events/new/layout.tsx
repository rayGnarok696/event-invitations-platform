import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Event - Event Invitations',
  description: 'Create a new event and design your invitation',
};

export default function CreateEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
