import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import { ROUTE } from "app/routes/utils/constants"
import { projectDatePresent } from "fields/projects/components/utils/constants"
import CircularSpinner from "shared/ui/circular-spinner/circular-spinner"
import AddProficiency from "shared/widgets/add-pattern"

import { useUserFromDb } from "containers/main-page/cv-form/api/query-hooks"

import ProjectsList from "./components/ProjectsList"
import { ProjectProvider } from "./components/tool/ProjectContext"

const Projects = function (): JSX.Element {
  const { data, isLoading } = useUserFromDb()
  const location = useLocation()

  const sortedProjects = useMemo(
    () =>
      data?.projects?.sort((first, second) => {
        const sortByAlphabet = (): number => (first.title.toLowerCase() > second.title.toLowerCase() ? 1 : -1)
        if (first.to === projectDatePresent && second.to !== projectDatePresent) {
          return -1
        }
        if (second.to === projectDatePresent && first.to !== projectDatePresent) {
          return 1
        }
        if (second.to === projectDatePresent && first.to === projectDatePresent) {
          if (second.from === first.from) return sortByAlphabet()
          return second.from > first.from ? 1 : -1
        }

        if (new Date(first.to) > new Date(second.to)) {
          return -1
        }
        if (new Date(first.to) < new Date(second.to)) {
          return 1
        }
        if (
          new Date(first.to).toString() === new Date(second.to).toString() &&
          new Date(first.from) > new Date(second.from)
        ) {
          return -1
        }
        if (
          new Date(first.to).toString() === new Date(second.to).toString() &&
          new Date(first.from) < new Date(second.from)
        ) {
          return 1
        }
        if (
          new Date(first.to).toString() === new Date(second.to).toString() &&
          new Date(first.from).toString() === new Date(second.from).toString()
        ) {
          return sortByAlphabet()
        }
        return 0
      }),
    [data],
  )

  const isToolsExist = useMemo(() => data?.skills?.some((skill) => skill.tools.length), [data])

  if (isLoading) {
    return <CircularSpinner size="large" />
  }
  return (
    <ProjectProvider>
      <AddProficiency
        collection={data?.projects || []}
        title="Projects"
        disable={location.pathname.includes(ROUTE.DASHBOARD.PROJECTS) && !isToolsExist}
      >
        {!!data?.projects?.length && !location.pathname.includes(ROUTE.EDIT) && (
          <ProjectsList projects={sortedProjects || []} />
        )}
      </AddProficiency>
    </ProjectProvider>
  )
}

export default Projects
