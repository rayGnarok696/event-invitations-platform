import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invitation - Event Invitations',
  description: 'Edit and design your event invitation',
};

export default function EditEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
