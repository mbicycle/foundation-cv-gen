import type { UseQueryResult } from "react-query"
import { useQuery, useQueryClient } from "react-query"

import SnackBarUtils from "common/components/SnackBar/SnackBarUtils"

import * as api from "./api"

export function useDbUsersList(): UseQueryResult<AdminTableType.UsersDbList[], Error> {
  const queryClient = useQueryClient()

  return useQuery("db-users-list", () => api.getAllDbUsers(), {
    staleTime: Number.POSITIVE_INFINITY,
    cacheTime: 5 * 60 * 1000,
    onSuccess: (data) => queryClient.setQueriesData("db-users-list", data),
    initialData: () => queryClient.getQueryData("db-users-list"),
    onError: (error: Error) => {
      SnackBarUtils.error(`${error.message}.`)
    },
  })
}

export function useGraphUsers(): UseQueryResult<AdminTableType.GraphDataMapped, Error> {
  const queryClient = useQueryClient()

  return useQuery("ms-graph-users", () => api.getAllUsers(), {
    staleTime: Number.POSITIVE_INFINITY,
    cacheTime: 5 * 60 * 1000,
    onSuccess: (successData) => queryClient.setQueriesData("ms-graph-users", successData),
    initialData: () => queryClient.getQueryData("ms-graph-users"),
    onError: (error: Error) => {
      SnackBarUtils.error(`${error.message}.`)
    },
  })
}
