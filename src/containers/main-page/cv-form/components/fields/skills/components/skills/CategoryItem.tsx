import type { CSSProperties } from "react"
import { memo, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Tool } from "entities/user/model"
import ProfiencyItem from "shared/widgets/profiency/ProfiencyItem"

import { useSkillIdContext } from "containers/main-page/cv-form/local-state/hooks"

interface SkillItemProps {
  id: string
  name: string
  tools: Tool[]
  isDeleting: boolean
  onDelete: CallableFunction
  border?: CSSProperties
}

const SkillListItem: React.FC<SkillItemProps> = function (props): JSX.Element {
  const { id, name, tools, onDelete, border } = props

  const navigate = useNavigate()
  const { dispatch: dispatchSkillId } = useSkillIdContext()

  const [isItemDeleting, setIsItemDeleting] = useState(false)

  const deleteHandle = useCallback(async (): Promise<void> => {
    setIsItemDeleting(true)
    await onDelete(id)
    setIsItemDeleting(false)
  }, [id, onDelete])

  const openHandle = useCallback((): void => {
    dispatchSkillId({ type: "set", id })
    navigate("edit")
  }, [dispatchSkillId, id, navigate])

  return (
    <ProfiencyItem
      key={name}
      headText={name}
      bodyText={`Skills amount: ${tools.length}`}
      onDelete={deleteHandle}
      onClick={openHandle}
      isLoading={isItemDeleting}
      isDraggable
      border={border}
    />
  )
}

export default memo(SkillListItem)
