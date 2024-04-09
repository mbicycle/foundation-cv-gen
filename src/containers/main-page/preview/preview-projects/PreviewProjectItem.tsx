import React, { useMemo } from "react"
import dayjs from "dayjs"
import { projectDatePresent } from "fields/projects/components/utils/constants"
import { v4 as uuidv4 } from "uuid"

import { useUserFromDb } from "containers/main-page/cv-form/api/query-hooks"
import { useToggleSensitiveData } from "common/context"
import CircleIcon from "common/icons/CircleIcon"
import type { Project } from "common/models/User"
import { projects } from "common/utils/constants"

interface PreviewProjectItemProps {
  project: Omit<Project, "id">
}

const PreviewProjectItem: React.FC<PreviewProjectItemProps> = function (props) {
  const { data } = useUserFromDb()
  const { project } = props
  const { title, description, from, to, responsibilities, teamSize, categories, role, link } = project
  const { descrTitle, duration, respTitle, sizeTitle, toolsAndTechs, projectRole, productLink, NDA } = projects

  const fromTo = useMemo(() => {
    const fromFormatted = dayjs(from).format("MMMM YYYY")
    const toFormatted = to === projectDatePresent ? projectDatePresent : dayjs(to).format("MMMM YYYY")
    return fromFormatted === toFormatted ? fromFormatted : `${fromFormatted} - ${toFormatted}`
  }, [from, to])

  const { state } = useToggleSensitiveData()
  const { checked: hiddenSensitiveData } = state

  function renderHiddenLink(): JSX.Element {
    if (!hiddenSensitiveData) {
      return (
        <a href={link} className="max-w-full overflow-hidden truncate whitespace-nowrap text-blue-500">
          {link}
        </a>
      )
    }
    return <p className="uppercase">{NDA}</p>
  }

  function renderProjectLink(): JSX.Element | null {
    if (!link) return null
    return (
      <div className="pt-3">
        <h6>
          {`${productLink}`}
          &nbsp;
        </h6>
        {renderHiddenLink()}
      </div>
    )
  }

  function renderCategory(fullCategory: string) {
    const mappedFullCategory = fullCategory.split(", ")
    const skill = data?.skills?.find((skillItem) => skillItem.id === mappedFullCategory[0])
    if (skill) {
      const categoryNames =
        skill?.tools.filter((toolItem) => mappedFullCategory[1].split(",").includes(toolItem.id)) || []
      return (
        <p className="w-full text-gray-600" key={uuidv4()}>
          {`${skill?.name}: ${categoryNames?.map((categoryName, index) => {
            if (index === categoryNames.length - 1) return ` ${categoryName.name}.`
            return ` ${categoryName.name}`
          })}`}
        </p>
      )
    }
    return null
  }

  return (
    <div className="my-4">
      <h5 className="uppercase">
        <CircleIcon className="mb-0.5 mr-1.5 inline size-2 text-blue-500" />
        {title}
      </h5>
      {renderProjectLink()}
      <div>
        <h6 className="pt-3">{descrTitle}</h6>
      </div>
      <p className="whitespace-pre-wrap break-words text-gray-600">{description}</p>
      <div className="pt-3">
        <h6>
          {duration}
          &nbsp;
        </h6>
        <p color="text.secondary">{fromTo}</p>
      </div>
      <div className="pt-3">
        <h6>{respTitle}</h6>
      </div>
      <ul className="block pl-8 pt-3">
        {responsibilities.map((responsibility) => (
          <li className="list-disc text-gray-600" key={responsibility}>
            {responsibility}
          </li>
        ))}
      </ul>
      <div className="pt-3">
        <h6>
          {`${sizeTitle}`}
          &nbsp;
        </h6>
        <p className="text-gray-600">{teamSize}</p>
      </div>
      <div className="pt-3">
        <h6>
          {`${projectRole}`}
          &nbsp;
        </h6>
        <p className="text-gray-600">{role}</p>
      </div>
      <div className="pt-3">
        <p>
          {toolsAndTechs}
          &nbsp;
        </p>
        {categories?.map((category) => renderCategory(category))}
      </div>
    </div>
  )
}

export default React.memo(PreviewProjectItem)
