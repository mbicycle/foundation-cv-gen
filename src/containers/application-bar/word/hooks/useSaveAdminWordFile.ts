import { useRef, useState } from "react"
import { Document, Packer, Paragraph } from "docx"
import { saveAs } from "file-saver"

import { getFileName, refactorProjectSkills } from "containers/application-bar/helper-functions"
import {
  addContactInformation,
  addLanguages,
  addRowWithHeading,
  addSkills,
  convertFromPathImage,
  createHeader,
  createNameAndTitle,
  createSectionTitle,
  createSemiTitle,
  createSummary,
} from "containers/application-bar/word/helper-functions"
import { useGetUserDataFromMsGraph } from "containers/main-page/preview/lib/query-hooks"
import headerPic from "common/assets/cv-gen-docx-header.png"
import SnackBarUtils from "common/components/SnackBar/SnackBarUtils"
import { useToggleSensitiveData } from "common/context"
import type { DbUser } from "common/models/User"
import { getYearsExperience } from "common/utils/hooks/useUserExperience"

import { createWordProjects } from "./createWordProjects"
import wordAdminCertifications from "./wordAdminCertifications"

export const useSaveAdminWordFile = (): {
  isRetreivingWordUserData: boolean
  passUser: (id: string, user: DbUser | undefined) => void
} => {
  const { state } = useToggleSensitiveData()
  const { mutateAsync } = useGetUserDataFromMsGraph({
    params: ["jobTitle", "displayName", "givenName", "surname"],
  })

  const [isRetreivingUserData, setIsRetreivingUserData] = useState(false)

  const userRef = useRef<DbUser | undefined>()
  const graphUserIdRef = useRef<string>("")

  const { checked: isHidden } = state

  const handleSave = async (): Promise<void> => {
    const { title, summary, certificates, projects, email, skype, telegram, languages, skills } = userRef.current ?? {}

    const wordProjects = createWordProjects({
      projects: refactorProjectSkills(skills, projects) || [],
      isHidden,
    })

    const { certifications } = wordAdminCertifications({ certificates })
    const msUser = await mutateAsync(graphUserIdRef.current)

    const { jobTitle, givenName, surname, displayName } = msUser ?? {}

    const nameIfSenstiveDataHidden = (): string => {
      const nameArr = givenName && surname ? [givenName, surname] : displayName.split(" ")
      const splitedName = nameArr.map((word, index) => {
        if (index === nameArr.length - 1) {
          return `${nameArr[index]?.slice(0, -nameArr[index].length + 1)}.`
        }

        return word
      })

      return isHidden ? splitedName.join(" ") : `${givenName} ${surname}`
    }

    const image = await convertFromPathImage(headerPic)

    function createPersonalInformation(): Paragraph[] {
      const result = []
      if (!isHidden) {
        result.push(addContactInformation({ heading: "", text: "" }))
        result.push(addContactInformation({ heading: "E-mail: ", text: email ?? "" }))
        if (skype) result.push(addContactInformation({ heading: "Skype: ", text: skype ?? "" }))
        if (telegram) result.push(addContactInformation({ heading: "Telegram: ", text: telegram ?? "" }))
      }
      return result
    }

    const doc = new Document({
      sections: [
        {
          headers: {
            default: createHeader({ image }),
          },
          children: [
            ...createNameAndTitle({ fullName: nameIfSenstiveDataHidden(), title: title ?? jobTitle }),
            addRowWithHeading({ heading: "Work Experience: ", text: `${getYearsExperience(projects)} years` }),

            ...createPersonalInformation(),

            createSemiTitle("SUMMARY OF QUALIFICATIONS"),
            createSummary(summary ?? ""),

            createSectionTitle("Languages"),
            new Paragraph({}),
            ...addLanguages(languages ?? []),

            createSectionTitle("Skills"),
            new Paragraph({}),
            addSkills(skills ?? []),
            createSectionTitle("Projects"),
            ...wordProjects,
            certifications?.length ? createSectionTitle("Certificates") : new Paragraph({}),
            ...certifications,
          ],
        },
      ],
    })

    Packer.toBlob(doc).then((blob) => {
      const name =
        givenName && surname ? `${givenName} ${surname}` : `${userRef.current?.firstName} ${userRef.current?.lastName}`
      saveAs(blob, getFileName(name, isHidden))
    })
  }

  const passUser = async (id: string, userParams: DbUser | undefined): Promise<void> => {
    if (userParams) {
      userRef.current = userParams
      graphUserIdRef.current = id
      await handleSave()
    } else {
      setIsRetreivingUserData(true)
      const msUser = await mutateAsync(id)
      setIsRetreivingUserData(false)
      const { displayName } = msUser
      SnackBarUtils.info(`${displayName} has not generated the CV. Please ask him/her to do so.`)
    }
  }

  return {
    passUser,
    isRetreivingWordUserData: isRetreivingUserData,
  }
}
