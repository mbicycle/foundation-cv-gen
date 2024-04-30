import { memo, useEffect } from "react"
import { useMsal } from "@azure/msal-react"

import { useCreateDbUser, useUserFromDb } from "widgets/cv-form/api/query-hooks"
import { TITLE_REQUIRED } from "widgets/cv-form/model/constants"
import { useGetUserDataFromMsGraph } from "widgets/preview/api/query-hooks"

import PersonalDataForm from "features/cv-form-components/personal-information/ui/form"

import SnackBarUtils from "shared/ui/SnackBar/SnackBarUtils"

import FileUpload from "./ui/file-upload"

const PersonalInformation = function (): JSX.Element {
  const { data, isLoading } = useUserFromDb()
  const { mutateAsync } = useCreateDbUser()
  const { accounts } = useMsal()
  const { mutateAsync: mutateAsyncUser } = useGetUserDataFromMsGraph({ params: ["jobTitle"] })
  const me = accounts[0]

  useEffect(() => {
    if (!data && me?.name && !isLoading) {
      const [givenName, surname] = me.name.split(" ")

      mutateAsyncUser(me.localAccountId).then(({ jobTitle }) => {
        mutateAsync({
          email: me.username,
          firstName: givenName,
          lastName: surname,
          title: jobTitle ?? TITLE_REQUIRED,
        }).then(() => {
          SnackBarUtils.success("Your account created successfully")
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading])

  return (
    <>
      <FileUpload />
      <PersonalDataForm />
    </>
  )
}

export default memo(PersonalInformation)
