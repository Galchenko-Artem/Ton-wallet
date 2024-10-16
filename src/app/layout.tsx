'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <TonConnectUIProvider manifestUrl="https://your-domain.com/tonconnect-manifest.json">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
