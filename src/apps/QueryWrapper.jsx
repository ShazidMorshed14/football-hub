import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: 3,
//       retryDelay: 3 * 1000, //3 secs
//       staleTime: 10 * 60 * 1000, //10 mins
//       onSuccess: (response) => response?.data,
//     },
//   },
// });
const queryClient = new QueryClient();

const QueryWrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      {children}
    </QueryClientProvider>
  );
};

export default QueryWrapper;
