import type { Tool } from "entities/user/model"

import ToolItem from "./ToolItem"

interface SkillItemProps {
  title: string
  tools: Tool[]
}

const SkillItem: React.FC<SkillItemProps> = function (props): JSX.Element | null {
  const { title, tools } = props

  if (!tools) return null

  return (
    <div className="mb-2 w-full py-2">
      <div className="grid-rows-auto grid grid-cols-3">
        <p />
        <p />
        <p />
        <p
          style={{ gridArea: "2 / 1 / 2 / 4" }}
          className="grid-area text-uppercase border-b border-gray-300 pb-0 pt-2"
        >
          {title}
        </p>
        {tools.map((tool) => (
          <ToolItem key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}

export default SkillItem
