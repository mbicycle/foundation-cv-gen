import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { AuthProvider } from "shared/msalUtils/features/auth"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const ReactQueryProvider = function ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactQueryDevtools />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
