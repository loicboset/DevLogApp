'use client';

import NavBar from "@/app/[userID]/parts/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Editor from "./Editor";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

type Props = {
  userID: string;
}

const App = ({ userID }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Editor userID={userID} />
    </QueryClientProvider>
  );
};

export default App;
