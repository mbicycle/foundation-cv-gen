import { memo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import CVFormStepper from './components/stepper';
import CVFormTitle from './components/title';
import { CVFormContainerStyled, CVFormWrapperStyled } from './styled';

const CVForm = function (): JSX.Element {
  return (
    <Suspense>
      <CVFormWrapperStyled>
        <CVFormContainerStyled>
          <CVFormStepper />
          <CVFormTitle />
          <Outlet />
        </CVFormContainerStyled>
      </CVFormWrapperStyled>
    </Suspense>
  );
};

export default memo(CVForm);
