import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: 'ArtKey Portal',
};

export default function ArtKeyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

