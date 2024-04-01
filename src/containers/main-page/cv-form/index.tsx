import { memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import CVFormStepper from './components/stepper';
import CVFormTitle from './components/title';

const CVForm = function (): JSX.Element {
  return (
    <Suspense>
      <div className="flex flex-col grow h-full break-words py-5 px-10">
        <CVFormStepper />
        <CVFormTitle />
        <Outlet />
      </div>
    </Suspense>
  );
};

export default memo(CVForm);
