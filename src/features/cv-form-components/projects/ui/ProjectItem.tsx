import { memo, useCallback, useMemo, useState } from "react"
import dayjs from "dayjs"

import type { Project } from "entities/user/model"

import ProfiencyItem from "shared/widgets/profiency/ProfiencyItem"

import { projectDatePresent } from "./model/constants"
import { useProjectItem } from "./tool/hooks"

type ProjectItemProps = Pick<Project, "title" | "from" | "to" | "id"> & {
  onDelete: CallableFunction
  isDeleting: boolean
}

const ProjectItem: React.FC<ProjectItemProps> = function (props): JSX.Element {
  const { title, from, to, id, isDeleting, onDelete } = props

  const { onOpenHandle } = useProjectItem({ id })

  const [isItemDeleting, setIsItemDeleting] = useState(false)

  const onDeleteProjectHandle = useCallback(async (): Promise<void> => {
    setIsItemDeleting(true)
    await onDelete(title)
    setIsItemDeleting(false)
  }, [onDelete, title])

  const fromTo = useMemo(() => {
    const fromFormatted = dayjs(from).format("MMMM YYYY")
    const toFormatted = to === projectDatePresent ? projectDatePresent : dayjs(to).format("MMMM YYYY")
    return fromFormatted === toFormatted ? fromFormatted : `${fromFormatted} - ${toFormatted}`
  }, [from, to])

  return (
    <ProfiencyItem
      headText={title}
      bodyText={fromTo}
      onDelete={onDeleteProjectHandle}
      onClick={onOpenHandle}
      isLoading={isItemDeleting}
      disabled={isDeleting}
    />
  )
}

export default memo(ProjectItem)
