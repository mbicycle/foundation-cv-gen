import { memo } from 'react';

import ProfiencyItem from 'common/components/profiency/ProfiencyItem';

type CategoryItemProps = {
  skill: string;
  tools: string[];
  onDelete: VoidFunction
  onClick: VoidFunction;
};

const CategoryItem = function ({
  skill, tools, onDelete, onClick,
}: CategoryItemProps): JSX.Element {
  const toolsString = (tools?.length && !tools.some((e) => e === '')) ? `${tools.join(', ')}` : '';
  const itemHeadText = (`${skill}: ${toolsString}`);

  return (
    <ProfiencyItem
      headText={itemHeadText}
      onDelete={onDelete}
      onClick={onClick}
    />
  );
};

export default memo(CategoryItem);
