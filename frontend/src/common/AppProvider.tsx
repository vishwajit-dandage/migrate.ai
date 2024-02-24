'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Metadata } from 'next';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


export const AppProvider = ({
  children,
}: React.PropsWithChildren<Record<never, never>>) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            gcTime: 3600000,
            staleTime: 3600000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
