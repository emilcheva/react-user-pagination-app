import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClientSetup";
import { ReactNode } from "react";

const TestProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default TestProvider;
