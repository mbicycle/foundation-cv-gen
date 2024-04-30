import type { UseMutationResult } from "react-query"
import { useMutation, useQueryClient } from "react-query"

import { QueryKey } from "widgets/cv-form/model/constants"

import type { DbUser } from "entities/user/model"

import SnackBarUtils from "shared/ui/SnackBar/SnackBarUtils"

import * as api from "./api"

export function useUpdateUserFromDb(): UseMutationResult<DbUser, Error, DbUser, unknown> {
  const queryClient = useQueryClient()
  return useMutation<DbUser, Error, DbUser, VoidFunction>((user: DbUser) => api.updateDbUser({ ...user }), {
    onSuccess: (dbUser) => {
      queryClient.setQueryData(QueryKey.DbUser, dbUser)
    },
    onError: (error: Error, _: DbUser, rollback) => {
      SnackBarUtils.error(error.message)

      if (rollback) rollback()
    },
  })
}

export function useUpdateMsAvatar(): UseMutationResult<ReadableStream, Error, File, unknown> {
  return useMutation<ReadableStream, Error, File, VoidFunction>(
    (base64Avatar: File) => api.updateMsUserAvatar(base64Avatar as File),
    {
      onError: (error: Error, _: File, rollback) => {
        SnackBarUtils.error(error.message)

        if (rollback) rollback()
      },
    },
  )
}
