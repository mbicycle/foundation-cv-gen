import { memo } from "react"

import CircleIcon from "common/icons/CircleIcon"
import type { Tool } from "common/models/User"

interface ToolItemProps {
  tool: Tool
}
const ToolItem: React.FC<ToolItemProps> = function (props) {
  const { tool } = props
  const { experience, level, name } = tool

  if (!name) return null

  return (
    <>
      <div className="flex items-center">
        <CircleIcon className="mx-1.5 size-2 text-blue-500" />
        <p>{name}</p>
      </div>
      <p className="text-center">{experience}</p>
      <p className="pl-5 text-left">{level || ""}</p>
    </>
  )
}

export default memo(ToolItem)
