import { useEffect } from "react"
import type { Control, FieldErrors, SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import type { DbUser } from "entities/user/model"
import { ErrorMessage, InputName } from "fields/personal-information/form/constants"
import { useUpdateUserFromDb } from "fields/personal-information/lib/query-hooks"
import isEqual from "lodash.isequal"
import msalUtils from "shared/lib/msal"
import SnackBarUtils from "shared/ui/SnackBar/SnackBarUtils"
import useUnsaved from "shared/utils/hooks/useUnSaved"
import * as yup from "yup"

import { useUserFromDb } from "containers/main-page/cv-form/api/query-hooks"
import { TITLE_REQUIRED } from "containers/main-page/cv-form/utils/constants"
import { useMsGraph } from "containers/main-page/preview/lib/query-hooks"
import { useGuestToken } from "common/context/guest-token"
import { useGuestUser } from "common/context/guest-user"

export const validationTest = function (string: string | undefined): boolean {
  if (!string?.length) return false
  const stringWithoutSpaces = string.trim().replace(/\s+/g, "")
  return stringWithoutSpaces.length >= 2
}

type FormValues = Omit<DbUser, "languages" | "projects" | "categories" | "certificates" | "finished">

interface UpdatePersonalDataReturnType {
  isLoading: boolean
  isDirty: boolean
  isValid: boolean
  submitHandle: VoidFunction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FormValues, any>
  dbUser?: DbUser
  errors: FieldErrors<FormValues>
}

export const useUpdatePersonalData = (): UpdatePersonalDataReturnType => {
  const { data: msGraphData } = useMsGraph({ params: ["jobTitle"] })
  const { jobTitle } = msGraphData ?? {}
  const { data: dbUser, refetch } = useUserFromDb()
  const { mutateAsync, isLoading } = useUpdateUserFromDb()
  const { user } = msalUtils.useAuth()
  const { state } = useGuestToken()
  const { state: userState, dispatch: userDispatch } = useGuestUser()

  const schema = yup
    .object({
      firstName: yup.string().trim().min(2, ErrorMessage.MinimumTwo).required(),
      lastName: yup.string().trim().min(2, ErrorMessage.MinimumTwo).required(),
      email: state.isGuest ? yup.string() : yup.string().trim().required(),
      skype: yup.string().trim(),
      telegram: yup.string().trim(),
      title: yup
        .string()
        .min(2, ErrorMessage.MinimumTwo)
        .test("title", ErrorMessage.MinimumTwo, validationTest)
        .not([TITLE_REQUIRED])
        .required(),
      summary: yup
        .string()
        .min(2, ErrorMessage.MinimumTwo)
        .test("summary", ErrorMessage.MinimumTwo, validationTest)
        .required(),
    })
    .required()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      [InputName.FirstName]: user?.givenName || dbUser?.firstName || "",
      [InputName.LastName]: user?.surname || dbUser?.lastName || "",
      [InputName.Email]: user?.mail || dbUser?.email || "",
      [InputName.Skype]: dbUser?.skype || "",
      [InputName.Telegram]: dbUser?.telegram || "",
      [InputName.Title]: dbUser?.title || jobTitle || "",
      [InputName.Summary]: dbUser?.summary || "",
    },
  })

  const { setUnsaved } = useUnsaved(isDirty)

  const onSaveHandle: SubmitHandler<FormValues> = async (values): Promise<void> => {
    if (state.isGuest && values) {
      setUnsaved(false)
      userDispatch({ ...userState, ...values })
    } else if (dbUser?.email && values) {
      setUnsaved(false)
      const name = dbUser?.lastName || user?.surname || user?.displayName.split(" ")[-1] || ""
      const result = await mutateAsync({ ...dbUser, ...values, lastName: name })

      if (!isEqual(result, dbUser)) {
        SnackBarUtils.success("Successfully saved!")
      }
    }
  }

  const submitHandle = handleSubmit(onSaveHandle)

  useEffect(() => {
    if (!dbUser) {
      refetch()
    }
  }, [dbUser, refetch])

  useEffect(() => {
    if (state.isGuest && dbUser) {
      reset({
        [InputName.FirstName]: dbUser?.firstName || "",
        [InputName.LastName]: dbUser?.lastName || "",
        [InputName.Email]: dbUser?.email || "",
        [InputName.Skype]: dbUser?.skype || "",
        [InputName.Telegram]: dbUser?.telegram || "",
        [InputName.Title]: dbUser?.title || jobTitle || "",
        [InputName.Summary]: dbUser?.summary || "",
      })
    } else if (dbUser) {
      reset({
        [InputName.Skype]: dbUser?.skype || "",
        [InputName.Telegram]: dbUser?.telegram || "",
        [InputName.Title]: dbUser?.title || jobTitle || "",
        [InputName.Summary]: dbUser?.summary || "",
      })
    }
  }, [dbUser, jobTitle, reset, dbUser?.title, state.isGuest])

  return {
    dbUser,
    isLoading,
    isDirty,
    isValid,
    submitHandle,
    control,
    errors,
  }
}
