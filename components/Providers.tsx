'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import ThemeRegistry from './ThemeRegistry';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeRegistry>
        {children}
      </ThemeRegistry>
    </SessionProvider>
  );
}
