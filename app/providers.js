'use client';

import { SessionProvider } from "next-auth/react";
import { TweetProvider } from "./context/TweetContext";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <TweetProvider>
        {children}
      </TweetProvider>
    </SessionProvider>
  );
}