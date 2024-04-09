import { memo } from 'react';

import CircleIcon from 'common/icons/CircleIcon';
import type { Tool } from 'common/models/User';

interface ToolItemProps {
  tool: Tool;
}
const ToolItem: React.FC<ToolItemProps> = function (props) {
  const { tool } = props;
  const { experience, level, name } = tool;

  if (!name) return null;

  return (
    <>
      <div className="flex items-center">
        <CircleIcon className="text-blue-500 size-3 mx-1.5" />
        <p>
          {name}
        </p>
      </div>
      <p className="text-center">
        {experience}
      </p>
      <p className="text-left pl-5">
        {level || ''}
      </p>
    </>
  );
};

export default memo(ToolItem);
