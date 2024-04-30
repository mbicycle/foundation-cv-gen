import { useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { useUserFromDb } from "widgets/cv-form/api/query-hooks"

import { useUpdateProjectById, useUpdateProjects } from "features/cv-form-components/projects/api/query-hooks"
import type { ProjectFieldValues } from "features/cv-form-components/projects/model/types"
import { updateProjects } from "features/cv-form-components/projects/ui/lib/functions"

import type { Project } from "entities/user/model"

import { useGuestToken } from "shared/context/guest-token"
import { useGuestUser } from "shared/context/guest-user"

import { ProjectIdContext, useProjectIdContext } from "./ProjectContext"

interface ProjectItem {
  isLoading: boolean
  onOpenHandle: () => void
  id: string
}

interface ProjectItemProps {
  id: string
}

export const useProjectItem = ({ id }: ProjectItemProps): ProjectItem => {
  const navigate = useNavigate()
  const { dispatch: dispatchProjectId } = useProjectIdContext()

  const { isLoading } = useUpdateProjects()

  const onOpenHandle = (): void => {
    dispatchProjectId({ type: "getIdProject", id })
    navigate("edit")
  }

  return {
    id,
    isLoading,
    onOpenHandle,
  }
}

interface UpdateProject {
  project: Project | undefined
  isLoading: boolean
  cancelHandle: VoidFunction
  onSaveProjectHandle: () => Promise<void>
}
export const useEditProject = (): UpdateProject => {
  const { state: tokenState } = useGuestToken()
  const { dispatch } = useGuestUser()
  const navigate = useNavigate()
  const { data: user } = useUserFromDb()
  const state = useContext(ProjectIdContext)
  const project = user?.projects.find((c) => c.id === state?.state.id)

  const { mutateAsync, isLoading } = useUpdateProjectById()
  const onSaveProjectHandle = async (projectValues: ProjectFieldValues): Promise<void> => {
    if (tokenState.isGuest) {
      dispatch({ projects: updateProjects(user, projectValues) })
      navigate("/dashboard/projects")
    } else {
      const result = await mutateAsync(projectValues)
      if (result) navigate("/dashboard/projects")
    }
  }

  const cancelHandle = useCallback((): void => {
    navigate("/dashboard/projects")
  }, [navigate])

  return <UpdateProject>{
    project,
    isLoading,
    cancelHandle,
    onSaveProjectHandle,
  }
}
