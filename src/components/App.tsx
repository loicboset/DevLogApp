'use client';

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigCatProvider, createConsoleLogger, LogLevel } from "configcat-react";

import Editor from "@/components/collections/Editor";
import NavBar from "@/components/collections/NavBar";
import queryClient from "@/lib/tanstackQuery/client";

import AppWrapper from "./collections/AppWrapper";


type Props = {
  userID: string;
}

const logger = createConsoleLogger(LogLevel.Info);

const App = ({ userID }: Props): React.ReactElement => {

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigCatProvider sdkKey={process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY!} options={{ logger }}>
        <AppWrapper userID={userID}>
          <NavBar userID={userID} />
          <Editor userID={userID} />
        </AppWrapper>
      </ConfigCatProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
};

export default App;
