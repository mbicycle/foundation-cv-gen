import type { UseMutationResult } from "react-query"
import { useMutation, useQueryClient } from "react-query"

import { useUserFromDb } from "widgets/cv-form/api/query-hooks"
import { QueryKey } from "widgets/cv-form/model/constants"

import type { Certificate, DbUser } from "entities/user/model"

import SnackBarUtils from "shared/ui/SnackBar/SnackBarUtils"

import * as api from "./api"

export function useAddUserCertificate(): UseMutationResult<DbUser, Error, Certificate, VoidFunction> {
  const queryClient = useQueryClient()
  const { data: user } = useUserFromDb()

  const certificates = user?.certificates || []

  return useMutation<DbUser, Error, Certificate, VoidFunction>(
    (certificate: Certificate) => {
      certificates.push(certificate as Certificate)
      return api.modifyUserCertificates(certificates as Certificate[], user as DbUser)
    },
    {
      onSettled: (data) => {
        queryClient.setQueryData(QueryKey.DbUser, data)
      },
      onError: (error: Error, _: Certificate, rollback) => {
        SnackBarUtils.error(error.message)

        if (rollback) rollback()
      },
    },
  )
}

export function useUpdateUserCertificate(): UseMutationResult<DbUser, Error, Certificate, VoidFunction> {
  const queryClient = useQueryClient()
  const { data: user } = useUserFromDb()

  const certificates = user?.certificates || []

  return useMutation<DbUser, Error, Certificate, VoidFunction>(
    (certificate: Certificate) => {
      const certificateindex = certificates.findIndex((certificateItem) => certificateItem.id === certificate.id)
      if (certificateindex >= 0) certificates[certificateindex] = { ...certificate }

      return api.modifyUserCertificates(certificates as Certificate[], user as DbUser)
    },
    {
      onSettled: (data) => {
        queryClient.setQueryData(QueryKey.DbUser, data)
      },
      onError: (error: Error, _: Certificate, rollback) => {
        SnackBarUtils.error(error.message)

        if (rollback) rollback()
      },
    },
  )
}

export function useDeleteUserCertificate(): UseMutationResult<DbUser, Error, string, unknown> {
  const queryClient = useQueryClient()
  const { data: user } = useUserFromDb()
  return useMutation<DbUser, Error, string, VoidFunction>(
    (id: string) => {
      const certificates = user?.certificates
      const filteredCertificates = certificates?.filter((certificate: Certificate) => certificate.id !== id)
      return api.modifyUserCertificates(filteredCertificates as Certificate[], user as DbUser)
    },
    {
      onSettled: (data) => {
        queryClient.setQueryData(QueryKey.DbUser, data)
      },
      onError: (error: Error, _: string, rollback) => {
        SnackBarUtils.error(error.message)

        if (rollback) rollback()
      },
    },
  )
}
