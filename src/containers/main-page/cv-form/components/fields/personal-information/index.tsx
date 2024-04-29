import { memo, useEffect } from "react"
import { useMsal } from "@azure/msal-react"
import SnackBarUtils from "shared/ui/SnackBar/SnackBarUtils"

import { useCreateDbUser, useUserFromDb } from "containers/main-page/cv-form/api/query-hooks"
import { TITLE_REQUIRED } from "containers/main-page/cv-form/utils/constants"
import { useGetUserDataFromMsGraph } from "containers/main-page/preview/lib/query-hooks"

import FileUpload from "./file-upload/index"
import PersonalDataForm from "./form/index"

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
