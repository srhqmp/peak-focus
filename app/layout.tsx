import type { Metadata } from 'next';
import { Varela_Round } from 'next/font/google';
import './globals.css';

import { BackgroundProvider, Header } from './components';

const varelaRound = Varela_Round({
  subsets: ['latin'],
  display: 'auto',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Peakfocus',
  description:
    'Peakfocus is a productivity web app that utilizes a Pomodoro timer.',
  icons: {
    icon: '/logo-red.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${varelaRound.className} antialiased px-2 text-white`}>
        <BackgroundProvider>
          <Header />
          {children}
        </BackgroundProvider>
      </body>
    </html>
  );
}
