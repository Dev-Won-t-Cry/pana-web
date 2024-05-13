"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactNode } from "react";
import NextAuthSessionProvider from '@/providers/sessionProvider';
import { Toaster } from '@/components/ui/toaster';


const queryClient = new QueryClient();
const Providers = ({ children }: { children: ReactNode }) => {

  return (
    <QueryClientProvider client={queryClient}>
      <NextAuthSessionProvider>
        {children}
      </NextAuthSessionProvider>
      <Toaster />
    </QueryClientProvider>
  )
}

export default Providers;