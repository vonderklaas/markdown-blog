import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import './globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <head />
      <body>
        <Header />
        <div className='bg-white'>
          <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
