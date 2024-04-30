import { useRef, useState } from "react"
import JsPDF from "jspdf"

import { getFileName } from "widgets/app-bar/lib/helper-functions"
import { useUserFromDb } from "widgets/cv-form/api/query-hooks"
import { useGetUserDataFromMsGraph, useMsGraph } from "widgets/preview/api/query-hooks"

import type { DbUser } from "entities/user/model"

import { useUserPhoto, useUserPhotoById } from "shared/api/user-service/hooks/useUserPhoto"
import { useToggleSensitiveData } from "shared/context/toggle-sensetive-data"
import SnackBarUtils from "shared/ui/SnackBar/SnackBarUtils"

import {
  drawCertifications,
  drawLanguages,
  drawLogo,
  drawPersonalInformation,
  drawProjects,
  drawSkills,
  drawTopBox,
  drawUserMailAndSkype,
  resetVars,
} from "./lib/draw-functions"

type HandleSave = (dbUser?: DbUser, userPhoto?: string, name?: string) => Promise<void>

const usePDFFile = (): { loading: boolean; handleSave: HandleSave } => {
  const doc = new JsPDF("p", "mm", "a4", true)

  const {
    state: { checked: isHidden },
  } = useToggleSensitiveData()

  const [loading, setLoading] = useState(false)

  const handleSave = async (dbUser?: DbUser, userPhoto?: string, userName?: string): Promise<void> => {
    setLoading(() => true)
    const pageWidth = 210

    const { summary, skills, projects, title, certificates, languages, email, skype, telegram } = dbUser ?? {}

    const getName = (name?: string): string => {
      if (isHidden) {
        return name
          ? name
              .split(" ")
              .map((value, index, array) => (index === array.length - 1 ? `${value[0]}.` : value))
              .join(" ")
          : `${dbUser?.firstName} ${dbUser?.lastName[0]}.`
      }
      return name || `${dbUser?.firstName} ${dbUser?.lastName}`
    }

    drawTopBox(doc)
    await drawLogo(doc)
    await drawUserMailAndSkype({
      doc,
      pageWidth,
      isHidden,
      email,
      skype,
      telegram,
    })

    await drawPersonalInformation({
      doc,
      name: getName(userName),
      isHidden,
      photo: userPhoto,
      summary,
      title,
      projects,
    })

    await drawLanguages(doc, languages)

    await drawSkills(doc, skills)

    drawProjects({
      doc,
      isHidden,
      projects,
      skills,
    })

    drawCertifications(doc, certificates)

    doc.save(getFileName(userName || `${dbUser?.firstName} ${dbUser?.lastName}`, isHidden))
    setLoading(() => false)
    resetVars()
  }
  return {
    loading,
    handleSave,
  }
}

export const useSaveAdminPdfFile = (): {
  loading: boolean
  isRetreivingPdfUserData: boolean
  passUser: (id: string, user: DbUser | undefined) => void
} => {
  const { mutateAsync } = useGetUserDataFromMsGraph({ params: ["jobTitle", "displayName"] })
  const { getPhoto } = useUserPhotoById()
  const { loading, handleSave } = usePDFFile()

  const [isRetreivingUserData, setIsRetreivingUserData] = useState(false)

  const userRef = useRef<DbUser | undefined>()
  const graphUserIdRef = useRef<string>("")

  const passUser = async (id: string, userParams: DbUser | undefined): Promise<void> => {
    setIsRetreivingUserData(true)
    const msUser = await mutateAsync(id)
    setIsRetreivingUserData(false)

    if (userParams) {
      userRef.current = userParams
      graphUserIdRef.current = id
      const photo = await getPhoto(id)
      handleSave({ ...userParams, title: userParams.title || msUser.jobTitle || "" }, photo, msUser?.displayName)
    } else {
      const { displayName } = msUser
      SnackBarUtils.info(`${displayName} has not generated the CV. Please ask him/her to do so.`)
    }
  }

  return {
    isRetreivingPdfUserData: isRetreivingUserData,
    loading,
    passUser,
  }
}

export const useSavePDFFile = (): { loading: boolean; handleSave: () => void } => {
  const { data: dbUser } = useUserFromDb()
  const { data: msGraphData } = useMsGraph({
    params: ["jobTitle", "name", "displayName", "givenName", "surname"],
  })
  const { photo } = useUserPhoto()
  const { givenName } = msGraphData ?? {}
  const { surname } = msGraphData ?? {}
  const { handleSave: handelSaveInitial, loading } = usePDFFile()
  const name = givenName ? `${givenName} ${surname}` : `${dbUser?.firstName} ${dbUser?.lastName}`

  const handleSave = (): void => {
    const title = dbUser?.title || msGraphData?.jobTitle || ""
    handelSaveInitial(dbUser ? { ...dbUser, title } : undefined, photo, name)
  }

  return {
    loading,
    handleSave,
  }
}
