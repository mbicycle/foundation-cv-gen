import type { UseMutationResult, UseQueryResult } from "react-query"
import { useMutation, useQuery, useQueryClient } from "react-query"

import { useGuestUser } from "shared/context/guest-user"
import { getGuestToken as getGuestTokenFromStorage } from "shared/lib/helpers/getGuestToken"
import SnackBarUtils from "shared/ui/SnackBar/SnackBarUtils"

import * as api from "./api"
import { QueryKey } from "./query-key"

function useGetUserPhotoGuest(): UseQueryResult<Blob | undefined, Error> {
  const { state: userState } = useGuestUser()
  return {
    data: userState.avatar,
    error: null,
    isError: false,
    isIdle: true,
    isLoading: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: true,
    status: "idle",
  } as unknown as UseQueryResult<Blob | undefined, Error>
}

export function useGetUserPhotoDB(): UseQueryResult<Blob, Error> {
  const queryClient = useQueryClient()

  const props = {
    queryFn: api.getUserPhoto,
    options: {
      retry: 1,
      staleTime: Number.POSITIVE_INFINITY,
      cacheTime: 5 * 60 * 1000,
      initialData: (): Blob | undefined => queryClient.getQueryData(QueryKey.UserPhoto),
      onSuccess: (data: Blob) => queryClient.setQueryData(QueryKey.UserPhoto, data),
    },
  }

  return useQuery<Blob | undefined, Error, Blob, QueryKey.UserPhoto>(QueryKey.UserPhoto, props.queryFn, props.options)
}
export const useGetUserPhoto: () => UseQueryResult<Blob | undefined, Error> = getGuestTokenFromStorage()
  ? useGetUserPhotoGuest
  : useGetUserPhotoDB

export function useGetUserPhotoById(): UseMutationResult<Blob, Error, string, unknown> {
  return useMutation((id) => api.getUserPhotoById(id), {
    onError: () => {
      SnackBarUtils.info("Please upload the user photo. It is important.")
    },
  })
}

export function useDeleteUserFromDb(): UseMutationResult<void, Error, string[], unknown> {
  const queryClient = useQueryClient()

  return useMutation((emails) => api.deleteDbUser(emails), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: "db-users-list" })
      variables.forEach((variable) => {
        SnackBarUtils.success(`${variable} been deleted successfully.`)
      })
    },
    onError: (_: Error, variables: string[]) => {
      variables.forEach((variable) => {
        SnackBarUtils.info(`${variable} been deleted before.`)
      })
    },
  })
}
