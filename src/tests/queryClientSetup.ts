import { QueryClient } from "@tanstack/react-query";

export const resetQueryClient = () => {
  queryClient.clear();
};

const defaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
});
