import type { UseMutationResult, UseQueryResult } from "react-query"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useMsal } from "@azure/msal-react"

import { QueryKey } from "widgets/cv-form/model/constants"
import { useGetUserDataFromMsGraph } from "widgets/preview/api/query-hooks"

import type { CreateUserModel } from "features/cv-form-components/personal-information/model/types"

import type { DbUser, GuestUser } from "entities/user/model"

import { useGuestUser } from "shared/context/guest-user"
import { getGuestToken as getGuestTokenFromStorage } from "shared/lib/helpers/getGuestToken"
import { useAuth } from "shared/lib/msal/features/auth"
import SnackBarUtils from "shared/ui/SnackBar/SnackBarUtils"

import * as api from "./api"

export function useCreateDbUser(): UseMutationResult<CreateUserModel, Error, CreateUserModel, unknown> {
  const queryClient = useQueryClient()

  return useMutation<CreateUserModel, Error, CreateUserModel, VoidFunction>((user) => api.createDbUser(user), {
    onSettled: () => {
      queryClient.invalidateQueries(QueryKey.DbUser)
    },
    onSuccess: () => queryClient.invalidateQueries(QueryKey.DbUser),
    onError: (error: Error, _: CreateUserModel, rollback) => {
      SnackBarUtils.error(error.message)

      if (rollback) rollback()
    },
  })
}

function useUserGuest(): UseQueryResult<GuestUser, Error> {
  const { state: userState } = useGuestUser()
  return {
    data: userState,
    error: null,
    isError: false,
    isIdle: true,
    isLoading: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: true,
    status: "idle",
  } as unknown as UseQueryResult<GuestUser, Error>
}

function useUserFromMsal(): UseQueryResult<DbUser, Error> {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const { accounts } = useMsal()
  const { mutateAsync: mutateAsyncUser } = useGetUserDataFromMsGraph({ params: ["jobTitle"] })

  return useQuery<DbUser, Error, DbUser, QueryKey.DbUser>(QueryKey.DbUser, () => api.getDbUser(user?.mail as string), {
    staleTime: Number.POSITIVE_INFINITY,
    cacheTime: 5 * 60 * 1000,
    initialData: () => queryClient.getQueryData(QueryKey.DbUser),
    onSettled: async () => {
      const cachedUser: DbUser | undefined = (await queryClient.getQueryData(QueryKey.DbUser)) as DbUser

      if (cachedUser && !cachedUser.title) {
        const me = accounts[0]
        const newUser = await mutateAsyncUser(me.localAccountId)
        cachedUser.title = newUser.jobTitle
      }
    },
    onError: () => {
      SnackBarUtils.success("Your account created successfully")
    },
  })
}

export const useUserFromDb: () => UseQueryResult<GuestUser, Error> = getGuestTokenFromStorage()
  ? useUserGuest
  : useUserFromMsal

export function useGetDbUser(): UseMutationResult<DbUser, Error, string, VoidFunction> {
  const queryClient = useQueryClient()

  return useMutation((mail) => api.getDbUser(mail), {
    onSuccess: (data) => {
      queryClient.setQueryData(["admin-user", data.email], data)
    },
    onError: (error: Error, _: string, rollback) => {
      SnackBarUtils.error(error.message)

      if (rollback) rollback()
    },
  })
}
