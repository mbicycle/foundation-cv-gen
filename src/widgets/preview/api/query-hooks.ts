import type { UseMutationResult, UseQueryResult } from "react-query"
import { useMutation, useQuery, useQueryClient } from "react-query"

import type { MsUser } from "entities/user/model"

import { mockUser } from "shared/lib/constants"
import { getGuestToken } from "shared/lib/helpers/getGuestToken"
import SnackBarUtils from "shared/ui/SnackBar/SnackBarUtils"

import * as api from "./api"

const token = getGuestToken()

export function useMsGraph({ params }: { params: string[] }): UseQueryResult<{ [key: string]: string }, Error> {
  const queryClient = useQueryClient()

  const props = {
    queryKey: "ms-graph-data",
    queryFn: token ? () => mockUser : () => api.getMyDataFromMsGraph(params as string[]),
    options: token
      ? {}
      : {
          staleTime: Number.POSITIVE_INFINITY,
          cacheTime: 5 * 60 * 1000,
          initialData: () => queryClient.getQueryData("ms-graph-data"),
          onError: (error: Error) => {
            SnackBarUtils.error(`${error.message}.`)
          },
        },
  }

  return useQuery(props.queryKey, props.queryFn, props.options)
}

export function useGetUserDataFromMsGraph({
  params,
}: {
  params: Array<keyof MsUser>
}): UseMutationResult<MsUser, Error, string, unknown> {
  const queryClient = useQueryClient()

  const props = {
    mutationKey: "ms-admin-user",
    mutationFn: token
      ? (): Promise<MsUser> =>
          new Promise((resolve) => {
            resolve(mockUser)
          })
      : (userId: string) => api.getUserDataFromMsGraph(userId, params),
    options: token
      ? {}
      : {
          onSuccess: (data: { mail: string }) => {
            queryClient.setQueryData(["ms-admin-user", data.mail], data)
          },
          onError: (error: Error) => {
            SnackBarUtils.error(`${error.message}.`)
          },
        },
  }
  return useMutation(props.mutationKey, props.mutationFn, props.options)
}
