import type { Tool } from 'common/models/User';

import ToolItem from './ToolItem';

interface SkillItemProps {
  title: string;
  tools: Tool[];
}

const SkillItem: React.FC<SkillItemProps> = function (props): JSX.Element | null {
  const { title, tools } = props;

  if (!tools) return null;

  return (
    <div className="py-2 mb-2 w-full">
      <div className="grid grid-cols-3 grid-rows-auto">
        <p />
        <p />
        <p />
        <p
          style={{ gridArea: '2 / 1 / 2 / 4' }}
          className="grid-area pt-2 pb-0 text-uppercase border-b border-gray-300"
        >
          {title}
        </p>
        {tools.map((tool) => (
          <ToolItem
            key={tool.id}
            tool={tool}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillItem;
