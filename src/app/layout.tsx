import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NEXUS — Enter the Game Universe',
  description: 'Experience the next generation of gaming. NEXUS is a AAA cinematic game universe with cutting-edge 3D graphics, immersive storytelling, and competitive multiplayer.',
  keywords: ['gaming', 'AAA', 'cinematic', 'sci-fi', 'cyberpunk', 'multiplayer', 'next-gen'],
  openGraph: {
    title: 'NEXUS — Enter the Game Universe',
    description: 'Experience the next generation of gaming.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
