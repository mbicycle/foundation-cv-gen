import { memo } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import type { Step } from './constants';

interface TitleProps {
 name: `${Step}`;
 onReturn: VoidFunction
}

const Title = function ({ name, onReturn }: TitleProps): JSX.Element {
  const onBackHandle = (): void => {
    onReturn();
  };

  return (
    <div className="inline-flex items-center justify-start">
      <button onClick={onBackHandle} className="mr-1">
        <ChevronLeftIcon className="text-blue-500" />
      </button>
      <p>
        {name}
      </p>
    </div>
  );
};

export default memo(Title);
