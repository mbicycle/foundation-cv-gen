import { memo } from "react"

import { useDeleteProject } from "features/cv-form-components/projects/api/query-hooks"

import type { Project } from "entities/user/model"

import { useGuestToken } from "shared/context/guest-token"
import { useGuestUser } from "shared/context/guest-user"

import ProjectItem from "./ProjectItem"

const ProjectsList = function ({ projects }: { projects: Project[] }): JSX.Element {
  const { mutateAsync: deleteBy, isLoading } = useDeleteProject()
  const { state: tokenState } = useGuestToken()
  const { dispatch } = useGuestUser()

  const deleteHandle = async (title: string): Promise<void> => {
    if (tokenState.isGuest) {
      const filtered = projects?.filter((project: Project) => project.title !== title)
      dispatch({ projects: filtered })
    } else {
      await deleteBy(title)
    }
  }

  return (
    <div className="listWrapper">
      {projects.map(({ id, title, from, to }) => (
        <ProjectItem
          key={`${id}_${title}`}
          title={title}
          from={from}
          to={to}
          id={id}
          onDelete={deleteHandle}
          isDeleting={isLoading}
        />
      ))}
    </div>
  )
}

export default memo(ProjectsList)
