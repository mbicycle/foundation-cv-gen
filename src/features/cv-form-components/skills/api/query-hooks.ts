import type { UseMutationResult } from "react-query"
import { useMutation, useQueryClient } from "react-query"

import { QueryKey } from "widgets/cv-form/model/constants"

import type { DbUser } from "entities/user/model"

import SnackBarUtils from "shared/ui/SnackBar/SnackBarUtils"

import * as api from "./api"

export function useAddOrEditSkill(): UseMutationResult<DbUser, Error, DbUser, unknown> {
  const queryClient = useQueryClient()

  return useMutation<DbUser, Error, DbUser, VoidFunction>((data) => api.updateDbUserCategory(data), {
    onSettled: (data) => {
      queryClient.setQueryData(QueryKey.DbUser, data)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(QueryKey.DbUser, data)
    },
    onError: (error: Error, _: DbUser, rollback) => {
      SnackBarUtils.error(error.message)

      if (rollback) rollback()
    },
  })
}
