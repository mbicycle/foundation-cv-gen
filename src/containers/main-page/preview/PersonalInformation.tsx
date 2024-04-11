import { useMemo } from "react"

import { useUserFromDb } from "containers/main-page/cv-form/api/query-hooks"
import { CV_FORM_STEPS } from "containers/main-page/cv-form/utils/constants"
import { useToggleSensitiveData } from "common/context"
import PersonIcon from "common/icons/PersonIcon"
import { useUserPhoto } from "common/services/user-service/hooks/useUserPhoto"
import { useUserExperience } from "common/utils/hooks/useUserExperience"

import { useMsGraph } from "./lib/query-hooks"

const PersonalInformation = function (): JSX.Element {
  const { data: dbData } = useUserFromDb()
  const { photo } = useUserPhoto()
  const yearsExperience = useUserExperience()
  const { data: msGraphData } = useMsGraph({ params: ["jobTitle", "givenName", "surname"] })
  const {
    state: { checked },
  } = useToggleSensitiveData()

  const { title, firstName, lastName, summary } = dbData ?? {}
  const { givenName, surname, jobTitle } = msGraphData ?? {}

  const userName = useMemo(() => {
    const name = {
      first: givenName ? `${givenName}` : `${firstName ?? ""}`,
      last: surname ? `${surname}` : `${lastName ?? ""}`,
    }

    if (name.first) {
      return checked ? `${name.first} ${name.last[0]}.` : `${name.first} ${name.last}`
    }
    return ""
  }, [givenName, firstName, surname, lastName, checked])

  function renderUserImage(): JSX.Element {
    if (!photo || checked) return <PersonIcon className="size-20" />

    return <img className="avatarImage size-20" referrerPolicy="no-referrer" alt="User" src={photo} />
  }

  function renderYearsExperience(): JSX.Element | null {
    if (!yearsExperience || !parseFloat(yearsExperience)) {
      return <p className="text-center">Complete the &quot;Projects&quot; section</p>
    }

    return (
      <>
        <h3 className="text-center font-semibold text-blue-500">{yearsExperience}</h3>
        <p>Work Experience</p>
      </>
    )
  }

  return (
    <div className="previewItemWrapper">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2">{renderUserImage()}</div>
        <div className="col-span-7">
          <h3 className="font-bold">{userName}</h3>
          <h4 className="font-light">{title || jobTitle}</h4>
        </div>
        <div className="col-span-3 text-center">{renderYearsExperience()}</div>
        <div className="col-span-12">
          <h6 className="font-bold">{CV_FORM_STEPS[0].columns[0]}</h6>
          <p className="whitespace-pre-wrap">{summary}</p>
        </div>
      </div>
    </div>
  )
}

export default PersonalInformation
