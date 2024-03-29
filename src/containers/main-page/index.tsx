import { memo } from 'react';

import CvFormProvider from './cv-form/local-state/CVFormProvider';
import CVForm from './cv-form';
import Preview from './preview';
import { MainPageContainerStyled, PreviewWrapperStyled } from './styled';

const MainPage = function (): JSX.Element {
  return (
    <MainPageContainerStyled container wrap="nowrap">
      <CvFormProvider>
        <CVForm />
      </CvFormProvider>
      <PreviewWrapperStyled>
        <Preview />
      </PreviewWrapperStyled>
    </MainPageContainerStyled>
  );
};

export default memo(MainPage);
