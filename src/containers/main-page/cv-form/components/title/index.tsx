import { memo } from 'react';

import { useSetStep } from 'containers/main-page/cv-form/components/controls/hooks';
import { CVTitles } from 'containers/main-page/cv-form/utils/constants';

const CVFormTitle = function (): JSX.Element {
  const { activeStep } = useSetStep();

  return (
    <div className="mt-4">
      <h2 className="font-bold text-2xl mt-6 mb-8">
        {CVTitles[activeStep]?.title}
      </h2>
    </div>
  );
};

export default memo(CVFormTitle);
